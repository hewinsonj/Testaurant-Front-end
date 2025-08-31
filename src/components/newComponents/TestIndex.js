import { Grid, Segment, List, Button, Form } from "semantic-ui-react";
import LoadingScreen from "../shared/LoadingPage";
import { getAllTests } from "../../api/test";
import { getAllQuestions } from "../../api/question";
import AddTestModal from "./AddTestModal";
import TestUpdateModal from "./TestUpdateModal";
import React, { useState, useEffect } from "react";
import { deleteTest } from "../../api/test";
import TestTake from "./TestTake";
import SearchList from "./SearchList";
import EditLogModal from "./EditLogModal";

const TestIndex = ({ user, msgAlert, newTest, setNewTest, employees: incomingEmployees = [], getAllRestaurants }) => {
  const [allTests, setAllTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [restLoading, setRestLoading] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [sortMethod, setSortMethod] = useState("created");
  const [sortAsc, setSortAsc] = useState(true);
  const [logOpen, setLogOpen] = useState(false);

  useEffect(() => {
    getAllTests(user)
      .then((res) => {
        const tests = res.data.test_thiss;
        // Reverse/sort by newest updated_at first before setting state
        const reversedTests = tests
          .slice()
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setAllTests(reversedTests);
        setFilteredTests(reversedTests);
      })
      .catch(() => {
        msgAlert({
          heading: "Error",
          message: "Could not get tests",
          variant: "danger",
        });
      });
  }, [user]);

  useEffect(() => {
    getAllQuestions(user)
      .then((res) => {
        // console.log("✅ Fetched Questions:", res.data.question_news);
        setAllQuestions(res.data.question_news);
      })
      .catch((error) => {
        msgAlert({
          heading: "Error",
          message: "Could not get questions",
          variant: "danger",
        });
      });
  }, []);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setRestLoading(true);
        const resp = user ? await getAllRestaurants(user) : await getAllRestaurants();
        const list = Array.isArray(resp?.data) ? resp.data : (resp?.data?.restaurants || resp?.data || []);
        if (mounted) setRestaurants(Array.isArray(list) ? list : []);
      } catch (e) {
        if (mounted) setRestaurants([]);
        msgAlert({
          heading: 'Error',
          message: 'Could not get restaurants',
          variant: 'danger',
        });
      } finally {
        if (mounted) setRestLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [user, getAllRestaurants]);

  useEffect(() => {
    setEmployees(Array.isArray(incomingEmployees) ? incomingEmployees : []);
  }, [incomingEmployees]);

  const reloadTests = () => {
    return getAllTests(user)
      .then((res) => {
        /*
        const testsWithEmployees = res.data.test_thiss.map((test) => ({
          ...test,
          employees: employees,
        }));
        const reversedTests = testsWithEmployees
          .slice()
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setAllTests(reversedTests);
        setFilteredTests(reversedTests);
        */
        const tests = res.data.test_thiss;
        const reversedTests = tests
          .slice()
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setAllTests(reversedTests);
        setFilteredTests(reversedTests);
      })
      .catch(() => {
        msgAlert({
          heading: "Error",
          message: "Could not refresh tests",
          variant: "danger",
        });
      });
  };

  const handleDeleteTest = (testId) => {
    if (!testId) return;

    // Optimistically remove from list
    setAllTests((prev) => prev.filter((t) => t.id !== testId));
    setFilteredTests((prev) => prev.filter((t) => t.id !== testId));
    if (selectedTest && selectedTest.id === testId) {
      setSelectedTest(null);
    }

    deleteTest(user, testId)
      .then(() => {
        msgAlert({
          heading: "Success",
          message: "Test deleted successfully.",
          variant: "success",
        });
      })
      .catch((error) => {
        msgAlert({
          heading: "Failure",
          message: `Failed to delete test: ${error.message}`,
          variant: "danger",
        });
      })
      .finally(() => {
        // Authoritative refresh
        reloadTests();
      });
  };

  const findRelevantQuestions = (test, allQuestions) => {
    if (
      !test ||
      !Array.isArray(test.question_new) ||
      !Array.isArray(allQuestions)
    )
      return [];

    return allQuestions.filter((question) =>
      test.question_new.some((testQuestion) =>
        typeof testQuestion === "object"
          ? testQuestion.id === question.id
          : testQuestion === question.id
      )
    );
  };

  // const relevantQuestions =
  //   selectedTest && allQuestions.length
  //     ? findRelevantQuestions(selectedTest, allQuestions)
  //     : []

  const relevantQuestions = (() => {
    if (selectedTest && Array.isArray(allQuestions)) {
      const result = findRelevantQuestions(selectedTest, allQuestions);
      return Array.isArray(result) ? result : [];
    }
    return [];
  })();

  const getOwnerName = (test) => {
    if (!(user && ["Manager", "GeneralManager", "Admin"].includes(user.role) && Array.isArray(employees))) {
      return "";
    }

    if (!test) return "Unknown";

    const ownerId = typeof test.owner === 'object' ? (test.owner?.id ?? test.owner?.pk) : test.owner;

    // Try to find a match across common shapes
    const match = employees.find((emp) => {
      const eid = emp?.id ?? emp?.pk ?? emp?.user?.id;
      return String(eid) === String(ownerId);
    });

    if (!match) return "Unknown";

    // Prefer names directly on the employee, else nested under user
    const first = match.first_name ?? match.firstName ?? match?.user?.first_name ?? match?.user?.firstName ?? '';
    const last  = match.last_name  ?? match.lastName  ?? match?.user?.last_name  ?? match?.user?.lastName  ?? '';
    const full = `${first} ${last}`.trim();
    if (full) return full;

    // Fallbacks
    return match?.email || match?.user?.email || `User #${ownerId}`;
  };

  const getRestaurantName = (test) => {
    if (!test) return '';

    // Normalize possible shapes
    let restId;
    if (test.restaurant && typeof test.restaurant === 'object') {
      restId = test.restaurant.id ?? test.restaurant.pk;
    } else if (test.restaurant !== undefined) {
      restId = test.restaurant; // may be number, '', or null
    } else if (test.restaurant_id !== undefined) {
      restId = test.restaurant_id;
    }

    // If the API omitted the field entirely, don't claim "No Restaurant" yet
    if (restId === undefined) {
      return restLoading ? '' : '';
    }
    // If explicitly null/empty string, then truly no restaurant
    if (restId === null || restId === '') return 'No Restaurant';

    // If we haven't loaded the restaurants list yet, avoid false negatives
    if (!Array.isArray(restaurants) || restaurants.length === 0) {
      return '';
    }

    const match = restaurants.find((r) => String(r.id) === String(restId));
    return match ? match.name : `Restaurant #${restId}`;
  };

  const formatAllottedTime = (test) => {
    const mins = Number(test?.allotted_time ?? 0);
    if (!Number.isFinite(mins) || mins <= 0) return 'No limit';
    return `${mins} minute${mins === 1 ? '' : 's'}`;
  };

  const sortedTests = [...filteredTests].sort((a, b) => {
    let result = 0;
    if (sortMethod === "creator") {
      const aName = getOwnerName(a).toLowerCase();
      const bName = getOwnerName(b).toLowerCase();
      result = aName.localeCompare(bName);
    } else {
      result = new Date(b.updated_at) - new Date(a.updated_at);
    }
    return sortAsc ? -result : result;
  });
console.log(sortedTests)
  return (
    <Segment raised>
      <AddTestModal
        user={user}
        msgAlert={msgAlert}
        setNewTest={setNewTest}
        getAllRestaurants={getAllRestaurants}
        onCreated={(newTestObj) => {
          // Prepend so it shows up first (matches newest-first)
          setAllTests((prev) =>
            Array.isArray(prev) ? [newTestObj, ...prev] : [newTestObj]
          );
          setFilteredTests((prev) =>
            Array.isArray(prev) ? [newTestObj, ...prev] : [newTestObj]
          );
          setSelectedTest(newTestObj);
          if (process.env.NODE_ENV !== 'production') {
            console.log('[TestIndex] created test', newTestObj);
          }
        }}
      />
      <Grid columns={3} divided padded>
        {/* Column 1: Test list and create button */}
        <Grid.Column width={5}>
          <h3>All Tests</h3>

          <SearchList
          getOwnerName={getOwnerName}   
          employeesList={employees}
            data={sortedTests.map((test) => ({
              ...test,
              // employees: employees,
            }))}
            onSearch={(val) => {
              const lowerVal = val.toLowerCase();
              const filtered = allTests.filter((test) => {
                const nameMatch = test.name?.toLowerCase().includes(lowerVal);
                /*
                const emp = employees.find((e) => e.id === test.owner);
                const empMatch = emp
                  ? `${emp.first_name || ""} ${emp.last_name || ""}`
                      .toLowerCase()
                      .includes(lowerVal)
                  : false;
                return nameMatch || empMatch;
                */
                return nameMatch;
              });
              setFilteredTests(filtered);
            }}
            onSelect={(test) => setSelectedTest(test)}
            searchPlaceholder="Search by test name"
            extractLabel={(test) => test.name || "Untitled Test"}
            reversed={false}
            sortOptions={[
              { key: "updated_at", label: "Last Updated" },
              // { key: "creator", label: "Creator" },
            ]}
            defaultSortKey="updated_at"
          />
        </Grid.Column>

        {/* Column 2: Selected test details */}
        <Grid.Column width={7}>
          {selectedTest ? (
            <Segment>
              <h2>{selectedTest.name}</h2>
              <p>
                
                <strong>Date Created:</strong>{" "}
                {new Date(selectedTest.created_at).toLocaleDateString(
                  undefined,
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
              <p>
                <strong>Last Updated:</strong>{" "}
                {new Date(selectedTest.updated_at).toLocaleDateString(
                  undefined,
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
              {user && ["Manager", "GeneralManager", "Admin"].includes(user.role) && (
                <p>
                  <strong>Created By:</strong> {getOwnerName(selectedTest) || "Unknown"}
                </p>
              )}
              <p>
                <strong>Question Count:</strong> {relevantQuestions.length}
              </p>
              <p>
                <strong>Allotted Time:</strong> {formatAllottedTime(selectedTest)}
              </p>
              <p>
                <strong>Restaurant:</strong> {getRestaurantName(selectedTest)}
              </p>
              <p>
                <strong>Questions:</strong>
              </p>
              <ul>
                {Array.isArray(relevantQuestions) &&
                relevantQuestions.length > 0 ? (
                  relevantQuestions.map((q) => (
                    <li key={q.id}>
                      (Q) {q.question_str} (A) {q.answer}
                    </li>
                  ))
                ) : (
                  <li>No questions linked to this test</li>
                )}
              </ul>
            </Segment>
          ) : (
            <p>Select a test to view details</p>
          )}
        </Grid.Column>

        {/* Column 3: Update + Delete */}
        <Grid.Column width={4}>
          <Segment>
            {selectedTest && (
              <>
                <TestUpdateModal
                  user={user}
                  test={selectedTest}
                  msgAlert={msgAlert}
                  allQuestions={allQuestions}
                  getAllRestaurants={getAllRestaurants}
                />
                <Button
                  color="blue"
                  fluid
                  style={{ marginTop: "0.5rem" }}
                  onClick={() => setLogOpen(true)}
                >
                  Show Edit Log
                </Button>
                <EditLogModal
                  open={logOpen}
                  onClose={() => setLogOpen(false)}
                  user={user}
                  itemType="Test"
                  itemId={selectedTest.id}
                />
                <Button
                  color="red"
                  fluid
                  style={{ marginTop: "0.5rem" }}
                  onClick={() => handleDeleteTest(selectedTest.id)}
                >
                  Delete
                </Button>
                <TestTake
                  test={selectedTest}
                  user={user}
                  msgAlert={msgAlert}
                  allQuestions={allQuestions}
                />
              </>
            )}
          </Segment>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default TestIndex;

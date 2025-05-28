import { Grid, Segment, List, Button, Form } from "semantic-ui-react";
import LoadingScreen from "../shared/LoadingPage";
import { getAllTests } from "../../api/test";
import { getAllQuestions } from "../../api/question";
import { getAllEmployees } from "../../api/user";
import AddTestModal from "./AddTestModal";
import TestUpdateModal from "./TestUpdateModal";
import React, { useState, useEffect } from "react";
import { deleteTest } from "../../api/test";
import TestTake from "./TestTake";
import SearchList from "./SearchList";

const TestIndex = ({ user, msgAlert, newTest, setNewTest }) => {
  const [allTests, setAllTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [sortMethod, setSortMethod] = useState("created");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    getAllEmployees(user)
      .then((res) => {
        if (res.data?.users) {
          setEmployees(res.data.users);
          getAllTests(user)
            .then((res) => {
              console.log("✅ Fetched Tests:", res.data.test_thiss);
              const testsWithEmployees = res.data.test_thiss.map(test => ({
                ...test,
                employees: res.data.users,
              }));
              // Reverse/sort by newest updated_at first before setting state
              const reversedTests = testsWithEmployees.slice().sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
              setAllTests(reversedTests);
              setFilteredTests(reversedTests);
            })
            .catch((error) => {
              msgAlert({
                heading: "Error",
                message: "Could not get tests",
                variant: "danger",
              });
            });
        }
      })
      .catch(() => {
        msgAlert({
          heading: "Error",
          message: "Could not get Employees",
          variant: "danger",
        });
      });
  }, [user]);

  useEffect(() => {
    getAllQuestions(user)
      .then((res) => {
        console.log("✅ Fetched Questions:", res.data.question_news);
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

  const handleDeleteTest = () => {
    deleteTest(user, selectedTest.id)
      .then(() => {
        msgAlert({
          heading: "Success",
          message: "Test deleted successfully.",
          variant: "success",
        });
      })
      // .then(() => setOpen(false))
      .catch((error) => {
        msgAlert({
          heading: "Failure",
          message: `Failed to delete test: ${error.message}`,
          variant: "danger",
        });
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
    if (user?.role === "manager" && Array.isArray(employees)) {
      const owner = employees.find((emp) => emp.id === test.owner);
      return owner ? `${owner.first_name} ${owner.last_name}` : "Unknown";
    }
    return "";
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

  return (
    <Segment raised>
      <AddTestModal user={user} msgAlert={msgAlert} setNewTest={setNewTest} />
      <Grid columns={3} divided padded>
        {/* Column 1: Test list and create button */}
        <Grid.Column width={5}>
          <h3>All Tests</h3>

          <SearchList
            data={sortedTests.map(test => ({
              ...test,
              employees: employees,
            }))}
            onSearch={(val) => {
              const lowerVal = val.toLowerCase();
              const filtered = allTests.filter((test) => {
                const nameMatch = test.name?.toLowerCase().includes(lowerVal);
                const emp = employees.find((e) => e.id === test.owner);
                const empMatch = emp
                  ? `${emp.first_name || ""} ${emp.last_name || ""}`
                      .toLowerCase()
                      .includes(lowerVal)
                  : false;
                return nameMatch || empMatch;
              });
              setFilteredTests(filtered);
            }}
            onSelect={(test) => setSelectedTest(test)}
            searchPlaceholder="Search by test name or creator"
            extractLabel={(test) => test.name || "Untitled Test"}
            reversed={false}
            sortOptions={[
              { key: "updated_at", label: "Last Updated" },
              { key: "creator", label: "Creator" },
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
                {new Date(selectedTest.created_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>
                <strong>Last Updated:</strong>{" "}
                {new Date(selectedTest.updated_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h3>Created by: {getOwnerName(selectedTest)}</h3>
              <p>
                <strong>Question Count:</strong> {relevantQuestions.length}
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
                />
                <Button
                  color="red"
                  fluid
                  style={{ marginTop: "0.5rem" }}
                  onClick={() => handleDeleteTest(selectedTest)}
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

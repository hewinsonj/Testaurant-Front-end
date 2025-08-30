import React, { useState, useEffect } from "react";
import { Grid, Segment, List, Input } from "semantic-ui-react";
import LoadingScreen from "../shared/LoadingPage";
import { getAllResults, getMyResults } from "../../api/result";
import { getAllTests } from "../../api/test";
import { getAllEmployees } from "../../api/user";
import ResultsSegment from "./ResultsSegment";

const ResultsPage = ({ user, msgAlert, setUser }) => {
  const [allResults, setAllResults] = useState([]);
  const [allTests, setAllTests] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [ownerName, setOwnerName] = useState("");
  const [empSearch, setEmpSearch] = useState("");

  const roleLC = (user?.role || '').toLowerCase();
  const isMgrish = ['manager', 'generalmanager', 'admin'].includes(roleLC);

  useEffect(() => {
    const fetchResults = isMgrish ? getAllResults : getMyResults;
    // console.log(user, "userRole----------");

    fetchResults(user)
      .then((res) => {
        if (res.data?.results) {
          setAllResults(res.data.results);
        } else {
          setAllResults([]);
        }
      })
      .catch(() => {
        msgAlert({
          heading: "Error",
          message: "Could not get Results",
          variant: "danger",
        });
      });

    getAllTests(user)
      .then((res) => {
        if (res.data?.test_thiss) {
          setAllTests(res.data.test_thiss);
        }
      })
      .catch(() => {
        msgAlert({
          heading: "Error",
          message: "Could not get Tests",
          variant: "danger",
        });
      });

    if (isMgrish) {
      getAllEmployees(user)
        .then((res) => {
          if (res.data?.users) {
            setEmployees(res.data.users);
          } else {
            setEmployees([]);
          }
        })
        .catch((err) => {
          // Non-fatal for managers; do not show a toast. Just log.
          console.warn('[ResultsPage] getAllEmployees failed:', err?.response?.status || err);
          setEmployees([]);
        });
    } else {
      // Not a manager: never fetch employees to avoid 403s
      setEmployees([]);
    }
  }, [user]);

  const getTestNameById = (testRef) => {
    const testId =
      typeof testRef === "object" && testRef !== null ? testRef.id : testRef;
    const test = allTests.find(
      (t) => t.id === testId || t.id === Number(testId)
    );
    return test ? test.name : "Unknown Test";
  };

  const employeesById = React.useMemo(() => {
    const map = new Map();
    if (Array.isArray(employees)) {
      employees.forEach((e) => {
        const id = e?.id ?? e?.pk ?? e?.user?.id;
        if (id != null) map.set(Number(id), e);
      });
    }
    return map;
  }, [employees]);

  const resultsForList = React.useMemo(() => {
    let list = Array.isArray(allResults) ? allResults.slice().reverse() : [];
    if (isMgrish && empSearch.trim()) {
      const term = empSearch.trim().toLowerCase();
      list = list.filter((r) => {
        const emp = employeesById.get(Number(r.owner));
        const first = (emp?.first_name || emp?.user?.first_name || "").toLowerCase();
        const last  = (emp?.last_name  || emp?.user?.last_name  || "").toLowerCase();
        return first.includes(term) || last.includes(term);
      });
    }
    return list;
  }, [allResults, isMgrish, empSearch, employeesById]);

  return (
    <Segment raised>
      <Grid columns={3} divided padded>
        <Grid.Column width={5}>
          <h3>
            {isMgrish ? 'All Test Results' : 'Your Test Results'}
          </h3>
          {isMgrish && (
            <div style={{ margin: '0.5rem 0 0.75rem' }}>
              <Input
                fluid
                icon="search"
                placeholder="Filter by employee name..."
                value={empSearch}
                onChange={(e, { value }) => setEmpSearch(value)}
              />
            </div>
          )}
          {resultsForList.length > 0 ? (
            <List divided selection>
              {resultsForList.map((result) => (
                <List.Item
                  key={result.id}
                  onClick={() => setSelectedResult(result)}
                >
                  <List.Content>
                    <List.Header as="h4" style={{ lineHeight: "1.4em" }}>
                      {" "}
                      <strong>Test: {getTestNameById(result.the_test)}</strong>{" "}
                      <br />
                      {isMgrish &&
                        Array.isArray(employees) && employees.length > 0 &&
                        (() => {
                          const owner = employeesById.get(Number(result.owner));
                          return owner ? (
                            <span>
                              Taken by: {owner.first_name} {owner.last_name}
                            </span>
                          ) : null;
                        })()}{" "}
                      <br />
                      <span>
                        Date:{" "}
                        {new Date(result.created_at).toLocaleDateString()}
                      </span>
                      <br />
                      <span>Score: {result.percent}</span>
                      {/* {Array.isArray(result.wrong_question_ids) && result.wrong_question_ids.length > 0 && (
                        <span>
                          Wrong IDs: {result.wrong_question_ids.join(', ')}
                        </span>
                      )} */}
                   </List.Header>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          ) : (
            <LoadingScreen />
          )}
        </Grid.Column>

        <Grid.Column width={7}>
          {selectedResult ? (
            <ResultsSegment
              result={selectedResult}
              allTests={allTests}
              employees={employees}
              setOwnerName={setOwnerName} // ✅ Pass it down
            />
          ) : (
            <p>Select a result to view details</p>
          )}
        </Grid.Column>
{/* 
        <Grid.Column width={4}>
          <Segment>
            {selectedResult && (
              <p>
                <strong>Actions (coming soon):</strong>
              </p>
            )}
          </Segment>
        </Grid.Column> */}
      </Grid>
    </Segment>
  );
};

export default ResultsPage;

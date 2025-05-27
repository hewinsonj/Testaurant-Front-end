import React, { useState, useEffect } from "react";
import { Grid, Segment, List } from "semantic-ui-react";
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

  useEffect(() => {
    const fetchResults =
      user?.role === "manager" ? getAllResults : getMyResults;
    console.log(user, "userRole----------");

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

    getAllEmployees(user)
      .then((res) => {
        if (res.data?.users) {
          setEmployees(res.data.users);
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

  const getTestNameById = (testRef) => {
    const testId =
      typeof testRef === "object" && testRef !== null ? testRef.id : testRef;
    const test = allTests.find(
      (t) => t.id === testId || t.id === Number(testId)
    );
    return test ? test.name : "Unknown Test";
  };

  return (
    <Segment raised>
      <Grid columns={3} divided padded>
        <Grid.Column width={5}>
          <h3>
            {user?.role === "manager" ? "Test Results" : "Your Test Results"}
          </h3>{" "}
          {allResults.length > 0 ? (
            <List divided selection>
              {allResults
                .slice()
                .reverse()
                .map((result) => (
                  <List.Item
                    key={result.id}
                    onClick={() => setSelectedResult(result)}
                  >
                    <List.Content>
                      <List.Header as="h4" style={{ lineHeight: "1.4em" }}>
                        {" "}
                        <strong>Test: {getTestNameById(result.the_test)}</strong>{" "}
                        <br />
                        {user?.role === "manager" &&
                          employees &&
                          (() => {
                            const owner = employees.find(
                              (emp) => emp.id === result.owner
                            );
                            return owner ? (
                              <span
                              >
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
                        <br />
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

        <Grid.Column width={4}>
          <Segment>
            {selectedResult && (
              <p>
                <strong>Actions (coming soon):</strong>
              </p>
            )}
          </Segment>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default ResultsPage;

import React, { useState, useEffect } from "react";
import { Grid, Segment, List } from "semantic-ui-react";
import LoadingScreen from "../shared/LoadingPage";
import { getAllTests } from "../../api/test";
import { getAllQuestions } from "../../api/question";
// import { getAllEmployees } from "../../api/user";
import TestTake from "./TestTake";

const TestAssignIndex = ({ user, msgAlert }) => {
  const [allTests, setAllTests] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  // const [employees, setEmployees] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);

  const initialAssigned = Array.isArray(user?.assigned_tests)
    ? user.assigned_tests
    : Array.isArray(user?.assignedTest)
    ? user.assignedTest
    : [];
  const [assignedIds, setAssignedIds] = useState(initialAssigned);

  const loadAssignedTests = () => {
    return getAllTests(user)
      .then((testRes) => {
        const tests = (testRes?.data?.test_thiss || [])
          .filter((t) => assignedIds.includes(t.id))
          .map((t) => ({ ...t }));
        const sorted = tests.slice().sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setAllTests(sorted);
      })
      .catch(() => {
        msgAlert({ heading: "Error", message: "Could not load assigned tests", variant: "danger" });
      });
  };

  useEffect(() => {
    loadAssignedTests();
  }, [user, assignedIds]);

  useEffect(() => {
    getAllQuestions(user)
      .then((res) => setAllQuestions(res?.data?.question_news || []))
      .catch(() => {
        msgAlert({ heading: "Error", message: "Could not get questions", variant: "danger" });
      });
  }, [user]);

  const findRelevantQuestions = (test, questions) => {
    if (!test || !Array.isArray(test.question_new) || !Array.isArray(questions)) return [];
    return questions.filter((q) =>
      test.question_new.some((tq) => (typeof tq === "object" ? tq.id === q.id : tq === q.id))
    );
  };

  const relevantQuestions = selectedTest ? findRelevantQuestions(selectedTest, allQuestions) : [];

  // const getOwnerName = (test) => {
  //   if (!Array.isArray(employees)) return "Unknown";
  //   const owner = employees.find((emp) => emp.id === test.owner);
  //   const full = owner ? `${owner.first_name || ""} ${owner.last_name || ""}`.trim() : "Unknown";
  //   return full || "Unknown";
  // };

  return (
    <Segment raised>
      <Grid columns={3} divided padded>
        {/* Column 1: Assigned tests list */}
        <Grid.Column width={5}>
          <h3>My Assigned Tests</h3>
          <List selection divided relaxed>
            {allTests.map((test) => (
              <List.Item key={test.id} onClick={() => setSelectedTest(test)}>
                <List.Content>
                  <List.Header>{test.name || "Untitled Test"}</List.Header>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Grid.Column>

        {/* Column 2: Selected test details */}
        <Grid.Column width={7}>
          {selectedTest ? (
            <Segment>
              <h2>{selectedTest.name}</h2>
              {/* <p>
                <strong>Date Created:</strong>{" "}
                {new Date(selectedTest.created_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p> */}
              <p>
                <strong>Last Updated:</strong>{" "}
                {new Date(selectedTest.updated_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              {/* <h3>Created by: {getOwnerName(selectedTest)}</h3> */}
              <p>
                <strong>Question Count:</strong> {relevantQuestions.length}
              </p>
              {/* <p>
                <strong>Questions:</strong>
              </p>
              <ul>
                {relevantQuestions.length > 0 ? (
                  relevantQuestions.map((q) => (
                    <li key={q.id}>
                      (Q) {q.question_str} (A) {q.answer}
                    </li>
                  ))
                ) : (
                  <li>No questions linked to this test</li>
                )} 
              </ul>*/}
            </Segment>
          ) : (
            <p>Select a test to view details</p>
          )}
        </Grid.Column>

        {/* Column 3: Take Test (no update/delete) */}
        <Grid.Column width={4}>
          <Segment>
            {selectedTest && (
              <TestTake
                test={selectedTest}
                user={user}
                msgAlert={msgAlert}
                allQuestions={allQuestions}
                onCompleted={(newAssignedIds) => {
                  setAssignedIds(newAssignedIds || []);
                  setSelectedTest(null);
                }}
              />
            )}
          </Segment>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default TestAssignIndex;

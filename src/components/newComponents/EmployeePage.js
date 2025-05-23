import React, { useEffect, useState } from "react";
import { Grid, Segment, List, Button, Form } from "semantic-ui-react";
import { getAllEmployees } from "../../api/user";
import { getAllTests } from "../../api/test";
import { getAllQuestions } from "../../api/question";
import AssignTestModal from "./AssignTestModal";
import UpdateEmployeeModal from "../auth/UpdateEmployeeModal";
import DeleteEmployeeButton from "../auth/DeleteEmployeeButton";

const EmployeePage = ({ user, msgAlert }) => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [allTests, setAllTests] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);

  useEffect(() => {
    getAllEmployees(user)
      .then((res) => {
        setAllEmployees(res.data.users);
        setFilteredEmployees(res.data.users);
      })
      .catch((error) => {
        msgAlert({
          heading: "Failure",
          message: "Could not fetch employees: " + error,
          variant: "danger",
        });
      });

    getAllTests(user)
      .then((res) => {
        setAllTests(res.data.test_thiss);
      })
      .catch((error) => {
        msgAlert({
          heading: "Error",
          message: "Could not get tests",
          variant: "danger",
        });
      });

    // Fetch all questions here in the parent
    getAllQuestions(user)
      .then((res) => {
        // Assuming the questions are returned in res.data.question_news
        setAllQuestions(res.data.question_news);
      })
      .catch((error) => {
        msgAlert({
          heading: "Error",
          message: "Could not get questions: " + error,
          variant: "danger",
        });
      });
  }, []);

  const getAssignedTestNames = (testIds) => {
    if (!Array.isArray(testIds)) return [];
    return testIds.map((testId) => {
      const match = allTests.find((t) => t.id === (testId.id || testId));
      return match ? match.name : `Test ID: ${testId.id || testId}`;
    });
  };

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();

    const filtered = allEmployees.filter((emp) => {
      const fullName = `${emp.first_name || ""} ${
        emp.last_name || ""
      }`.toLowerCase();
      return fullName.includes(value);
    });

    setFilteredEmployees(filtered);
  };

  return (
    <Segment raised>
      <Grid columns={3} divided padded>
        {/* Column 1: Employee list + search */}
        <Grid.Column width={5}>
          <h3>All Employees</h3>
          <Form>
            <Form.Input
              placeholder="Search by employee name"
              onChange={handleChange}
            />{" "}
          </Form>
          <List divided selection>
            {filteredEmployees
              .slice()
              .reverse()
              .map((emp) => (
                <List.Item
                  key={emp.id}
                  onClick={() => setSelectedEmployee(emp)}
                >
                  <List.Content>
                    <List.Header>
                      {emp.first_name || emp.last_name
                        ? `${emp.first_name || ""} ${
                            emp.last_name || ""
                          }`.trim()
                        : emp.email.slice(0, 100)}
                    </List.Header>
                  </List.Content>
                </List.Item>
              ))}
          </List>
        </Grid.Column>

        {/* Column 2: Selected employee details */}
        <Grid.Column width={7}>
          {selectedEmployee ? (
            <Segment>
              <h2>Employee Info</h2>
              <p>
                <strong>Email:</strong>{" "}
                {selectedEmployee.email || <i>(none)</i>}
              </p>
              <p>
                <strong>First Name:</strong>{" "}
                {selectedEmployee.first_name || <i>(none)</i>}
              </p>
              <p>
                <strong>Last Name:</strong>{" "}
                {selectedEmployee.last_name || <i>(none)</i>}
              </p>
              <p>
                <strong>Role:</strong> {selectedEmployee.role || <i>(none)</i>}
              </p>
              <p>
                <strong>Hire Date:</strong>{" "}
                {selectedEmployee.hire_date ? (
                  new Date(selectedEmployee.hire_date).toLocaleDateString()
                ) : (
                  <i>(none)</i>
                )}
              </p>
              <Segment inverted>
                <Segment>
                  <p>
                    <strong>Assigned Tests:</strong>
                  </p>
                  {Array.isArray(selectedEmployee.assigned_tests) &&
                  selectedEmployee.assigned_tests.length > 0 ? (
                    <ul
                      style={{
                        fontWeight: "bold",
                        color: "#ff851b",
                        paddingLeft: "1rem",
                      }}
                    >
                      {getAssignedTestNames(
                        selectedEmployee.assigned_tests
                      ).map((name, idx) => (
                        <li key={idx}>{name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ fontStyle: "italic", color: "#aaa" }}>
                      No tests assigned
                    </p>
                  )}
                </Segment>
              </Segment>
            </Segment>
          ) : (
            <p>Select an employee to view details</p>
          )}
        </Grid.Column>

        {/* Column 3: Action buttons */}
        <Grid.Column width={4}>
          <Segment>
            {selectedEmployee && (
              <>
                <UpdateEmployeeModal
                  user={user}
                  employee={selectedEmployee}
                  msgAlert={msgAlert}
                />

                <AssignTestModal
                  user={user}
                  employee={selectedEmployee}
                  tests={allTests}
                  msgAlert={msgAlert}
                  allQuestions={allQuestions} // Passing down the fetched questions
                />
                <DeleteEmployeeButton
                  user={user}
                  employee={selectedEmployee}
                  msgAlert={msgAlert}
                  onDelete={() => setSelectedEmployee(null)}
                />
              </>
            )}
          </Segment>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default EmployeePage;

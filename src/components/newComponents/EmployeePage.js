import React, { useEffect, useState } from "react";
import { Grid, Segment, Button } from "semantic-ui-react";
import { getAllEmployees } from "../../api/user";
import { getAllTests } from "../../api/test";
import { getAllQuestions } from "../../api/question";
import { getAllResults } from "../../api/result";
import AssignTestModal from "./AssignTestModal";
import UpdateEmployeeModal from "../auth/UpdateEmployeeModal";
import DeleteEmployeeButton from "../auth/DeleteEmployeeButton";
import SearchList from "./SearchList";
import NewEmployeeModal from "./NewEmployeeModal";
import ResultsSegment from "./ResultsSegment";

const EmployeePage = ({ user, msgAlert }) => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [allTests, setAllTests] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [newEmpModalOpen, setNewEmpModalOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      getAllEmployees(user),
      getAllResults(user),
      getAllTests(user),
      getAllQuestions(user)
    ])
      .then(([empRes, resultRes, testRes, questionRes]) => {
        const employees = empRes.data.users;
        const results = resultRes.data.results;
        const tests = testRes.data.test_thiss;
        const questions = questionRes.data.question_news;

        const employeesWithResults = employees.map(emp => {
          const empResults = results.filter(r => {
            const ownerId = typeof r.owner === 'object' ? r.owner.id : r.owner;
            return ownerId === emp.id;
          });
          return { ...emp, results: empResults };
        });

        // console.log("✅ Final merged employees with results:", employeesWithResults);

        setAllEmployees(employeesWithResults);
        setFilteredEmployees(employeesWithResults);
        setAllTests(tests);
        setAllQuestions(questions);
      })
      .catch((error) => {
        msgAlert({
          heading: "Error",
          message: "Could not fetch data: " + error,
          variant: "danger",
        });
      });
  }, [user]);

  const getAssignedTestNames = (testIds) => {
    if (!Array.isArray(testIds)) return [];
    return testIds.map((testId) => {
      const match = allTests.find((t) => t.id === (testId.id || testId));
      return match ? match.name : `Test ID: ${testId.id || testId}`;
    });
  };

  return (
    <Segment raised>
      <Grid columns={3} divided padded>
        {/* Column 1: Employee list + search */}
        <Grid.Column width={5}>
          <Button
            primary
            fluid
            // style={{ marginBottom: '1em' }}
            onClick={() => setNewEmpModalOpen(true)}
          >
            + New Employee
          </Button>
          <h3>All Employees</h3>
          <SearchList
            data={filteredEmployees}
            onSearch={(val) => {
              const filtered = allEmployees.filter((emp) => {
                const fullName = `${emp.first_name || ""} ${emp.last_name || ""}`.toLowerCase();
                return fullName.includes(val);
              });
              setFilteredEmployees(filtered);
            }}
            onSelect={(emp) => {
              const enriched = filteredEmployees.find(e => e.id === emp.id);
              setSelectedEmployee(enriched || emp);
            }}
            searchPlaceholder="Search by employee name"
            extractLabel={(emp) =>
              emp.first_name || emp.last_name
                ? `${emp.first_name || ""} ${emp.last_name || ""}`.trim()
                : emp.email.slice(0, 100)
            }
          />
        </Grid.Column>

        {/* Column 2: Selected employee details */}
        <Grid.Column width={7}>
          {selectedEmployee ? (
            <Segment>
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
              <p>
                <strong>Test Score Average:</strong>{" "}
                {(() => {
                  const results = selectedEmployee?.results || [];
                  const percentages = results
                    .map(res => {
                      const match = (typeof res.score === 'string') ? res.score.match(/^(\d+)\s*out\s*of\s*(\d+)/i) : null;
                      if (!match) return NaN;
                      const correct = parseFloat(match[1]);
                      const total = parseFloat(match[2]);
                      return total > 0 ? (correct / total) * 100 : NaN;
                    })
                    .filter(pct => !isNaN(pct));

                  if (!percentages.length) return <i>(no valid scores)</i>;

                  const totalPct = percentages.reduce((sum, p) => sum + p, 0);
                  return (totalPct / percentages.length).toFixed(0) + '%';
                })()}
              </p>
              <Segment inverted>
                <Segment>
                  <p><strong>Assigned Tests:</strong></p>
                  {Array.isArray(selectedEmployee.assigned_tests) &&
                  selectedEmployee.assigned_tests.length > 0 ? (
                    <ul
                      style={{
                        fontWeight: "bold",
                        color: "#ff851b",
                        paddingLeft: "1rem",
                      }}
                    >
                      {getAssignedTestNames(selectedEmployee.assigned_tests).map((name, idx) => (
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
            <h4>Test Results</h4>

          <Segment style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {selectedEmployee
              ? (selectedEmployee.results || []).slice().reverse().map((res, idx) => {
                  const test = Array.isArray(allTests) ? allTests.find(t => t.id === res.the_test) : null;
                  return (
                    <div key={`${selectedEmployee.id}-${idx}`} style={{ marginBottom: '1em' }}>
                      <ResultsSegment
                        result={res}
                        user={user}
                        msgAlert={msgAlert}
                        label={test ? test.name : 'Unknown Test'}
                      />
                    </div>
                  );
                })
              : <p style={{ fontStyle: "italic" }}>Select an employee to view results.</p>
            }
          </Segment>
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
                  allQuestions={allQuestions}
                  onAssigned={(newAssignedIds) => {
                    // Update selected employee in place
                    setSelectedEmployee(prev => prev ? { ...prev, assigned_tests: newAssignedIds } : prev);
                    // Update employees arrays
                    setAllEmployees(prev => prev.map(emp => emp.id === selectedEmployee.id ? { ...emp, assigned_tests: newAssignedIds } : emp));
                    setFilteredEmployees(prev => prev.map(emp => emp.id === selectedEmployee.id ? { ...emp, assigned_tests: newAssignedIds } : emp));
                  }}
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
      <NewEmployeeModal
        open={newEmpModalOpen}
        onClose={() => setNewEmpModalOpen(false)}
        refreshEmployees={() => {
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
        }}
      />
    </Segment>
  );
};

export default EmployeePage;

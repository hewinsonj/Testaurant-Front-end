import React, { useEffect, useState } from "react";
import { Grid, Segment, Button, Dropdown, Modal, List, Input, Form } from "semantic-ui-react";
import { getAllEmployees } from "../../api/user";
import { getAllTests } from "../../api/test";
import { getAllQuestions } from "../../api/question";
import { getAllResults } from "../../api/result";
import { getAllRestaurants, updateRestaurant, deleteRestaurant } from "../../api/restaurant";
import AssignTestModal from "./AssignTestModal";
import UpdateEmployeeModal from "../auth/UpdateEmployeeModal";
import DeleteEmployeeButton from "../auth/DeleteEmployeeButton";
import SearchList from "./SearchList";
import NewEmployeeModal from "./NewEmployeeModal";
import NewRestaurantModal from "./NewRestaurantModal";
import ResultsSegment from "./ResultsSegment";
import EditLogModal from "./EditLogModal";

const EmployeePage = ({ user, msgAlert }) => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [allTests, setAllTests] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [newEmpModalOpen, setNewEmpModalOpen] = useState(false);
  const [newRestModalOpen, setNewRestModalOpen] = useState(false);
  const [logOpen, setLogOpen] = useState(false);
  const [restaurantFilter, setRestaurantFilter] = useState("");

  const [restListOpen, setRestListOpen] = useState(false);
  const [restUpdateOpen, setRestUpdateOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [restaurantSearch, setRestaurantSearch] = useState("");

  useEffect(() => {
    Promise.all([
      getAllEmployees(user),
      getAllResults(user),
      getAllTests(user),
      getAllQuestions(user),
      getAllRestaurants(user),
    ])
      .then(([empRes, resultRes, testRes, questionRes, restRes]) => {
        const employees = empRes.data.users;
        const results = resultRes.data.results;
        const tests = testRes.data.test_thiss;
        const questions = questionRes.data.question_news;

        const employeesWithResults = employees.map((emp) => {
          const empResults = results.filter((r) => {
            const ownerId = typeof r.owner === "object" ? r.owner.id : r.owner;
            return ownerId === emp.id;
          });
          return { ...emp, results: empResults };
        });

        // console.log("✅ Final merged employees with results:", employeesWithResults);

        setAllEmployees(employeesWithResults);
        setFilteredEmployees(employeesWithResults);
        setAllTests(tests);
        setAllQuestions(questions);
        const restaurants =
          restRes?.data?.restaurants ??
          restRes?.data?.results ??
          restRes?.data ??
          [];
        setAllRestaurants(Array.isArray(restaurants) ? restaurants : []);
        // console.log('[Restaurants fetched]', restaurants);
      })
      .catch((error) => {
        msgAlert({
          heading: "Error",
          message: "Could not fetch data: " + error,
          variant: "danger",
        });
      });
  }, [user, msgAlert]);

  const getAssignedTestNames = (testIds) => {
    if (!Array.isArray(testIds)) return [];
    return testIds.map((testId) => {
      const match = allTests.find((t) => t.id === (testId.id || testId));
      return match ? match.name : `Test ID: ${testId.id || testId}`;
    });
  };

  // Convert a result.score like "2 out of 3" (or "2/3") into a percentage 0-100
  const scoreToPercent = (score) => {
    if (typeof score === "number") return Math.max(0, Math.min(100, score));
    if (typeof score === "string") {
      // Try patterns like "2 out of 3" or "2/3"
      const outOf = score.match(/^(\d+)\s*out\s*of\s*(\d+)/i);
      if (outOf) {
        const correct = parseFloat(outOf[1]);
        const total = parseFloat(outOf[2]);
        if (total > 0) return (correct / total) * 100;
      }
      const slash = score.match(/^(\d+)\s*\/\s*(\d+)/);
      if (slash) {
        const correct = parseFloat(slash[1]);
        const total = parseFloat(slash[2]);
        if (total > 0) return (correct / total) * 100;
      }
      const pct = score.match(/(\d+(?:\.\d+)?)%/);
      if (pct) return parseFloat(pct[1]);
    }
    return NaN;
  };

  // Build sorted progress points (oldest -> newest)
  const progressPoints = React.useMemo(() => {
    const results = Array.isArray(selectedEmployee?.results)
      ? selectedEmployee.results
      : [];
    const withPct = results
      .map((r, idx) => {
        const pct = scoreToPercent(r.score);
        const ts = r.created_at || r.updated_at || r.taken_on || idx; // fallback stable order
        const dateMs = typeof ts === "string" ? Date.parse(ts) : ts;
        return { pct, dateMs, raw: r };
      })
      .filter((p) => !isNaN(p.pct));

    return withPct.sort((a, b) => (a.dateMs || 0) - (b.dateMs || 0));
  }, [selectedEmployee]);

// Build dropdown options from allRestaurants
const restaurantOptions = React.useMemo(() => {
  const base = [{ key: 'all', text: 'All Restaurants', value: '' }];
  const rest = (allRestaurants || []).map(r => ({
    key: r.id,
    text: r.name,
    value: String(r.id),
  }));
  return base.concat(rest);
}, [allRestaurants]);

// Apply restaurant filter on top of search-filtered employees
const employeesForList = React.useMemo(() => {
  if (!restaurantFilter) return filteredEmployees;
  const filterId = String(restaurantFilter);
  return filteredEmployees.filter(emp => {
    const rid = typeof emp.restaurant === 'object' ? emp.restaurant?.id : emp.restaurant;
    return String(rid ?? '') === filterId;
  });
}, [filteredEmployees, restaurantFilter]);

  const filteredRestaurants = React.useMemo(() => {
    const q = restaurantSearch.toLowerCase();
    return (allRestaurants || []).filter(r => {
      const hay = `${r.name || ''} ${r.city || ''} ${r.state || ''}`.toLowerCase();
      return hay.includes(q);
    });
  }, [allRestaurants, restaurantSearch]);

  const selectRestaurantById = (id) => {
    const match = (allRestaurants || []).find(r => String(r.id) === String(id));
    setSelectedRestaurant(match || null);
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
          {user && user.role === 'Admin' && (
            <Button
              primary
              fluid
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
              onClick={() => setNewRestModalOpen(true)}
            >
              + New Restaurant
            </Button>

            


          )}

             {/* Admin-only: Restaurant modals trigger buttons */}
      {user && user.role === 'Admin' && (
        <>
            <Button
              primary
              fluid
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
              onClick={() => setRestListOpen(true)}
            >
              View Restaurants
            </Button>

        </>
      )}

          <h3>All Employees</h3>

          {user && ['Admin'].includes(user.role) && (
            <div style={{ marginBottom: '0.75rem' }}>
              <strong>Filter by Restaurant:&nbsp;</strong>
              <Dropdown
                selection
                fluid
                options={restaurantOptions}
                value={restaurantFilter}
                onChange={(e, { value }) => { setRestaurantFilter(value); if (value) selectRestaurantById(value); }}
                placeholder="All Restaurants"
              />
            </div>
          )}


          <SearchList
           data={employeesForList}
            onSearch={(val) => {
              const filtered = allEmployees.filter((emp) => {
                const fullName = `${emp.first_name || ""} ${
                  emp.last_name || ""
                }`.toLowerCase();
                return fullName.includes(val);
              });
              setFilteredEmployees(filtered);
            }}
            onSelect={(emp) => {
              const enriched = filteredEmployees.find((e) => e.id === emp.id);
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
                <strong>Restaurant:</strong>{" "}
                {(() => {
                  if (!selectedEmployee.restaurant) return <i>(none)</i>;
                  const restId =
                    typeof selectedEmployee.restaurant === "object"
                      ? selectedEmployee.restaurant.id
                      : selectedEmployee.restaurant;
                  const match = allRestaurants.find((r) => r.id === restId);
                  return match ? match.name : `Restaurant ID: ${restId}`;
                })()}
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
                    .map((res) => {
                      const match =
                        typeof res.score === "string"
                          ? res.score.match(/^(\d+)\s*out\s*of\s*(\d+)/i)
                          : null;
                      if (!match) return NaN;
                      const correct = parseFloat(match[1]);
                      const total = parseFloat(match[2]);
                      return total > 0 ? (correct / total) * 100 : NaN;
                    })
                    .filter((pct) => !isNaN(pct));

                  if (!percentages.length) return <i>(no valid scores)</i>;

                  const totalPct = percentages.reduce((sum, p) => sum + p, 0);
                  return (totalPct / percentages.length).toFixed(0) + "%";
                })()}
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
          {/* Progress over time (scores) */}
          {selectedEmployee && (
            <Segment>
              <h4 style={{ marginTop: 0 }}>Progress</h4>
              {progressPoints.length >= 1 ? (
                (() => {
                  const width = 600;
                  const height = 120;
                  const padding = 10;
                  const usableW = width - padding * 2;
                  const usableH = height - padding * 2;
                  const n = progressPoints.length;
                  const xFor = (i) =>
                    (n === 1 ? usableW / 2 : (i / (n - 1)) * usableW) + padding;
                  const yFor = (pct) =>
                    height - padding - (pct / 100) * usableH;
                  const pointsAttr = progressPoints
                    .map((p, i) => `${xFor(i)},${yFor(p.pct)}`)
                    .join(" ");
                  return (
                    <svg
                      viewBox={`0 0 ${width} ${height}`}
                      width="100%"
                      height="140"
                    >
                      <rect
                        x={padding / 6}
                        y={padding / 6}
                        width={width - padding / 2}
                        height={height - padding / 2}
                        fill="#e6f7ff"
                      />
                      {/* Grid lines */}
                      <line
                        x1={padding}
                        y1={yFor(100)}
                        x2={width - padding}
                        y2={yFor(100)}
                        stroke="#ccc"
                        strokeDasharray="4 4"
                      />
                      <line
                        x1={padding}
                        y1={yFor(50)}
                        x2={width - padding}
                        y2={yFor(50)}
                        stroke="#ccc"
                        strokeDasharray="4 4"
                      />
                      <line
                        x1={padding}
                        y1={yFor(0)}
                        x2={width - padding}
                        y2={yFor(0)}
                        stroke="#ccc"
                        strokeDasharray="4 4"
                      />
                      {/* Polyline for progress */}
                      <polyline
                        fill="none"
                        stroke="orange"
                        strokeWidth="2"
                        points={pointsAttr}
                      />
                      {/* Points */}
                      {progressPoints.map((p, i) => (
                        <circle
                          key={`pt-${i}`}
                          cx={xFor(i)}
                          cy={yFor(p.pct)}
                          r="3"
                        />
                      ))}
                      {/* Axis labels */}
                      <text x={padding} y={yFor(100) - 4} fontSize="10">
                        100%
                      </text>
                      <text x={padding} y={yFor(50) - 4} fontSize="10">
                        50%
                      </text>
                      <text x={padding} y={yFor(0) - 4} fontSize="10">
                        0%
                      </text>
                    </svg>
                  );
                })()
              ) : (
                <p style={{ fontStyle: "italic" }}>No scored results yet.</p>
              )}
            </Segment>
          )}
          <h4>Test Results</h4>

          <Segment style={{ maxHeight: "600px", overflowY: "auto" }}>
            {selectedEmployee ? (
              (selectedEmployee.results || [])
                .slice()
                .reverse()
                .map((res, idx) => {
                  const test = Array.isArray(allTests)
                    ? allTests.find((t) => t.id === res.the_test)
                    : null;
                  return (
                    <div
                      key={`${selectedEmployee.id}-${idx}`}
                      style={{ marginBottom: "1em" }}
                    >
                      <ResultsSegment
                        result={res}
                        user={user}
                        msgAlert={msgAlert}
                        label={test ? test.name : "Unknown Test"}
                        showWrongDetails={false}
                      />
                    </div>
                  );
                })
            ) : (
              <p style={{ fontStyle: "italic" }}>
                Select an employee to view results.
              </p>
            )}
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
                  allRestaurants={allRestaurants}
                />

                <AssignTestModal
                  user={user}
                  employee={selectedEmployee}
                  tests={allTests}
                  msgAlert={msgAlert}
                  allQuestions={allQuestions}
                  onAssigned={(newAssignedIds) => {
                    // Update selected employee in place
                    setSelectedEmployee((prev) =>
                      prev ? { ...prev, assigned_tests: newAssignedIds } : prev
                    );
                    // Update employees arrays
                    setAllEmployees((prev) =>
                      prev.map((emp) =>
                        emp.id === selectedEmployee.id
                          ? { ...emp, assigned_tests: newAssignedIds }
                          : emp
                      )
                    );
                    setFilteredEmployees((prev) =>
                      prev.map((emp) =>
                        emp.id === selectedEmployee.id
                          ? { ...emp, assigned_tests: newAssignedIds }
                          : emp
                      )
                    );
                  }}
                />
                <Button
                  color="blue"
                  fluid
                  style={{ marginTop: "1rem", marginBottom: "1rem" }}
                  onClick={() => setLogOpen(true)}
                >
                  Show Edit Log
                </Button>
                <EditLogModal
                  open={logOpen}
                  onClose={() => setLogOpen(false)}
                  user={user}
                  itemType="User"
                  itemId={selectedEmployee?.id}
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
      {/* Restaurants List Modal */}
      <Modal open={restListOpen} onClose={() => setRestListOpen(false)} size="small">
        <Modal.Header>All Restaurants</Modal.Header>
        <Modal.Content>
          <Input
            icon="search"
            placeholder="Search restaurants by name, city, or state..."
            value={restaurantSearch}
            onChange={(e) => setRestaurantSearch(e.target.value)}
            fluid
            style={{ marginBottom: '0.75rem' }}
          />
          <div style={{ maxHeight: 400, overflowY: 'auto' }}>
            <List divided selection>
              {filteredRestaurants.map((r) => (
                <List.Item
                  key={r.id}
                  active={selectedRestaurant && String(selectedRestaurant.id) === String(r.id)}
                  onClick={() => setSelectedRestaurant(r)}
                >
                  <List.Content floated='right'>
                    <Button size='mini' onClick={(e) => { e.stopPropagation(); setSelectedRestaurant(r); setRestListOpen(false); setRestUpdateOpen(true); }}>Edit</Button>
                  </List.Content>
                  <List.Content>
                    <List.Header>{r.name || `Restaurant #${r.id}`}</List.Header>
                    <List.Description>
                      {(r.city || r.state) ? `${r.city || ''}${r.city && r.state ? ', ' : ''}${r.state || ''}` : '—'}
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setSelectedRestaurant(null)}>Clear Selection</Button>
          <Button
            negative
            disabled={!selectedRestaurant}
            onClick={() => {
              if (!selectedRestaurant) return;
              const ok = window.confirm(`Delete "${selectedRestaurant.name || 'this restaurant'}"? This cannot be undone.`);
              if (!ok) return;
              deleteRestaurant(user, selectedRestaurant.id)
                .then(() => {
                  setAllRestaurants((prev) => prev.filter(r => r.id !== selectedRestaurant.id));
                  setSelectedRestaurant(null);
                  msgAlert({ heading: 'Deleted', message: 'Restaurant removed.', variant: 'success' });
                })
                .catch((err) => {
                  console.error('[DeleteRestaurant] error', err?.response?.status, err?.response?.data || err?.message);
                  msgAlert({ heading: 'Error', message: 'Failed to delete restaurant.', variant: 'danger' });
                });
            }}
          >
            Delete
          </Button>
          <Button
            disabled={!selectedRestaurant}
            onClick={() => { setRestListOpen(false); setRestUpdateOpen(true); }}
            primary
          >
            Edit Selected
          </Button>
          <Button onClick={() => setRestListOpen(false)}>Close</Button>
        </Modal.Actions>
      </Modal>

      {/* Update Restaurant Modal */}
      <Modal open={restUpdateOpen} onClose={() => setRestUpdateOpen(false)} size="small">
        <Modal.Header>Update Restaurant</Modal.Header>
        <Modal.Content>
          {selectedRestaurant ? (
            <Form
              onSubmit={
                (e) => {
                  e.preventDefault();
                  const form = e.target;
                  const payload = {
                    name: form.name.value,
                    city: form.city.value,
                    state: form.state.value,
                  };
                  updateRestaurant(user, payload, selectedRestaurant.id)
                    .then(() => {
                      setAllRestaurants((prev) => prev.map(r => (r.id === selectedRestaurant.id ? { ...r, ...payload } : r)));
                      setSelectedRestaurant((prev) => (prev ? { ...prev, ...payload } : prev));
                      msgAlert({ heading: 'Saved', message: 'Restaurant updated.', variant: 'success' });
                      setRestUpdateOpen(false);
                    })
                    .catch((err) => {
                      console.error('[UpdateRestaurant] error', err?.response?.status, err?.response?.data || err?.message);
                      msgAlert({ heading: 'Error', message: 'Failed to update restaurant.', variant: 'danger' });
                    });
                }
              }
            >
              <Form.Input name="name" label="Name" defaultValue={selectedRestaurant.name || ''} required />
              <Form.Group widths="equal">
                <Form.Input name="city" label="City" defaultValue={selectedRestaurant.city || ''} />
                <Form.Input name="state" label="State" defaultValue={selectedRestaurant.state || ''} />
              </Form.Group>
              <Button primary type="submit">Save</Button>
              <Button type="button" onClick={() => setRestUpdateOpen(false)}>Cancel</Button>
            </Form>
          ) : (
            <p style={{ fontStyle: 'italic' }}>Select a restaurant from the list first.</p>
          )}
        </Modal.Content>
      </Modal>

      <NewEmployeeModal
        open={newEmpModalOpen}
        onClose={() => setNewEmpModalOpen(false)}
        user={user}
        allRestaurants={allRestaurants}
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
      <NewRestaurantModal
        open={newRestModalOpen}
        onClose={() => setNewRestModalOpen(false)}
        user={user}
      />
    </Segment>
  );
};

export default EmployeePage;

import React, { useState, useEffect } from "react";
import { Grid, Segment, List, Input, Dropdown } from "semantic-ui-react";
import LoadingScreen from "../shared/LoadingPage";
import { getAllResults, getMyResults } from "../../api/result";
import { getAllTests } from "../../api/test";
import { getAllEmployees } from "../../api/user";
import { getAllRestaurants } from '../../api/restaurant'
import ResultsSegment from "./ResultsSegment";

const ResultsPage = ({ user, msgAlert, setUser }) => {
  const [allResults, setAllResults] = useState([]);
  const [allTests, setAllTests] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [ownerName, setOwnerName] = useState("");
  const [empSearch, setEmpSearch] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [restLoading, setRestLoading] = useState(false);
  const [restFilter, setRestFilter] = useState(''); // '' = all, 'none' = no restaurant, otherwise id

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

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (typeof getAllRestaurants !== 'function') return;
      try {
        setRestLoading(true);
        const resp = user ? await getAllRestaurants(user) : await getAllRestaurants();
        const list = Array.isArray(resp?.data) ? resp.data : (resp?.data?.restaurants || resp?.data || []);
        if (mounted) setRestaurants(Array.isArray(list) ? list : []);
      } catch (e) {
        if (mounted) setRestaurants([]);
        if (process.env.NODE_ENV !== 'production') {
          console.warn('[ResultsPage] getAllRestaurants failed', e?.response?.status, e?.response?.data);
        }
      } finally {
        if (mounted) setRestLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [user, getAllRestaurants]);

  const getTestNameById = (testRef) => {
    const testId =
      typeof testRef === "object" && testRef !== null ? testRef.id : testRef;
    const test = allTests.find(
      (t) => t.id === testId || t.id === Number(testId)
    );
    return test ? test.name : "Unknown Test";
  };

  const restaurantsById = React.useMemo(() => {
    const map = new Map();
    if (Array.isArray(restaurants)) {
      restaurants.forEach(r => {
        if (r?.id != null) map.set(Number(r.id), r);
      });
    }
    return map;
  }, [restaurants]);

  const getRestaurantNameById = (restRef) => {
    let id = null;
    if (restRef && typeof restRef === 'object') {
      id = restRef.id ?? restRef.pk ?? null;
    } else if (restRef !== undefined) {
      id = restRef;
    }
    if (id == null || id === '') return 'No Restaurant';
    const r = restaurantsById.get(Number(id));
    return r ? (r.city && r.state ? `${r.name} — ${r.city}, ${r.state}` : r.name) : `Restaurant #${id}`;
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
    if (restFilter !== '') {
      list = list.filter((r) => {
        const rid = (r.restaurant !== undefined && r.restaurant !== null && r.restaurant !== '')
          ? (typeof r.restaurant === 'object' ? (r.restaurant.id ?? r.restaurant.pk ?? null) : r.restaurant)
          : (r.restaurant_id ?? null);
        if (restFilter === 'none') return rid == null;
        return String(rid) === String(restFilter);
      });
    }
    return list;
  }, [allResults, isMgrish, empSearch, employeesById, restFilter]);

  return (
    <Segment raised>
      <Grid columns={3} divided padded>
        <Grid.Column width={5}>
          <h3>
            {isMgrish ? 'All Test Results' : 'Your Test Results'}
          </h3>
          {isMgrish && (
            <div style={{ margin: '0.5rem 0 0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ flex: 1 }}>
                  <Input
                    fluid
                    icon="search"
                    placeholder="Filter by employee name..."
                    value={empSearch}
                    onChange={(e, { value }) => setEmpSearch(value)}
                  />
                </div>
                {user && user.role === 'Admin' && (
                  <div style={{ minWidth: 220 }}>
                    <Dropdown
                      fluid
                      selection
                      clearable
                      placeholder={restLoading ? 'Loading restaurants…' : 'Filter by restaurant'}
                      options={(() => {
                        const opts = Array.isArray(restaurants) ? restaurants.map(r => ({
                          key: String(r.id), value: String(r.id), text: r.name
                        })) : [];
                        return [
                          { key: 'all', value: '', text: 'All Restaurants' },
                          { key: 'none', value: 'none', text: 'No Restaurant' },
                          ...opts
                        ];
                      })()}
                      value={restFilter}
                      onChange={(e, { value }) => setRestFilter(value)}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          {resultsForList.length > 0 ? (
            <div style={{ maxHeight: '650px', overflowY: 'auto' }}>
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
                        <br />
                        <span>Restaurant: {getRestaurantNameById(result.restaurant ?? result.restaurant_id)}</span>
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
            </div>
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
              setOwnerName={setOwnerName}
              getAllRestaurants={getAllRestaurants}
              showWrongDetails={true}
              user={user}
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

import React, { useState, useEffect } from "react";

import { Segment, Header, Divider, Label } from "semantic-ui-react"

const ResultsSegment = ({ result, allTests, employees, setOwnerName, user, label, getAllRestaurants, showWrongDetails = true }) => {
  if (process.env.NODE_ENV !== 'production') {
    try { console.log('[ResultsSegment] result payload', result); } catch {}
  }
  const [restaurants, setRestaurants] = useState([]);
  const [restLoading, setRestLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (typeof getAllRestaurants !== 'function') return;
      try {
        setRestLoading(true);
        const resp = await getAllRestaurants();
        const list = Array.isArray(resp?.data) ? resp.data : (resp?.data?.restaurants || resp?.data || []);
        if (mounted) setRestaurants(Array.isArray(list) ? list : []);
      } catch (e) {
        if (mounted) setRestaurants([]);
        if (process.env.NODE_ENV !== 'production') {
          try { console.warn('[ResultsSegment] getAllRestaurants failed', e?.response?.status, e?.response?.data); } catch {}
        }
      } finally {
        if (mounted) setRestLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [getAllRestaurants]);

  const getTestName = (testId) => {
    const testArray = Array.isArray(allTests) ? allTests : [];
    const idStr = String(typeof testId === 'object' ? testId?.id : testId);
    const match = testArray.find((test) => String(test.id) === idStr);
    return match ? match.name : "Unknown Test";
  }

  const getOwnerEmail = (ownerId) => {
    const match = Array.isArray(employees) ? employees.find((emp) => emp.id === ownerId) : null;
    return match ? match.email : "Unknown User Email"
  }

  const getOwnerFullName = (ownerId) => {
    const match = Array.isArray(employees) ? employees.find((emp) => emp.id === ownerId) : null;
    if (!match) return "Unknown User"
    return `${match.first_name || ""} ${match.last_name || ""}`.trim()
  }

  const toArray = (val) => {
    if (Array.isArray(val)) return val;
    if (val == null) return [];
    if (typeof val === 'string') {
      // Try JSON first
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) return parsed;
      } catch {}
      // Fallback: comma/space separated list "1,2,3"
      const parts = val.split(/[\s,]+/).filter(Boolean);
      return parts.map((p) => (isNaN(Number(p)) ? p : Number(p)));
    }
    // Unknown shape -> nothing
    return [];
  };

  // Pull questions for this result's test from the allTests prop
  // Helper to resolve restaurant name
  const getRestaurantName = (rid) => {
    if (!rid) return 'No Restaurant';
    const list = Array.isArray(restaurants) ? restaurants : [];
    const match = list.find(r => String(r.id) === String(rid));
    if (!match) return String(rid);
    return match.city && match.state ? `${match.name} — ${match.city}, ${match.state}` : match.name;
  };
  const getQuestionsForTest = () => {
    const testId = typeof result?.the_test === 'object' ? result?.the_test?.id : result?.the_test;
    const tests = Array.isArray(allTests) ? allTests : [];
    const testObj = tests.find((t) => String(t.id) === String(testId));
    if (!testObj) return [];
    // Some shapes are already an array of question objects; others may nest under question_new
    const qs = Array.isArray(testObj.question_new) ? testObj.question_new : [];
    return qs;
  };

  const getQuestionText = (qid) => {
    const qs = getQuestionsForTest();
    // support shapes: { id, question_str } or { question_new: { id, question_str } }
    const match = qs.find((q) => String(q.id) === String(qid) || String(q?.question_new?.id) === String(qid));
    if (!match) return String(qid);
    return match.question_str || match?.question_new?.question_str || String(qid);
  };

  useEffect(() => {
    if (result && employees && employees.length > 0) {
      const owner = employees.find((emp) => emp.id === result.owner);
      const fullName = owner ? `${owner.first_name} ${owner.last_name}` : "";
      if (setOwnerName) {
        setOwnerName(fullName);
      }
    }
  }, [result, employees, setOwnerName]);

  const wrongIds = toArray(result?.wrong_question_ids);

  return (
    <Segment raised>
      <Label ribbon color="black" size="huge">
        {label || `Test: ${getTestName(result.the_test)}`}
      </Label>
      {/* <Header as="h4" style={{ textAlign: "right" }} color="grey" size="small">
        Taken by: {getOwnerFullName(result.owner)} 
        <Divider></Divider>
        Email: {getOwnerEmail(result.owner)}
      </Header> */}

      <Divider />

      {/* <Header as="h3" style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
        Test Stats
      </Header> */}
      <p style={{ fontSize: "1.25rem" }}><strong>Correct:</strong> {result.correct}</p>
      <p style={{ fontSize: "1.25rem" }}><strong>Wrong:</strong> {result.wrong}</p>
      <p style={{ fontSize: "1.25rem" }}>
        <strong>Restaurant:</strong> {(() => {
          const restId = (result?.restaurant && typeof result.restaurant === 'object')
            ? (result.restaurant.id ?? result.restaurant.pk ?? null)
            : (result?.restaurant ?? result?.restaurant_id ?? null);
          return getRestaurantName(restId);
        })()}
      </p>
      <div
        style={{
          fontSize: "2rem",
          float: "right",
          fontWeight: "bold",
          marginBottom: "1rem",
          color:
            result.score < 70
              ? "red"
              : result.score < 80
              ? "goldenrod"
              : result.score < 90
              ? "green"
              : "dodgerblue",
        }}
      >
        Score: {result.percent}
        <div style={{ clear: "both", marginBottom: "1.5rem" }}></div>
      </div>
      <p style={{ fontSize: "1.25rem" }}><strong>Score:</strong> {result.score}</p>
      <p style={{ fontSize: "1.25rem" }}><strong>Total Questions:</strong> {result.total}</p>
      <p style={{ fontSize: "1.25rem" }}><strong>Elapsed:</strong> {result.time || '—'}</p>
      <p style={{ fontSize: "1.25rem" }}><strong>Time Completed:</strong> {result.time_completed || '—'}</p>

      {showWrongDetails && (
        (Array.isArray(result?.wrong_question_ids) || typeof result?.wrong_question_ids === 'string') ? (
          wrongIds.length > 0 ? (
            <div style={{ marginTop: '0.75rem' }}>
              <strong>Wrong Questions:</strong>
              <ul style={{ marginTop: '0.25rem' }}>
                {wrongIds.map((qid) => (
                  <li key={String(qid)}>{getQuestionText(qid)}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div style={{ marginTop: '0.75rem' }}>
              <strong>Wrong Questions:</strong> none
            </div>
          )
        ) : null
      )}

      <Divider />

      <p style={{ fontSize: "1.1rem", color: "#888", marginTop: "1rem" }}>
        <strong>Taken On:</strong> {result?.created_at ? new Date(result.created_at).toLocaleString() : '—'}
      </p>
    </Segment>
  )
}

export default ResultsSegment
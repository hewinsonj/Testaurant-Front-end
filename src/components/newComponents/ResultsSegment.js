import React, { useState, useEffect } from "react";

import { Segment, Header, Divider, Label } from "semantic-ui-react"

const ResultsSegment = ({ result, allTests, employees, setOwnerName }) => {
  const getTestName = (testId) => {
    const match = allTests.find((test) => test.id === testId)
    return match ? match.name : "Unknown Test"
  }

  const getOwnerEmail = (ownerId) => {
    const match = employees.find((emp) => emp.id === ownerId)
    return match ? match.email : "Unknown User Email"
  }

  const getOwnerFullName = (ownerId) => {
    const match = employees.find((emp) => emp.id === ownerId)
    if (!match) return "Unknown User"
    return `${match.first_name || ""} ${match.last_name || ""}`.trim()
  }


  useEffect(() => {
    if (result && employees && employees.length > 0) {
      const owner = employees.find((emp) => emp.id === result.owner);
      const fullName = owner ? `${owner.first_name} ${owner.last_name}` : "";
      if (setOwnerName) {
        setOwnerName(fullName);
      }
    }
  }, [result, employees, setOwnerName]);


  return (
    <Segment raised>
      <Label ribbon color="black" size="huge">
        Test: {getTestName(result.the_test)}
      </Label>
      <Header as="h4" style={{ textAlign: "right" }} color="grey" size="small">
        Taken by: {getOwnerFullName(result.owner)} 
        <Divider></Divider>
        Email: {getOwnerEmail(result.owner)}
      </Header>

      <Divider />

      <Header as="h3" style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
        Test Stats
      </Header>
      <p style={{ fontSize: "1.25rem" }}><strong>Correct:</strong> {result.correct}</p>
      <p style={{ fontSize: "1.25rem" }}><strong>Wrong:</strong> {result.wrong}</p>
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

      <Divider />

      <p style={{ fontSize: "1.1rem", color: "#888", marginTop: "1rem" }}>
        <strong>Taken On:</strong> {new Date(result.created_at).toLocaleString()}
      </p>
    </Segment>
  )
}

export default ResultsSegment
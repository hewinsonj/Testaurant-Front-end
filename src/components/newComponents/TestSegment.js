import React from "react";
import { Segment, Grid } from "semantic-ui-react";
import TestShow from "./TestShow";
import TestTake from "./TestTake";

const TestSegment = ({ test, msgAlert, user }) => {
  return (
    <Segment id="actListItems" textAlign="center">
      <Grid centered verticalAlign="middle" textAlign="center">
        <Grid.Row>
          <h2>Test name: {test.name}</h2>
          <h2>Created: {test.created_at}</h2>
        </Grid.Row>
        <Grid.Row>
          <TestShow test={test} user={user} msgAlert={msgAlert} />
          <TestTake test={test} user={user} msgAlert={msgAlert} />
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default TestSegment;

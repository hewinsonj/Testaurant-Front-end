import React from "react";
import { Segment, Grid } from "semantic-ui-react";
import FoodShow from "./FoodShow";

const FoodSegment = ({ food, msgAlert, user }) => {
  return (
    <Grid.Column>
      <Segment id="actListItems" textAlign="center">
        <Grid centered verticalAlign="middle" textAlign="center">
          <Grid.Row>
            <h2>{food.name}</h2>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <FoodShow food={food} user={user} msgAlert={msgAlert} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Grid.Column>
  );
};

export default FoodSegment;

import { Segment, Grid } from "semantic-ui-react";
import DrinkShow from "./DrinkShow";

const DrinkSegment = ({ drink, msgAlert, user }) => {
  return (
    <Grid.Column>
      <Segment id="actListItems" textAlign="center">
        <Grid centered verticalAlign="middle" textAlign="center">
          <Grid.Row>
            <h2>{drink.name}</h2>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <DrinkShow drink={drink} user={user} msgAlert={msgAlert} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Grid.Column>
  );
};

export default DrinkSegment;

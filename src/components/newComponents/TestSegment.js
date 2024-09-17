import React from "react";
import { Segment, Grid } from "semantic-ui-react";
import TestShow from "./TestShow";
import TestTake from "./TestTake";

<<<<<<< HEAD
const TestSegment = ({ test, msgAlert, user, allQuestions}) => {
    
    return (
         <Segment id='actListItems' textAlign='center'>
                <Grid centered verticalAlign='middle' textAlign='center'>
                    <Grid.Row>
                        <h2>Test name: {test.name}</h2>
                        <h2>Created: {test.created_at}</h2>
<<<<<<< HEAD
                        </Grid.Row>
                        <Grid.Row>
                        <TestShow  test={test} user={user} msgAlert={msgAlert} allQuestions={allQuestions}/>
                        <TestTake  test={test} user={user} msgAlert={msgAlert} allQuestions={allQuestions}/>
                        </Grid.Row>
                    </Grid>
=======
                    </Grid.Row>
                    <Grid.Row>
                        <TestShow  test={test} user={user} msgAlert={msgAlert}/>
                        <TestTake  test={test} user={user} msgAlert={msgAlert}/>
                    </Grid.Row>
                </Grid>
>>>>>>> 27bdab7 (cleaned up)
        </Segment>
    )
}
=======
const TestSegment = ({ test, msgAlert, user }) => {
  return (
    <Grid.Column>
      <Segment id="actListItems" textAlign="center">
        <Grid centered verticalAlign="middle" textAlign="center" columns={2}>
          <Grid.Row>
            <h2>Test name: {test.name}</h2>
            <h2>Created: {test.created_at}</h2>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <TestShow test={test} user={user} msgAlert={msgAlert} />
            </Grid.Column>
            <Grid.Column textAlign="center">
              <TestTake test={test} user={user} msgAlert={msgAlert} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Grid.Column>
  );
};
>>>>>>> 9c93d0e (First push of Testaurant 2point0)

export default TestSegment;

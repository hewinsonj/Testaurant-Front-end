import React, { useEffect, useState } from "react";
import { Button, Segment, Grid, Form } from "semantic-ui-react";
import { useNavigate, useParams } from "react-router-dom";
import { getTest, deleteTest } from "../../api/test";
import LoadingScreen from "../shared/LoadingPage";

const TestTakePage = ({ user, msgAlert, test }) => {
  const [open, setOpen] = React.useState(false);
  const { testId } = useParams();

  useEffect(() => {
    getTest(user, testId).catch((error) => {
      msgAlert({
        heading: "Failure",
        message: "Show Test failed" + error,
        variant: "danger",
      });
    });
  });

  if (!test) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Segment inverted verticalAlign="middle" id="segment">
        <Segment>
          <Grid padded textAlign="center">
            <h2>{test.name} </h2>
          </Grid>
        </Segment>
        <Segment inverted class="capitalize-me">
          <Grid centered stretched>
            <Grid.Row padded>
              <Segment fluid>
                <Grid textAlign="center" columns={4}>
                  <Grid.Row>
                    <h2>Why is this so hard?</h2>
                  </Grid.Row>
                  <Grid.Column>
                    <h2>option 1</h2>
                  </Grid.Column>
                  <Grid.Column>
                    <h2>option 2</h2>
                  </Grid.Column>
                  <Grid.Column>
                    <h2>option 3</h2>
                  </Grid.Column>
                  <Grid.Column>
                    <h2>option 4</h2>
                  </Grid.Column>
                  <Grid.Row>
                    <Form>
                      <Form.Input
                        required
                        name="answer"
                        id="answer"
                        label="answer"
                        placeholder="answer"
                        defaultValue={"Your Answer"}
                      />
                      <Button type="submit" color="green">
                        Submit
                      </Button>
                    </Form>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Row>
          </Grid>
        </Segment>
      </Segment>
    </>
  );
};

export default TestTakePage;

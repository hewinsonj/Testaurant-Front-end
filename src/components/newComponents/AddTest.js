import React from "react";
import { Button, Form, Container, Segment, Grid } from "semantic-ui-react";
import LoadingScreen from "../shared/LoadingPage";

const AddTest = (props) => {
  const {
    heading,
    test,
    allQuestions,
    handleSubmit,
    handleChange,
    handleChangeOther,
    handleChecked,
  } = props;

  return (
    <Container className="justify-content-center">
      <h3>{heading}</h3>
      <Form onSubmit={handleSubmit}>
        <Grid centered columns={1}>
          <Grid.Row>
            <Segment>
              <Form.Input
                required
                name="name"
                id="name"
                label="Test Name"
                placeholder="Test Name"
                defaultValue={test.name}
                value={test.name}
                onChange={handleChangeOther}
              />
            </Segment>
          </Grid.Row>
          <Grid.Column>
            <Segment raised textAlign="middle">
              <h1 id="commFeed">All Questions</h1>
              <div className="scrolling-group">
                {allQuestions ? (
                  allQuestions
                    .slice(0)
                    .reverse()
                    .map((question) => (
                      <Form.Checkbox
                        name="question_ids"
                        id={question.id}
                        label={question.question_str}
                        value={question.id}
                        onChange={handleChange}
                        // defaultChecked= { handleChecked }
                      />
                    ))
                ) : (
                  <LoadingScreen />
                )}
              </div>
            </Segment>
          </Grid.Column>
        </Grid>
        <Button type="submit" color="green">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddTest;

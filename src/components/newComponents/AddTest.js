import React from "react";
import { Button, Form, Container, Segment, Grid } from "semantic-ui-react";
import LoadingScreen from "../shared/LoadingPage";

const AddTest = (props) => {
  const {
    heading,
    test,
    allQuestions,
    relatedQuestions,
    handleSubmit,
    handleChange,
    handleChangeOther,
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
                value={test.name}
                onChange={handleChangeOther}
              />
            </Segment>
          </Grid.Row>
          <Grid.Column>
            <Segment raised >
              <h1 id="commFeed">All Questions</h1>
              <div className="scrolling-group">
                {allQuestions ? (
                  allQuestions.map((question) => (
                    <Form.Checkbox
                      key={question.id}
                      name="question_ids"
                      id={String(question.id)}
                      label={question.question_str}
                      value={question.id}
                      defaultChecked={test.question_new.some((q) => q.id === question.id)} // Preselect relevant questions
                      
                      onChange={handleChange}
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
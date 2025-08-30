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

  const handleAllottedTimeChange = (e, data) => {
    const raw = data?.value;
    const num = Number(raw);
    const safe = Number.isFinite(num) && num > 0 ? Math.floor(num) : 0;
    // Call the parent handler in Semantic-UI style with a normalized payload
    return handleChangeOther(e, { ...data, name: 'allotted_time', value: String(safe) });
  };

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
                value={test?.name ?? ''}
                onChange={handleChangeOther}
              />
              <Form.Input
                required
                type="number"
                name="allotted_time"
                id="allotted_time"
                label="Allotted Time (minutes)"
                placeholder="Enter minutes"
                value={test?.allotted_time ?? ''}
                onChange={handleAllottedTimeChange}
                min="0"
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
                      defaultChecked={Array.isArray(test?.question_new) && test.question_new.some((q) => q.id === question.id)} // Preselect relevant questions
                      
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
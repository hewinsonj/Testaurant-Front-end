import React, { useState } from "react";
import { Button, Segment, Grid, Modal } from "semantic-ui-react";
import { deleteTest } from "../../api/test";
import TestUpdateModal from "./TestUpdateModal";
import EditLogModal from "./EditLogModal";
import LoadingScreen from "../shared/LoadingPage";

const TestShow = ({ test, msgAlert, user, allQuestions }) => {
  const [open, setOpen] = useState(false);

  const handleDeleteTest = () => {
    deleteTest(user, test.id)
      .then(() => {
        msgAlert({
          heading: "Success",
          message: "Test deleted successfully.",
          variant: "success",
        });
      })
      .then(() => setOpen(false))
      .catch((error) => {
        msgAlert({
          heading: "Failure",
          message: `Failed to delete test: ${error.message}`,
          variant: "danger",
        });
      });
  };

  // Function to filter and find relevant questions for the current test
  const findRelevantQuestions = (test, allQuestions) => {
    return allQuestions.filter((question) =>
      test.question_new.some((testQuestion) => testQuestion.id === question.id)
    );
  };

  const relevantQuestions = allQuestions ? findRelevantQuestions(test, allQuestions) : [];

  if (!test) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button>Show Test</Button>}
        size="large"
      >
        <Modal.Content scrolling>
          <Segment inverted verticalAlign="middle" id="segment">
            <Segment>
              <Grid padded textAlign="center">
                <h2>{test.name}</h2>
              </Grid>
            </Segment>
            <Segment inverted>
              <Grid centered stretched>
                <Grid.Row>
                  <Segment fluid>
                    <Grid textAlign="center" columns={2}>
                      <Grid.Row>
                        <h2>Created by: {test.owner}</h2>
                      </Grid.Row>
                      <Grid.Column>
                        <h3>Created on:</h3>
                        <h3>{test.created_at}</h3>
                        <h3>Updated on:</h3>
                        <h3>{test.updated_at}</h3>
                      </Grid.Column>
                      <Grid.Column>
                        <h3>Questions:</h3>
                        {relevantQuestions.length > 0 ? (
                          relevantQuestions.map((question) => (
                            <h4 key={question.id}>
                              (Q) {question.question_str} (A) {question.answer}
                            </h4>
                          ))
                        ) : (
                          <LoadingScreen />
                        )}
                      </Grid.Column>
                    </Grid>
                  </Segment>
                </Grid.Row>
              </Grid>
            </Segment>
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button color="black" onClick={handleDeleteTest}>
            Delete Test
          </Button>
          <Button onClick={() => setOpen(true)}>Show Edit Log</Button>
          <EditLogModal
            open={open}
            onClose={() => setOpen(false)}
            user={user}
            itemType="Test"
            itemId={test.id}
          />
          {/* Pass down relevant questions to TestUpdateModal */}
          <TestUpdateModal
            test={test}
            user={user}
            msgAlert={msgAlert}
            relevantQuestions={relevantQuestions}
            allQuestions={allQuestions}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default TestShow;
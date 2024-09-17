import React, { useEffect, useState } from "react";
import { Button, Segment, Grid, Modal } from "semantic-ui-react";
// import { useNavigate } from 'react-router-dom'
import { deleteTest } from "../../api/test";
import { getAllQuestions } from "../../api/question";
import TestUpdateModal from "./TestUpdateModal";
import LoadingScreen from "../shared/LoadingPage";



const TestShow = ({test, msgAlert, user, allQuestions}) => {

    const [updated, setUpdated] = useState(false)
    const [deleted, setDeleted] = useState(false)
    // const navigate = useNavigate()
    const [open, setOpen] = React.useState(false)
    // const [noteModalShow, setNoteModalShow] = useState(false)
    // const [allQuestions, setAllQuestions] = useState(null)


  
    const handleDeleteTest = () => {
      deleteTest(user, test.id)
      .then(() => {
        // setDeleted(true)
        msgAlert({
          heading: "Success",
          message: "Deleting a Test",
          variant: "success",
        });
      })
      .then(() => {
        setOpen(false);
      })
      .catch((error) => {
        msgAlert({
          heading: "Failure",
          message: "Deleting a Test Failure" + error,
          variant: "danger",
        });
      });
  };

  const findString = (test, question) => {
    for (let i = 0; i < test.question_new.length; i++) {
      if (test.question_new[i].id == question.id) {
        return (
          <h3>
            (Q) {question.question_str} (A) {question.answer}
          </h3>
        );
      }
    }
  };

  
    // console.log('this is the test', test)

    // console.log(allQuestions, "this is all of the questions")
  //   useEffect(() => {
        
  //     getAllQuestions(user)
  //         .then(res => {
  //             setAllQuestions(res.data.question_news)
  //         })
  //         .catch(error => {
  //             msgAlert({
  //                 'heading': 'Error',
  //                 'message': 'Could not get questions',
  //                 'variant': 'danger'
  //             })
  //         })
  // },[])



  if (!test) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button> Show Test</Button>}
        size="large"
      >
        <Modal.Content scrolling>
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
                    <Grid textAlign="center" columns={2}>
                      <Grid.Row>
                        <h2>Created by: {test.owner}</h2>
                      </Grid.Row>
                      <Grid.Column>
                        <h3>Created on: </h3>
                        <h3>{test.created_at}</h3>
                        <h3>Updated on: </h3>
                        <h3>{test.updated_at}</h3>
                      </Grid.Column>
                      <Grid.Column>
                        <h3>
                          {allQuestions ? (
                            allQuestions
                              .slice(0)
                              .map((question) => findString(test, question))
                          ) : (
                            <LoadingScreen />
                          )}
                        </h3>
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
            Delete Item
          </Button>
          <TestUpdateModal test={test} user={user} msgAlert={msgAlert} />
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default TestShow;

import React, { useState } from "react"
import { Button, Segment, Grid, Comment, Form, Modal, } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import { deleteQuestion } from '../../api/question'
import LoadingScreen from "../shared/LoadingPage"
import QuestionUpdateModal from "./QuestionUpdateModal"


const QuestionShow = ({ user, msgAlert, question}) => {

    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false)


    const handleDeleteQuestion = () => {
      deleteQuestion(user, question.id)
      .then(() => {
          msgAlert({
              heading: 'Success',
              message: 'Deleting an Question',
              variant: 'success'
          })
      })
      .then(() => {
        setOpen(false)
      })
      .then(() => {
        navigate(`/test-nav`)
      })
      .catch((error) => {
          msgAlert({
              heading: 'Failure',
              message: 'Deleting a Question Failure' + error,
              variant: 'danger'
          })
      })
  }

  if (!question) {
    return (
      <LoadingScreen />
    )
  }

  return(
    <>  
      <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button floated="right">Show Full Question</Button>}
          size='large'
      >
        <Modal.Content scrolling>   
          <Segment    
            inverted
            verticalAlign='middle' 
            id="segment"
            
          >
            <Segment>
              <Grid padded centered>
                  <h2>{question.question_str} </h2>
              </Grid>
            </Segment>
            <Segment inverted class="capitalize-me">
              <Grid centered stretched textAlign="center">
                  <Grid.Row padded>
                      <Segment fluid>
                          <Grid columns={5} textAlign="center">
                              
                              <Grid.Row>
                                  <h3>Option 1: </h3>
                                  <h3>
                                    {question.option1}
                                  </h3>
                              </Grid.Row>
                              <Grid.Row>
                                  <h3>Option 2: </h3>
                                  <h3>
                                    {question.option2}
                                  </h3>
                              </Grid.Row>
                              <Grid.Row>
                                  <h3>Option 3: </h3>
                                  <h3>
                                    {question.option3}
                                  </h3>
                              </Grid.Row>
                              <Grid.Row>
                                  <h3>Option 4: </h3>
                                  <h3>
                                    {question.option4}
                                  </h3>
                              </Grid.Row>
                              <Grid.Row>
                                  <h3>Answer: </h3>
                                  <h3>
                                    {question.answer}
                                  </h3>
                              </Grid.Row>
                          </Grid>
                      </Segment>
                  </Grid.Row>
              </Grid>
            </Segment>
          </Segment>
        </Modal.Content>
        <Modal.Actions>
            <Button color='black' onClick={() => setOpen(false)}>
                Close
            </Button>
            <Button color='black' onClick={handleDeleteQuestion}>
                Delete
            </Button>
            <QuestionUpdateModal question={question} user={user} msgAlert={msgAlert}/>
        </Modal.Actions>
      </Modal>
    </>
  )
}


export default QuestionShow
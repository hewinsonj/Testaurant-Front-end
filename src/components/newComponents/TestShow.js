import React, { useEffect, useState } from "react"
import { Label, Icon, Item, Button, Segment, Grid, Comment, Form, Modal, Progress, Divider } from 'semantic-ui-react'
import { useNavigate, useParams} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getTest, updateTest, deleteTest } from '../../api/test'
import { getQuestion, getAllQuestions } from "../../api/question"
import TestUpdateModal from "./TestUpdateModal"
import LoadingScreen from "../shared/LoadingPage"



const TestShow = ({test, msgAlert, user, allQuestions}) => {

    const [updated, setUpdated] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false)
    const [noteModalShow, setNoteModalShow] = useState(false)
    // const [allQuestions, setAllQuestions] = useState(null)


    // useEffect(() => {
    //   getTest(user, test.id)
    //     .catch((error) => {
    //         msgAlert({
    //             heading: 'Failure',
    //             message: 'Show Test failed' + error,
    //             variant: 'danger'
    //         })
    //     })
    // },[updated])

    // const handleGet = () => {
    //   getTest(user, testId)
    //     .catch((error) => {
    //         msgAlert({
    //             heading: 'Failure',
    //             message: 'Show Test failed' + error,
    //             variant: 'danger'
    //         })
    //     })
    // }

  
    const handleDeleteTest = () => {
      deleteTest(user, test.id)
      .then(() => {
          setDeleted(true)
          msgAlert({
              heading: 'Success',
              message: 'Deleting a Test',
              variant: 'success'
          })
      })
      .then(() => {
        setOpen(false)
      })
      .catch((error) => {
          msgAlert({
              heading: 'Failure',
              message: 'Deleting a Test Failure' + error,
              variant: 'danger'
          })
      })
  }
   
    const findString = (test, question) => {
      for (let i = 0; i < test.question_new.length; i++) {
        if(test.question_new[i].id == question.id){
          return (<h3>(q){question.question_str}(a){question.answer}</h3> )
        }
      }
    }
    
  //   const findString = (test, allQuestions) => {
  //   for (let i = 0; i < allQuestions.length; i++) {
  //     for (let i = 0; i < test.question_new.length; i++) {
  //       if(test.question_new[i] == allQuestions[i].id){
  //         return allQuestions[i].question_str
  //       }
  //       // console.log(test.question_new, 'this be the test qId', question.id, 'this be the question qId')
  //     }
  //   }
  // }

  
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
            trigger={<Button floated="right" 
            >Show Test</Button>}
            size='large'
        >
            <Modal.Content scrolling>
                
            
      <Segment    
          inverted
          verticalAlign='middle' 
          id="segment"
      >
        <Segment>
          <Grid padded textAlign="center">
          
              <h2>{test.name} </h2>
            
            
          </Grid>
        </Segment>
        <Segment inverted class="capitalize-me">
            <Grid centered stretched>
                <Grid.Row padded>
                    <Segment fluid>
                        <Grid textAlign="center">
                            <Grid.Row >
                            <h2>Created by: {test.owner}</h2>
                            </Grid.Row>
                            <Grid.Row>
                                <h3>Created on: </h3>
                                <h3>
                                  {test.created_at}
                                </h3>
                            </Grid.Row>
                            <Grid.Row>
                                <h3>Updated on: </h3>
                                <h3>
                                  {test.updated_at}
                                </h3>
                                {/* {test.question_new ? 
                                  test.question_new.slice(0).reverse().map((question) => (
                                      <h3>{question}</h3>
                                    ))
                                    :
                                    <LoadingScreen />
                                } */}
                              <h3>
                            {allQuestions ? 
                              allQuestions.slice(0).map((question) => (
                                  findString(test, question)
                              ))
                              :
                              <LoadingScreen />
                            }</h3>

                            {/* <h3>{findString(test, allQuestions)}</h3> */}

                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Grid.Row>
            </Grid>
        </Segment>
        <Grid 
          padded 
          centered
          columns={4}
        >
          <Grid.Row>
            <Grid.Column>
             
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
            <Grid.Column textAlign='middle'>
            </Grid.Column>
            <Grid.Column  textAlign='middle'>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Close
                </Button>
                <Button color='black' onClick={handleDeleteTest}>
                    Delete Item
                </Button>
                <TestUpdateModal test={test} user={user} msgAlert={msgAlert}/>
            </Modal.Actions>
        </Modal>
    </>
  )
}


export default TestShow
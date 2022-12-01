import React, { useEffect, useState } from "react"
import { Label, Icon, Item, Button, Segment, Grid, Comment, Form, Modal, Progress, Divider } from 'semantic-ui-react'
import { useNavigate, useParams} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getTest, updateTest, deleteTest } from '../../api/test'
// import UpdateActivityModal from "./UpdateActivityModal"
import LoadingScreen from "../shared/LoadingPage"
import { createResult } from "../../api/result"



const TestTake = ({ user, msgAlert, test}) => {


  const defaultResult = {
      score: '',
      correct: '0',
      wrong: '',
      total: '',
      percent: '',
      time: '',
      the_test: null
  }
  const defaultResponses = {
    answers: [],
    // answer2: '',
    // answer3: '',
    // answer4: '',
  }
    const [updated, setUpdated] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false)
    const [noteModalShow, setNoteModalShow] = useState(false)
    const [result, setResult] = useState(defaultResult)
    const [responses, setResponses] = useState(defaultResponses)

   



    const handleChange = (e , target) => {
      setResponses(prevResponse => {
          const { name, value } = target
          const updatedName = name
          let updatedValue = value
          // handle number type
          if(target.type === 'number') {
              // change from string to actual number
              updatedValue = parseInt(e.target.value)
          }

          //handle the checkbox
          if (updatedName === 'reponses.answers' && target.checked) {
              updatedValue = true
          } else if (updatedName === 'private' && !target.checked) {
              updatedValue = false
          }

          const updatedResponse = { [updatedName]: updatedValue }

          return { ...prevResponse, ...updatedResponse}
      })
  }

  const handleCreateResult = (e) => {
    // for(let i = 0; i < test.question_new.length; i ++){
    // console.log(test)}
    e.preventDefault()
    for(let i = 0; i < test.question_new.length; i ++){
      
      if(responses.answers[i] === test.question_new[i].answer){
        result.correct += '1'
      } else {
        result.wrong += '1'
        console.log(responses.answers, 'responses.answers')
        console.log(test.question_new, 'test question')
      }
    }
    result.percent = '100'
    
    // (parseInt(result.total)/parseInt(result.correct))
    result.score = '01'
    result.time = '10:00'
    result.total = '' + (test.question_new.length)
    result.score = result.correct + 'out of' + result.total
    result.the_test = test.id
    console.log(result, 'this be the result')
    createResult(user, result)
        // .then(() => handleClose())
        .then(() => {
            msgAlert({
                heading: 'Success',
                message: 'Created Result',
                variant: 'success'
            })
        })
        .then(() => {
            setOpen(false)
        })
        // .then(() => setNewResult(prev => !prev))
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Create Result Failure' + error,
                variant: 'danger'
            })
        })
}


  if (!test) {
    return (
      <LoadingScreen />
    )
  }

  // const questionsJSX = test.question_new.slice(0).reverse().map((question) => (
  const questionsJSX = (test) => {  for (let i = 0; i < test.question_new.length; i++) { return (
    <Segment inverted class="capitalize-me">
            <Grid centered stretched>
                <Grid.Row padded>
                    <Segment fluid>
                        <Grid textAlign="center" columns={4}>
                            <Grid.Row >
                            <h2>{test.question_new[i].question_str}</h2>
                            </Grid.Row>
                            <Grid.Column>
                              <h2>{test.question_new[i].option1}</h2>
                            </Grid.Column>
                            <Grid.Column>
                              <h2>{test.question_new[i].option2}</h2>
                            </Grid.Column>
                            <Grid.Column>
                              <h2>{test.question_new[i].option3}</h2>
                            </Grid.Column>
                            <Grid.Column>
                              <h2>{test.question_new[i].option4}</h2>
                            </Grid.Column>
                            <Grid.Row>
                              <Form.Input 
                                required 
                                name={responses.answers[i]}
                                id={responses.answers[i]}
                                label='answer' 
                                placeholder='your answer'
                                onChange={handleChange}
                                value= { responses.answers[i]}
                               />
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Grid.Row>
            </Grid>
        </Segment>
    )}}
// ))

  return(
    <>  
    <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button floated="right" 
            >Take Test</Button>}
            size='large'
        >
            <Modal.Content scrolling>
                
            <Form 
              onSubmit={ handleCreateResult }
            >
            
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
        {questionsJSX(test)}
      </Segment>
      <Button type='submit' color='green'>Submit</Button>
      </Form>
      </Modal.Content>
            <Modal.Actions>
                {/* <Button color='black' onClick={() => setOpen(false)}>
                    Close
                </Button> */}
            </Modal.Actions>
        </Modal>
    </>
  )
}


export default TestTake
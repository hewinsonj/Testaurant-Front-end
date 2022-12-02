import React, { useState } from "react"
import {  Button, Segment, Grid, Form, Modal, Divider } from 'semantic-ui-react'
import LoadingScreen from "../shared/LoadingPage"
import { createResult } from "../../api/result"

const TestTake = ({ user, msgAlert, test}) => {

  const defaultResult = {
      score: '',
      correct: 0,
      wrong: 0,
      total: '',
      percent: 0,
      time: '',
      the_test: null
  }
  const defaultResponses = {
    answer: '',
  }

  const defaultValue = 1
 
    const [updated, setUpdated] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [open, setOpen] = React.useState(false)
    const [result, setResult] = useState(defaultResult)
    const [responses, setResponses] = useState(defaultResponses)
    const [value, setValue] = useState(defaultValue)


    const handleChange = (e , target) => {
      setResponses(prevResponse => {
          const { name, value } = target
          const updatedName = name
          let updatedValue = value
          const updatedResponse = { [updatedName]: updatedValue }

          return { ...prevResponse, ...updatedResponse}
      })
  }


  let index = 0
  const handleCheckAnswer = () => {
    if(responses.answer == test.question_new[index].answer){

      result.correct += 1

    } else {
      result.wrong += 1
    }
    index += 1
    setResponses(defaultResponses)
  }

  const handleCreateResult = (e) => {
    e.preventDefault()
    if(result.correct == 0){
      result.correct = '0'
    } else if (result.wrong == 0){
      result.wrong = '0'
    }
    result.correct = `${result.correct}`
    result.percent = (((result.correct)/parseInt(test.question_new.length)) * 100)
    result.percent = `${result.percent}`+'%'
    result.wrong = `${result.wrong}`
    result.time = ` mins` 
    result.total = '' + (test.question_new.length)
    result.score = `${result.correct}` + ' out of ' + `${result.total}`
    result.the_test = test.id
    if(result.correct !== '0' || result.wrong !== '0'){
      createResult(user, result)
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
      .catch((error) => {
          msgAlert({
              heading: 'Failure',
              message: 'Create Result Failure' + error,
              variant: 'danger'
          })
      })
    }
}

  if (!test) {
    return (
      <LoadingScreen />
    )
  }

  const questionsJSX = test.question_new.slice(0).reverse().map((question) => (

      <>
        <div class='hideMe'>
          <Segment inverted >
            <Grid centered stretched>
              <Grid.Row padded>
                <Segment fluid >
                  <Grid textAlign="center" columns={4}>
                      <Grid.Row >
                        <h2>{question.question_str}</h2>
                      </Grid.Row>
                      <Grid.Column>
                        <h2>{question.option1}</h2>
                      </Grid.Column>
                      <Grid.Column>
                        <h2>{question.option2}</h2>
                      </Grid.Column>
                      <Grid.Column>
                        <h2>{question.option3}</h2>
                      </Grid.Column>
                      <Grid.Column>
                        <h2>{question.option4}</h2>
                      </Grid.Column>
                      <Grid.Row>
                        <Form onSubmit= { handleCheckAnswer }>
                          <Form.Input 
                            required 
                            name='answer'
                            // id='answer'
                            placeholder='your answer'
                            onChange= { handleChange } 
                            // defaultValue={responses.answer}
                            value= {responses.answer}
                          />
                          <h3>Save after every question</h3>
                          <Button type='submit' color='green' >Save</Button>
                        </Form>
                      </Grid.Row>
                  </Grid>
                </Segment>
              </Grid.Row>
            </Grid>
          </Segment>
        </div>
        <Divider section/>
      </>
        
    ))

  return(
    <>  
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button floated="right" 
        >Take Test</Button>}
        size='large'
        closeOnDimmerClick = {false}
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
            {questionsJSX}
          </Segment>
          <Form 
            onSubmit={ handleCreateResult }
          >
            <Button type='submit' color='green'>Submit</Button>

            { (result.correct + result.wrong) == 0 ?
              <Button color='red' floated="right" onClick={() => setOpen(false)}>
                  Cancel
              </Button>
            :
              null
            }
          </Form>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default TestTake
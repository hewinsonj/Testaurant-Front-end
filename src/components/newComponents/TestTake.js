import React, { useEffect, useState } from "react"
import { Label, Icon, Item, Button, Segment, Grid, Comment, Form, Modal, Progress, Divider } from 'semantic-ui-react'
import { useNavigate, useParams} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getTest, updateTest, deleteTest } from '../../api/test'
// import UpdateActivityModal from "./UpdateActivityModal"
import LoadingScreen from "../shared/LoadingPage"



const TestTake = ({ user, msgAlert, test}) => {

    const [updated, setUpdated] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false)
    const [noteModalShow, setNoteModalShow] = useState(false)
    const testId = test.id


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
              message: 'Deleting an Test',
              variant: 'success'
          })
      })
      .then(() => {
        navigate(`/test-nav`)
      })
      .catch((error) => {
          msgAlert({
              heading: 'Failure',
              message: 'Deleting a Test Failure' + error,
              variant: 'danger'
          })
      })
  }


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
            >Take Test</Button>}
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
                            <Form 
                              // onSubmit={ handleCreateResult }
                            >
                <Form.Group widths='equal'>
                    <Form.Input 
                        required 
                        name='question_str'
                        id='question_str'
                        label='Question String' 
                        placeholder='Question String'
                        defaultValue= { 
                          // test.question.question_str 
                          'question_str'
                        }
                        // value= { test.question.question_str }
                    />
                </Form.Group>
                
                <Form.Input 
                        required 
                        name='answer'
                        id='answer'
                        label='answer' 
                        placeholder='answer'
                        defaultValue= { 
                          // test.question.answer
                          "Question Answer"
                        }
                        // value= { test.question.answer}
                    />
                <Form.Group inline>
                
                    
                </Form.Group>
                {/* <Form.Field>
                    <Checkbox 
                        label='Mark Activity as Private'
                        name='private'
                        defaultChecked= { activity.private }
                        onChange={ handleChange }
                    />
                </Form.Field> */}
                {/* <Button icon
                        type='button'
                        color='yellow'
                        label='Generate Random Activity'
                        onClick= { handleActivity }> 
                <Icon name='random' /></Button> */}
                <Button type='submit' color='green'>Submit</Button>
            </Form>
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
            {/* <Modal
              onClose={() => setNoteModalShow(false)}
              onOpen={() => setNoteModalShow(true)}
              open={noteModalShow}
              trigger={
                <Button size='large' variant="warning">Leave a Note</Button>
              }
            >
					<Modal.Content>
            <Segment  
              padded='very'  
              inverted color='yellow' 
              verticalAlign='middle' 
              id="segment"
            >
                <CreateNote user={user} msgAlert={msgAlert} activity={activity} triggerRefresh={()=>setUpdated(prev => !prev)} 
                setNoteModalShow={setNoteModalShow} />
            </ Segment>
            
            <Modal.Actions>
              <Button color='black' onClick={() => setNoteModalShow(false)}>
                Go Back
              </Button>
            </Modal.Actions>
					</Modal.Content>
        		</Modal> */}
             
            </Grid.Column>
            <Grid.Column>
              {/* <NotesModal user={user} msgAlert={msgAlert} activity={activity} /> */}
            </Grid.Column>
            <Grid.Column textAlign='middle'>
                  {/* <UpdateActivityModal 
                    activity={activity}
                    user={user}
                    msgAlert={msgAlert}
                    triggerRefresh={()=>setUpdated(prev=>!prev)}
                    /> */}
                    

          
            </Grid.Column>
            <Grid.Column  textAlign='middle'>

              {/* <Button onClick={() => handleDeleteActivity()} >Delete</Button> */}

            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Close
                </Button>
            </Modal.Actions>
        </Modal>
    </>
  )
}


export default TestTake
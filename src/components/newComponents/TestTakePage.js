import React, { useEffect, useState } from "react"
import { Label, Icon, Item, Button, Segment, Grid, Comment, Form, Modal, Progress, Divider } from 'semantic-ui-react'
import { useNavigate, useParams} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getTest, updateTest, deleteTest } from '../../api/test'
// import UpdateActivityModal from "./UpdateActivityModal"
import LoadingScreen from "../shared/LoadingPage"



const TestTakePage = ({ user, msgAlert, test}) => {

    const [updated, setUpdated] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false)
    const [noteModalShow, setNoteModalShow] = useState(false)
    
    const { testId } = useParams()


    useEffect(() => {
      getTest(user, testId)
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Show Test failed' + error,
                variant: 'danger'
            })
        })
    },[updated])

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
      deleteTest(user, testId)
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
                        <Grid textAlign="center" columns={4}>
                            <Grid.Row >
                            <h2>Why is this so hard?</h2>
                            </Grid.Row>
                            <Grid.Column>
                              <h2>option 1</h2>
                            </Grid.Column>
                            <Grid.Column>
                              <h2>option 2</h2>
                            </Grid.Column>
                            <Grid.Column>
                              <h2>option 3</h2>
                            </Grid.Column>
                            <Grid.Column>
                              <h2>option 4</h2>
                            </Grid.Column>
                            <Grid.Row>
                            <Form 
                              // onSubmit={ handleCreateResult }
                            >
                
                
                
                <Form.Input 
                        required 
                        name='answer'
                        id='answer'
                        label='answer' 
                        placeholder='answer'
                        defaultValue= { 
                          // test.question.answer
                          "Your Answer"
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
  
    </>
  )
}


export default TestTakePage
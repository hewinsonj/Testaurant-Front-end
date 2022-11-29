import React, { useEffect, useState } from "react"
import { Label, Icon, Item, Button, Segment, Grid, Comment, Form, Modal, Progress, Divider } from 'semantic-ui-react'
import { useNavigate, useParams} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getQuestion, updateQuestion, deleteQuestion } from '../../api/question'
// import UpdateActivityModal from "./UpdateActivityModal"
import ActivityForm from "../shared/ActivityForm"
import LoadingScreen from "../shared/LoadingPage"
import QuestionUpdateModal from "./QuestionUpdateModal"



const QuestionShow = ({ user, msgAlert, question}) => {
    const [activity, setActivity] = useState({})
    const [updated, setUpdated] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false)
    const [noteModalShow, setNoteModalShow] = useState(false)
   



    // useEffect(() => {
    //   getQuestion(user, question.id)
    //     .catch((error) => {
    //         msgAlert({
    //             heading: 'Failure',
    //             message: 'Show Question failed' + error,
    //             variant: 'danger'
    //         })
    //     })
    // },[updated])

  
    

    const handleDeleteQuestion = () => {
      deleteQuestion(user, question.id)
      .then(() => {
          setDeleted(true)
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



// if (deleted) navigate('/activities')
// const allActivitiesJSX = allActivities.map(activity => {

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
          <Grid padded>
          
              <h2>{question.question_str} </h2>
            
            
          </Grid>
        </Segment>
        <Segment inverted class="capitalize-me">
            <Grid centered stretched>
                <Grid.Row padded>
                    <Segment fluid>
                        <Grid columns={5}>
                            
                            <Grid.Column>
                                <h3>Option 1: </h3>
                                <h3>
                                  {question.option1}
                                </h3>
                            </Grid.Column>
                            <Grid.Column>
                                <h3>Option 2: </h3>
                                <h3>
                                  {question.option2}
                                </h3>
                            </Grid.Column>
                            <Grid.Column>
                                <h3>Option 3: </h3>
                                <h3>
                                  {question.option3}
                                </h3>
                            </Grid.Column>
                            <Grid.Column>
                                <h3>Option 4: </h3>
                                <h3>
                                  {question.option4}
                                </h3>
                            </Grid.Column>
                            <Grid.Column>
                                <h3>Answer: </h3>
                                <h3>
                                  {question.answer}
                                </h3>
                            </Grid.Column>
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
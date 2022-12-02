import React, { useState } from 'react'
import {  Button, Grid, Modal } from 'semantic-ui-react'

import CreateQuestion from './CreateQuestion'

const AddQuestionModal = ({ user, msgAlert, setNewQuestion, activeItem}) => {

    const [open, setOpen] = useState(false)

    return (       
        <Grid.Column >    
        <Modal
            open={open}
            onClose={()=> setOpen(false)}
            onOpen={()=> setOpen(true)}
            dimmer='blurring'
            size='small'
            trigger={
                <Button inverted color='green' floated='left'>
                    Create Question
                </Button>
            }
        >
            <Modal.Header >
                <Grid centered padded>
                    Create Question
                </Grid>
            </Modal.Header>
            <Modal.Content scrolling>
                <CreateQuestion  user={user} setNewQuestion={setNewQuestion} msgAlert={msgAlert} activeItem={activeItem} setOpen={setOpen}/>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={() => setOpen(false)}>
                    Cancel
                </Button>
            </Modal.Actions> 
        </Modal>   
        </Grid.Column>
    )
}

export default AddQuestionModal
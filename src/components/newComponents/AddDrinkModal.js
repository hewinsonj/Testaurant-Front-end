import React, { useState } from 'react'
import {  Button, Segment, Grid, Label, Icon, Image, Modal, Header, List, Container } from 'semantic-ui-react'

import CreateDrink from './CreateDrink'

const AddDrinkModal = ({heading, user, msgAlert, setNewDrink, activeItem}) => {

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
                    Create Drink Item
                </Button>
            
            }
        >
            <Modal.Header >
                <Grid centered padded>
                    Create Drink Item
                </Grid>
            </Modal.Header>
            <Modal.Content scrolling>
                {/* <Grid columns={2}>
                    
                    <Grid.Column>
                    <Modal.Description>
                    </Modal.Description>
                    </Grid.Column>
                </Grid> */}
                <CreateDrink  user={user} setNewDrink={setNewDrink} msgAlert={msgAlert} activeItem={activeItem} setOpen={setOpen}/>
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

export default AddDrinkModal
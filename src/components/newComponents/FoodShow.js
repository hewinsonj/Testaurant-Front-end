import React, { useEffect, useState } from "react"
import { Label, Icon, Item, Button, Segment, Grid, Comment, Form, Modal, Progress, Divider } from 'semantic-ui-react'
import { useNavigate, useParams} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getFood, updateFood, deleteFood } from '../../api/food'
import LoadingScreen from "../shared/LoadingPage"
import FoodUpdateModal from "./FoodUpdateModal"



const FoodShow = ({ user, msgAlert, food}) => {
    const [activity, setActivity] = useState({})
    const [updated, setUpdated] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false)
   

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

  
    

    const handleDeleteFood = () => {
      deleteFood(user, food.id)
      .then(() => {
          setDeleted(true)
          msgAlert({
              heading: 'Success',
              message: 'Deleting an Food',
              variant: 'success'
          })
      })
      .then(() => {
        setOpen(false)
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

  if (!food) {
    return (
      <LoadingScreen />
    )
  }
  console.log(food.con_egg)
  return(
    <>  
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button floated="right">Show Food Item</Button>}
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
              <h2>{food.name} </h2>
          </Grid>
        </Segment>
        <Segment inverted class="capitalize-me">
            <Grid centered stretched>
                <Grid.Row padded>
                    <Segment fluid>
                        <Grid columns={5}>
                            
                            <Grid.Column>
                                <h3>Ingredients: </h3>
                                <h3>
                                  {food.ingredients}
                                </h3>
                            </Grid.Column>
                            <Grid.Column>
                              <h3>con_tree_nut: {`${food.con_tree_nut}`}</h3>
                            </Grid.Column>
                            <Grid.Column>
                              <h3>con_peanut: {`${food.con_peanut}`}</h3>
                            </Grid.Column>
                            <Grid.Column>
                              <h3>con_shellfish: {`${food.con_shellfish}`}</h3>
                            </Grid.Column> 
                            <Grid.Column>
                              <h3>con_soy: {`${food.con_soy}`}</h3>
                            </Grid.Column>
                            <Grid.Column>
                              <h3>con_fish: {`${food.con_fish}`}</h3>
                            </Grid.Column>    
                            <Grid.Column>
                              <h3>con_wheat: {`${food.con_wheat}`}</h3>
                            </Grid.Column>
                            <Grid.Column>
                                <h3>con_egg: {`${food.con_egg}`}</h3>
                            </Grid.Column>
                            <Grid.Column>
                                 <h3>con_gluten: {`${food.con_gluten}`}</h3>
                            </Grid.Column>
                            <Grid.Column>
                                <h3>con_sesame: {`${food.con_sesame}`}</h3>
                            </Grid.Column>
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
                <Button color='black' onClick={handleDeleteFood}>
                    Delete Item
                </Button>
                <FoodUpdateModal food={food} user={user} msgAlert={msgAlert}/>
            </Modal.Actions>
        </Modal>
    </>
  )
}


export default FoodShow
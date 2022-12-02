import React, { useState } from "react"
import { Label, Icon, Item, Button, Segment, Grid, Modal } from 'semantic-ui-react'
import { useNavigate, useParams} from 'react-router-dom'
import { getFood, updateFood, deleteFood } from '../../api/food'
import LoadingScreen from "../shared/LoadingPage"
import FoodUpdateModal from "./FoodUpdateModal"

const FoodShow = ({ user, msgAlert, food}) => {
    const [updated, setUpdated] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false)
   
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
              <Grid padded centered>
                  <h2>{food.name} </h2>
              </Grid>
            </Segment>
            <Segment inverted class="capitalize-me">
                <Grid centered stretched>
                    <Grid.Row padded>
                        <Segment fluid>
                            <Grid centered>
                                <Grid.Row>
                                    <h3>Ingredients: </h3>
                                    <h3>
                                      {food.ingredients}
                                    </h3>
                                </Grid.Row>
                                <Grid.Row>
                                  <h3>
                                    Contains Tree Nuts: {
                                    food.con_tree_nut === true ?
                                    <div>
                                      <Segment color="red" inverted>
                                        <Icon name='warning'/>True<Icon name='warning'/>
                                      </Segment>
                                    </div> 
                                    : 
                                    <div><Icon name='window close outline'/>False<Icon name='window close outline'/></div> 
                                    }
                                  </h3>
                                </Grid.Row>
                                <Grid.Row>
                                  <h3>
                                    Contains Peanuts: {
                                    food.con_peanut === true ?
                                    <div>
                                      <Segment color="red" inverted>
                                        <Icon name='warning'/>True<Icon name='warning'/>
                                      </Segment>
                                    </div>  
                                    : 
                                    <div><Icon name='window close outline'/>False<Icon name='window close outline'/></div> 
                                    }
                                  </h3>
                                </Grid.Row>
                                <Grid.Row>
                                  <h3>
                                    Contains Shellfish: {
                                    food.con_shellfish === true ?
                                    <div>
                                      <Segment color="red" inverted>
                                        <Icon name='warning'/>True<Icon name='warning'/>
                                      </Segment>
                                    </div> 
                                    : 
                                    <div><Icon name='window close outline'/>False<Icon name='window close outline'/></div> 
                                    }
                                  </h3>
                                </Grid.Row>
                                <Grid.Row>
                                  <h3>
                                    Contains Soy: {
                                    food.con_soy === true ?
                                    <div>
                                      <Segment color="red" inverted>
                                        <Icon name='warning'/>True<Icon name='warning'/>
                                      </Segment>
                                    </div> 
                                    : 
                                    <div><Icon name='window close outline'/>False<Icon name='window close outline'/></div> 
                                    }
                                  </h3>
                                </Grid.Row> 
                                <Grid.Row>
                                  <h3>
                                    Contains Fish: {
                                    food.con_fish === true ?
                                    <div>
                                      <Segment color="red" inverted>
                                        <Icon name='warning'/>True<Icon name='warning'/>
                                      </Segment>
                                    </div> 
                                    : 
                                    <div><Icon name='window close outline'/>False<Icon name='window close outline'/></div> 
                                    }
                                  </h3>
                                </Grid.Row>
                                <Grid.Row>
                                  <h3>
                                    Contains Wheat: {
                                    food.con_wheat === true ?
                                    <div>
                                      <Segment color="red" inverted>
                                        <Icon name='warning'/>True<Icon name='warning'/>
                                      </Segment>
                                    </div>  
                                    : 
                                    <div><Icon name='window close outline'/>False<Icon name='window close outline'/></div> 
                                    }
                                  </h3>
                                </Grid.Row>    
                                <Grid.Row>
                                  <h3>
                                    Contains Egg: {
                                    food.con_egg === true ?
                                    <div>
                                      <Segment color="red" inverted>
                                        <Icon name='warning'/>True<Icon name='warning'/>
                                      </Segment>
                                    </div>  
                                    : 
                                    <div><Icon name='window close outline'/>False<Icon name='window close outline'/></div> 
                                    }
                                  </h3>
                                </Grid.Row>
                                <Grid.Row>
                                  <h3>
                                    Contains Gluten: {
                                    food.con_gluten === true ?
                                    <div>
                                      <Segment color="red" inverted>
                                        <Icon name='warning'/>True<Icon name='warning'/>
                                      </Segment>
                                    </div>  
                                    : 
                                    <div><Icon name='window close outline'/>False<Icon name='window close outline'/></div> 
                                    }
                                  </h3>
                                </Grid.Row>
                                <Grid.Row>
                                  <h3>
                                    Contains Gluten: {
                                    food.con_gluten === true ?
                                    <div>
                                      <Segment color="red" inverted>
                                        <Icon name='warning'/>True<Icon name='warning'/>
                                      </Segment>
                                    </div> 
                                    : 
                                    <div><Icon name='window close outline'/>False<Icon name='window close outline'/></div> 
                                    }
                                  </h3>
                                </Grid.Row>
                                <Grid.Row>
                                  <h3>
                                    Contains Sesame: {
                                    food.con_sesame === true ?
                                    <div>
                                      <Segment color="red" inverted>
                                        <Icon name='warning'/>True<Icon name='warning'/>
                                      </Segment>
                                    </div> 
                                    : 
                                    <div><Icon name='window close outline'/>False<Icon name='window close outline'/></div> 
                                    }
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
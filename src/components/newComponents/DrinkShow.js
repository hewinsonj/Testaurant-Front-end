import React, { useEffect, useState } from "react"
import { Label, Icon, Item, Button, Segment, Grid, Comment, Form, Modal, Progress, Divider } from 'semantic-ui-react'
import { useNavigate, useParams} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getDrink, updateDrink, deleteDrink } from '../../api/drink'
import LoadingScreen from "../shared/LoadingPage"
import DrinkUpdateModal from "./DrinkUpdateModal"
import FoodUpdateModal from "./FoodUpdateModal"



const DrinkShow = ({ user, msgAlert, drink}) => {
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

  
    

    const handleDeleteDrink = () => {
      deleteDrink(user, drink.id)
      .then(() => {
          setDeleted(true)
          msgAlert({
              heading: 'Success',
              message: 'Deleting a Drink',
              variant: 'success'
          })
      })
      .then(() => {
        navigate(`/menu-nav`)
      })
      .catch((error) => {
          msgAlert({
              heading: 'Failure',
              message: 'Deleting a Drink Failure' + error,
              variant: 'danger'
          })
      })
  }



// if (deleted) navigate('/activities')
// const allActivitiesJSX = allActivities.map(activity => {

  if (!drink) {
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
        trigger={<Button floated="right">Show Drink Item</Button>}
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
              <h2>{drink.name} </h2>
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
                                  {drink.ingredients}
                                </h3>
                            </Grid.Column>
                            <Grid.Column>
                                <h3>Garnishes: </h3>
                                <h3>
                                  {drink.garnishes}
                                </h3>
                            </Grid.Column>
                            <Grid.Column>
                                <h3>Prep Instuctions: </h3>
                                <h3>
                                  {drink.prep_instructs}
                                </h3>
                            </Grid.Column>
                            <Grid.Column>
                                <h3>Glassware: </h3>
                                <h3>
                                  {drink.glassware}
                                </h3>
                            </Grid.Column>
                            <Grid.Column>
                              <h3>con_tree_nut: {`${drink.con_tree_nut}`}</h3>
                            </Grid.Column>
                            <Grid.Column>
                              <h3>con_peanut: {`${drink.con_peanut}`}</h3>
                            </Grid.Column>
                            <Grid.Column>
                              <h3>con_shellfish: {`${drink.con_shellfish}`}</h3>
                            </Grid.Column> 
                            <Grid.Column>
                              <h3>con_soy: {`${drink.con_soy}`}</h3>
                            </Grid.Column>
                            <Grid.Column>
                              <h3>con_fish: {`${drink.con_fish}`}</h3>
                            </Grid.Column>    
                            <Grid.Column>
                              <h3>con_wheat: {`${drink.con_wheat}`}</h3>
                            </Grid.Column>
                            <Grid.Column>
                                <h3>con_egg: {`${drink.con_egg}`}</h3>
                            </Grid.Column>
                            <Grid.Column>
                                 <h3>con_gluten: {`${drink.con_gluten}`}</h3>
                            </Grid.Column>
                            <Grid.Column>
                                <h3>con_sesame: {`${drink.con_sesame}`}</h3>
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
                <Button color='black' onClick={handleDeleteDrink}>
                    Delete Item
                </Button>
                <DrinkUpdateModal drink={drink} user={user} msgAlert={msgAlert}/>
            </Modal.Actions>
        </Modal>
    </>
  )
}


export default DrinkShow
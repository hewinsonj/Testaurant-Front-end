import React, { useEffect, useState } from "react";
import { Icon, Item, Button, Grid, Comment, Form, Modal, Search, Header, Segment, Card, Container} from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getAllFoods, deleteFood } from '../../api/food'
import AddFoodModal from "./AddFoodModal"
import FoodSegment from "./FoodSegment"
import LoadingScreen from "../shared/LoadingPage";
// import { act } from "react-dom/test-utils";
// import SearchBar from "../SearchBar/Search";




const FoodIndexPage = ({ user, msgAlert, setNewFood }) => {
    //set state for all public activities, filtered activities based on search
    const [allActivities, setAllActivities] = useState([])
    const [filterActivities, setFilterActivities] = useState([])
    const [searchText, setSearchText] = useState([])


    const [allFoods, setAllFoods] = useState(null)

    useEffect(() => {
        
        getAllFoods(user)
            .then(res => {
                setAllFoods(res.data.foods)
            })
            .catch(error => {
                msgAlert({
                    'heading': 'Error',
                    'message': 'Could not get foods',
                    'variant': 'danger'
                })
            })
    },[])

return (
    <>
        <div >
            <Container>
		    <Segment 
                raised
                inverted  
                verticalAlign='middle' 
                fluid
            >
                <Grid centered textAlign='center' fluid>
                    <Grid.Row>
                    <Segment raised verticalAlign='middle' textAlign='center'>
                        <Grid.Row>
                        <AddFoodModal user={user} msgAlert={msgAlert} 
                        // setNewFood={setNewFood}
                        />
                        </Grid.Row>
                        <Grid.Row centered textAlign='center' verticalAlign='middle'>
                            <h1 >All Foods</h1>
                        </Grid.Row>
                        <Grid.Row>
                        <div className='scrolling-group'>
                        {allFoods ? 
                            allFoods.slice(0).reverse().map((food) => (
                                <FoodSegment key={food.id} food={food} user={user} msgAlert={msgAlert}/>
                            ))
                            :
                            <LoadingScreen />
                        }
                        </div>
                        </Grid.Row>
                    </Segment>
                    </Grid.Row>
                </Grid>
		    </Segment>
            </Container>
        </div>
    </>
)


}

export default FoodIndexPage
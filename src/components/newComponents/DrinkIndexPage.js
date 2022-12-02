import React, { useEffect, useState } from "react";
import { Icon, Item, Button, Grid, Comment, Form, Modal, Search, Header, Segment, Card, Container} from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getAllDrinks, deleteDrink } from '../../api/drink'
import AddDrinkModal from "./AddDrinkModal"
import DrinkSegment from "./DrinkSegment"
import LoadingScreen from "../shared/LoadingPage";
// import { act } from "react-dom/test-utils";
// import SearchBar from "../SearchBar/Search";




const DrinkIndexPage = ({ user, msgAlert, setNewDrink }) => {
    //set state for all public activities, filtered activities based on search
    const [allActivities, setAllActivities] = useState([])
    const [filterActivities, setFilterActivities] = useState([])
    const [searchText, setSearchText] = useState([])


    const [allDrinks, setAllDrinks] = useState(null)

    useEffect(() => {
        
        getAllDrinks(user)
            .then(res => {
                setAllDrinks(res.data.drinks)
            })
            .catch(error => {
                msgAlert({
                    'heading': 'Error',
                    'message': 'Could not get drinks',
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
                        <AddDrinkModal user={user} msgAlert={msgAlert} 
                        // setNewFood={setNewFood}
                        />
                        </Grid.Row>
                        <Grid.Row centered textAlign='center' verticalAlign='middle'>
                            <h1 >All Drinks</h1>
                        </Grid.Row>
                        <div className='scrolling-group'>
                        {allDrinks ? 
                            allDrinks.slice(0).reverse().map((drink) => (
                                <DrinkSegment key={drink.id} drink={drink} user={user} msgAlert={msgAlert}/>
                            ))
                            :
                            <LoadingScreen />
                        }
                        </div>
                    </Segment>
                    </Grid.Row>
                </Grid>
		    </Segment>
            </Container>
        </div>
    </>
)


}

export default DrinkIndexPage
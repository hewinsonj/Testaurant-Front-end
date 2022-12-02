import React, { useEffect, useState } from "react";
import { Grid,  Segment, Container} from 'semantic-ui-react'

import { getAllDrinks } from '../../api/drink'
import AddDrinkModal from "./AddDrinkModal"
import DrinkSegment from "./DrinkSegment"
import LoadingScreen from "../shared/LoadingPage";

const DrinkIndexPage = ({ user, msgAlert }) => {

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
                                    <AddDrinkModal user={user} msgAlert={msgAlert} />
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
import React from 'react'
import {  Segment, Grid } from 'semantic-ui-react'
import DrinkShow from './DrinkShow'

const DrinkSegment = ({ drink, msgAlert, user}) => {
    return (
         <Segment id='actListItems' textAlign='center'>
            <Grid centered verticalAlign='middle' textAlign='center'>
                <Grid.Row>
                    <h2>{drink.name}</h2>
                </Grid.Row>
                <Grid.Row>
                    <DrinkShow  drink={drink} user={user} msgAlert={msgAlert}/>
                </Grid.Row>
            </Grid>
        </Segment>
    )
}

export default DrinkSegment
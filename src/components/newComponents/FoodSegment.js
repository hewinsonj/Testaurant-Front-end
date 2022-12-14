import React, { useState, useEffect } from 'react'
import {  Link } from 'react-router-dom'
import {  Segment, Grid, Image, Progress, Container, Form, Checkbox, Button } from 'semantic-ui-react'
import FoodShow from './FoodShow'


const FoodSegment = ({ food, msgAlert, user}) => {
    return (
         <Segment id='actListItems' textAlign='center'>
                    <Grid centered verticalAlign='middle' textAlign='center'>
                        <Grid.Row>
                        <h2>{food.name}</h2>
                        </Grid.Row>
                        <Grid.Row>
                            <FoodShow  food={food} user={user} msgAlert={msgAlert}/>
                        </Grid.Row>
                    </Grid>
        </Segment>
    )
}

export default FoodSegment
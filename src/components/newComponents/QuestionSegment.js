import React, { useState, useEffect } from 'react'
import {  Link } from 'react-router-dom'
import {  Segment, Grid, Image, Progress, Container } from 'semantic-ui-react'


const QuestionSegment = ({ question, msgAlert, user}) => {

    return (
        <Segment id='actListItems'>
            <Container fluid>
            <Grid centered textAlign='center' verticalAlign='middle'>
                    <h2>created by: {question.owner}</h2>
                    <h2>question: {question.question_str}</h2>
            </Grid>
            </Container>
        </Segment>
    )
}

export default QuestionSegment
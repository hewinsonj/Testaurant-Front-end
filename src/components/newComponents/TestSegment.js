import React, { useState, useEffect } from 'react'
import {  Link } from 'react-router-dom'
import {  Segment, Grid, Image, Progress, Container, Form, Checkbox } from 'semantic-ui-react'
import TestShow from './TestShow'
import TestTake from './TestTake'

const TestSegment = ({ test, msgAlert, user}) => {

    return (
         <Segment id='actListItems' textAlign='center'>
                    <Grid centered verticalAlign='middle' textAlign='center'>
                        <Grid.Row>
                        <h2>Test name: {test.name}</h2>
                        <h2>Created: {test.created_at}</h2>
                        </Grid.Row>
                        <Grid.Row>
                        <TestShow  test={test} user={user} msgAlert={msgAlert}/>
                        <TestTake  test={test} user={user} msgAlert={msgAlert}/>
                        </Grid.Row>

                    {/* <div id="hiddingQuestionButtons"> */}
                    {/* <Form.Checkbox  
                        name='question.id'
                        // id='question.id'
                        label={question.question_str}
                        placeholder='Question Id'
                        // defaultValue= { question.id }
                        value= { question.id }
                        // onChange= { handleChange }
                    /> */}
                {/* </div> */}
                    </Grid>
        </Segment>
    )
}

export default TestSegment
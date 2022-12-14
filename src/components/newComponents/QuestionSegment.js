import React, { useState, useEffect } from 'react'
import {  Link } from 'react-router-dom'
import {  Segment, Grid, Image, Progress, Container, Form, Checkbox } from 'semantic-ui-react'
import  QuestionShow from './QuestionShow'


const QuestionSegment = ({ question, msgAlert, user}) => {

    return (
         <Segment id='actListItems' textAlign='center'>
                    <Grid >
                        <Grid.Row>
        
                            <h2>{question.question_str}</h2>
                     
                        <QuestionShow question={question} user={user} msgAlert={msgAlert}/>
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
                </Grid.Row>
                    </Grid>
        </Segment>
    )
}

export default QuestionSegment
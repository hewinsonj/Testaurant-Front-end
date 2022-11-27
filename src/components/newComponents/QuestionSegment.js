import React, { useState, useEffect } from 'react'
import {  Link } from 'react-router-dom'
import {  Segment, Grid, Image, Progress, Container, Form, Checkbox } from 'semantic-ui-react'


const QuestionSegment = ({ question, msgAlert, user}) => {

    return (
         <Segment id='actListItems' textAlign='center'>
                    <Grid centered verticalAlign='middle' textAlign='center'>
                        {/* <h2>"{question.question_str}"</h2>
                        <h2>id: {question.id}</h2>
                        <h2>Option 1: {question.option1}</h2>
                        <h2>Option 2: {question.option2}</h2>
                        <h2>Option 3: {question.option3}</h2>
                        <h2>Option 4: {question.option4}</h2>
                        <h2>Answer: {question.answer}</h2> */}

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

export default QuestionSegment
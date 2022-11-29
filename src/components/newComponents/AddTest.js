import React, { useState, useEffect } from 'react'
import {Button, Checkbox, Form, Container, Icon, Segment, Grid} from 'semantic-ui-react'
import { createTest } from '../../api/test'
import { getAllQuestions } from '../../api/question'
import LoadingScreen from '../shared/LoadingPage'
import QuestionSegment from './QuestionSegment'

const AddTest = (props) => {

    const { heading, user, msgAlert, setNewTest, activeItem, question, setOpen, test, allQuestions, handleSubmit, handleChange, handleChangeOther, handleChecked} = props


    

    return (
        <Container className="justify-content-center" >
            
            {/* <h3>
            {allQuestions ? 
                allQuestions.slice(0).map((question) => (
                    findQuestionObject( question, idStorage)
                    
                ))
                :
                <LoadingScreen />
            }</h3> */}
            <h3>{ heading }</h3>
            <Form onSubmit={ handleSubmit }>
            <Grid centered columns={1}>
                {/* <Form.Group widths='equal'> */}
                    <Grid.Row>
                    <Segment>
                    <Form.Input 
                        required 
                        name='name'
                        id='name'
                        label='Test Name' 
                        placeholder='Test Name'
                        defaultValue= { test.name }
                        value= { test.name }
                        onChange= { handleChangeOther }
                    />
                    
                
                    </Segment>
                    </Grid.Row>
                    

                <Form.Group inline>
                
                    
                </Form.Group>


                    <Grid.Column>
                    <Segment raised textAlign='middle' >
                        <h1 id='commFeed'>All Questions</h1>
                         <div className='scrolling-group'>
                        {allQuestions ? 
                            allQuestions.slice(0).reverse().map((question) => (
                                <Form.Checkbox 
                                    // required 
                                    name='question_ids' 
                                    id={question.id}
                                    label={question.question_str}
                                    // defaultChecked= { handleChecked(test, question) }
                                    value= {question.id}
                                    onChange= { handleChange }
                                />
                            ))
                            :
                            <LoadingScreen />
                        }
                        </div> 
                    </Segment>
                    </Grid.Column>
                </Grid>
                <Button type='submit' color='green'>Submit</Button>
                
            </Form>
        </Container>
    )
}

export default AddTest
import React, { useState, useEffect } from 'react'
import {Button, Checkbox, Form, Container, Icon, Segment, Grid} from 'semantic-ui-react'
import { createTest } from '../../api/test'
import { getAllQuestions } from '../../api/question'
import LoadingScreen from '../shared/LoadingPage'
import QuestionSegment from './QuestionSegment'

const AddTest = (props) => {

    const { heading, user, msgAlert, setNewTest, activeItem, question  } = props

    
    const defaultTest = {
        name: '',
        question_news_id: '',
    }

    const options = [

        { key: 'm', text: 'Male', value: 'male' },
        { key: 'f', text: 'Female', value: 'female' },
        { key: 'o', text: 'Other', value: 'other' },
      ]
    const [test, setTest] = useState(defaultTest)
      

    const [allQuestions, setAllQuestions] = useState(null)

    useEffect(() => {
        
        getAllQuestions(user)
            .then(res => {
                setAllQuestions(res.data.question_news)
            })
            .catch(error => {
                msgAlert({
                    'heading': 'Error',
                    'message': 'Could not get questions',
                    'variant': 'danger'
                })
            })
    },[])

    const handleChange = (e , target) => {
        setTest(prevTest => {
            const { name, value } = target
            const updatedName = name
            let updatedValue = value
            // handle number type
            if(target.type === 'number') {
                // change from string to actual number
                updatedValue = parseInt(e.target.value)
            }

            //handle the checkbox
            if (updatedName === 'private' && target.checked) {
                updatedValue = true
            } else if (updatedName === 'private' && !target.checked) {
                updatedValue = false
            }

            const updatedTest = { [updatedName]: updatedValue }

            return { ...prevTest, ...updatedTest}
        })
    }
    const handleCreateTest = (e) => {
        e.preventDefault()

        createTest(user, test)
            // .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Created Test',
                    variant: 'success'
                })
            })
            // .then(() => {
            //     console.log("this is the test", test)
            // })
            .then(() => setNewTest(prev => !prev))
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Create Test Failure' + error,
                    variant: 'danger'
                })
            })
    }
    console.log("this is the test", test)
    
    return (
        <Container className="justify-content-center" >
            <h3>{ heading }</h3>
            <Form onSubmit={ handleCreateTest }>
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
                        onChange= { handleChange }
                    />
                     <Form.Input 
                        required 
                        name='created_at'
                        id='created_at'
                        label='created_at' 
                        placeholder='created_at'
                        defaultValue= { test.created_at }
                        value= { test.created_at }
                        onChange= { handleChange }
                    />
                     <Form.Input 
                        required 
                        name='updated_at'
                        id='updated_at'
                        label='updated_at' 
                        placeholder='updated_at'
                        defaultValue= { test.updated_at }
                        value= { test.updated_at }
                        onChange= { handleChange }
                    />
                    <Form.Input 
                        required 
                        name='question_news'
                        id='question_news_id'
                        label='question_news_id' 
                        placeholder='question_news_id'
                        defaultValue= { test.question_news_id }
                        value= { test.question_news_id }
                        onChange= { handleChange }
                    />
                
                    </Segment>
                    </Grid.Row>
                    {/* <Form.Select
                        fluid
                        label='Questions'
                        options={options}
                        placeholder='Select Questions'
                    /> */}
                    {/* </Form.Group> */}
                
                <Form.Group inline>
                
                    
                </Form.Group>


                    <Grid.Column>
                    <Segment raised textAlign='middle' >
                        <h1 id='commFeed'>All Questions</h1>
                        <div className='scrolling-group'>
                        {allQuestions ? 
                            allQuestions.slice(0).reverse().map((question) => (

                                
                                
                                <QuestionSegment key={question.id} question={question} user={user} msgAlert={msgAlert}/>
                            ))
                            :
                            <LoadingScreen />
                        }
                        </div>
                    </Segment>
                    </Grid.Column>
                </Grid>
                <Button type='submit' color='yellow'>Submit</Button>
                
            </Form>
        </Container>
    )
}

export default AddTest
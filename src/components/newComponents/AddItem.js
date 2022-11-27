import React, { useState } from 'react'
import {Button, Checkbox, Form, Container, Icon} from 'semantic-ui-react'
import { createQuestion } from '../../api/question'


const AddItem = (props) => {

    const { heading, user, msgAlert, activeItem, setOpen, triggerRefresh, setNewQuestion} = props
    

    const defaultQuestion = {
        question_str: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: ''
    }
    const [question, setQuestion] = useState(defaultQuestion)

    const handleChange = (e , target) => {
        setQuestion(prevQuestion => {
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

            const updatedQuestion = { [updatedName]: updatedValue }

            return { ...prevQuestion, ...updatedQuestion}
        })
    }
    const handleCreateQuestion = (e) => {
        e.preventDefault()

        createQuestion(user, question)
            // .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Created Question',
                    variant: 'success'
                })
            })
            .then(() => {
                setOpen(false)
            })
            .then(() => setNewQuestion(prev => !prev))
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Create Question Failure' + error,
                    variant: 'danger'
                })
            })
    }

    console.log(user, 'this be the user')
    return (
        <Container className="justify-content-center">
            <h3>{ heading }</h3>
            <Form onSubmit={ handleCreateQuestion }>
                <Form.Group widths='equal'>
                    <Form.Input 
                        required 
                        name='question_str'
                        id='question_str'
                        label='Question String' 
                        placeholder='Question String'
                        defaultValue= { question.question_str }
                        value= { question.question_str }
                        onChange= { handleChange }
                    />
                </Form.Group>
                <Form.Input 
                        required 
                        name='option1'
                        id='option1'
                        label='Option 1' 
                        placeholder='Option 1'
                        defaultValue= { question.option1}
                        value= { question.option1}
                        onChange= { handleChange }
                    />
                <Form.Input 
                        required 
                        name='option2'
                        id='option2'
                        label='Option 2' 
                        placeholder='Option 2'
                        defaultValue= { question.option2}
                        value= { question.option2}
                        onChange= { handleChange }
                    />
                <Form.Input 
                        required 
                        name='option3'
                        id='option3'
                        label='Option 3' 
                        placeholder='Option 3'
                        defaultValue= { question.option3}
                        value= { question.option3}
                        onChange= { handleChange }
                    />
                <Form.Input 
                        required 
                        name='option4'
                        id='option4'
                        label='Option 4' 
                        placeholder='Option 4'
                        defaultValue= { question.option4}
                        value= { question.option4}
                        onChange= { handleChange }
                    />
                <Form.Input 
                        required 
                        name='answer'
                        id='answer'
                        label='answer' 
                        placeholder='answer'
                        defaultValue= { question.answer}
                        value= { question.answer}
                        onChange= { handleChange }
                    />
                <Form.Group inline>
                
                    
                </Form.Group>
                {/* <Form.Field>
                    <Checkbox 
                        label='Mark Activity as Private'
                        name='private'
                        defaultChecked= { activity.private }
                        onChange={ handleChange }
                    />
                </Form.Field> */}
                {/* <Button icon
                        type='button'
                        color='yellow'
                        label='Generate Random Activity'
                        onClick= { handleActivity }> 
                <Icon name='random' /></Button> */}
                <Button type='submit' color='green'>Submit</Button>
            </Form>
        </Container>
    )
}

export default AddItem
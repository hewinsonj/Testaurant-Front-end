import React from 'react'
import {Button, Form, Container } from 'semantic-ui-react'


const AddItem = (props) => {

    const { question, handleChange, handleSubmit, heading} = props
    
    return (
        <Container className="justify-content-center">
            <h3>{ heading }</h3>
            <Form onSubmit={ handleSubmit }>
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
                <Button type='submit' color='orange'>Submit</Button>
            </Form>
        </Container>
    )
}

export default AddItem
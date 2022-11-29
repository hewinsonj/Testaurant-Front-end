import React, { useState } from 'react'
import {Button, Checkbox, Form, Container, Icon} from 'semantic-ui-react'
import { createQuestion } from '../../api/question'
import AddItem from './AddItem'


const CreateQuestion = (props) => {

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
        <AddItem
            // show={activityModalShow}
            question={ question }
            handleChange={ handleChange }
            heading="Create a new Question!"
            handleSubmit={ handleCreateQuestion }
            // handleClose={() => setActivityModalShow(false)}
        />
    )
}

export default CreateQuestion
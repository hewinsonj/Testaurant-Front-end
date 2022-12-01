import React, { useState, useEffect } from 'react'
import {Button, Checkbox, Form, Container, Icon, Segment, Grid} from 'semantic-ui-react'
import { createTest } from '../../api/test'
import { getAllQuestions } from '../../api/question'
import LoadingScreen from '../shared/LoadingPage'
import QuestionSegment from './QuestionSegment'
import AddTest from './AddTest'

const CreateTest = (props) => {

    const { heading, user, msgAlert, setNewTest, activeItem, question, setOpen  } = props

    
    const defaultTest = {
        name: '',
        question_new: [],
        // created_at: '',
        // updated_at: '',
    }

    const tempQuestion = {
        question_ids: [],
    }

    const [test, setTest] = useState(defaultTest)
    const [idStorage, setIdStorage] = useState(tempQuestion)

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
        
        setIdStorage(prevTest => {
            const { name, value } = target
            const updatedName = name
            let updatedValue = value
            // handle number type
            if(target.type === 'number') {
                // change from string to actual number
                updatedValue = parseInt(e.target.value)
            }

            //handle the checkbox
            if (updatedName === 'question_ids' && target.checked) {
                
                updatedValue = (prevTest.question_ids).push(parseInt(target.id))
            } else if (updatedName === 'question_ids' && !target.checked) {
                for (let i = 0; i < prevTest.question_ids.length; i++) {
                    if(prevTest.question_ids[i] === parseInt(target.id)){
                        prevTest.question_ids.splice(i, 1)
                    }
                }

                updatedValue = false
            }

            const updatedTest = { [updatedName]: updatedValue }
            return { ...prevTest}
        })
    }
    console.log("this is the test from testAdd", test)


    const handleChangeOther = (e , target) => {
        setTest(prevTest => {
            const { name, value } = target
            const updatedName = name
            let updatedValue = value
            // handle number type
            if(target.type === 'number') {
                // change from string to actual number
                updatedValue = parseInt(e.target.value)
            }
            const updatedTest = { [updatedName]: updatedValue }

            return { ...prevTest, ...updatedTest}
        })
    }

    const handleCreateTest = (e) => {
        e.preventDefault()
        allQuestions.slice(0).map((question) => (
            findQuestionObject( question, idStorage)
        ))

        createTest(user, test)
            // .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Created Test',
                    variant: 'success'
                })
            })
            .then(() => {
                console.log("this is the test", test)
            })
            .then(() => {
                setOpen(false)
            })
            .then(() => setNewTest(prev => !prev))
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Create Test Failure' + error,
                    variant: 'danger'
                })
            })
    }
    
    
    const findQuestionObject = (question, idStorage) => {
        for (let i = 0; i < idStorage.question_ids.length; i++) {
          if(idStorage.question_ids[i] == question.id){
            test.question_new.push(question.id)
           console.log('this function works')
          }
        } return 
        
      }
    
      
    console.log('these are the question objects', test.question_new)
    console.log('this is the tempQuestion', idStorage.question_ids)

    return (
        <AddTest
            test={ test }
            handleChange={ handleChange }
            handleChangeOther={handleChangeOther}
            heading="Create a new Test!"
            handleSubmit={ handleCreateTest }
            allQuestions={allQuestions}
            user={user}
        />
    )
}

export default CreateTest
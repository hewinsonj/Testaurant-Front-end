import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {  Button, Divider, Segment, Grid, Feed, Icon, Image, Progress, Modal, Container } from 'semantic-ui-react'
import LoadingScreen from '../shared/LoadingPage'
import { getAllQuestions } from '../../api/question'
import QuestionSegment from './QuestionSegment'
import AddQuestionModal from './AddQuestionModal'


const QuestionIndex = ({ user, msgAlert, newQuestion, setNewQuestion }) => {

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
   
	return (
		<>
        <div >
		    <Segment 
                raised
                inverted  
                verticalAlign='middle' 
                fluid
            >
                <Grid centered textAlign='center'>
                    <Segment raised verticalAlign='middle' textAlign='center'>
                        <Grid.Row>
                        <AddQuestionModal user={user} msgAlert={msgAlert} setNewQuestion={setNewQuestion}/>
                        </Grid.Row>
                        <Grid.Row centered textAlign='center' verticalAlign='middle'>
                            <h1 >All Questions</h1>
                        </Grid.Row>
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
                </Grid>
		    </Segment>
        </div>
		</>
	)
}

export default QuestionIndex
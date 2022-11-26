import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {  Button, Divider, Segment, Grid, Feed, Icon, Image, Progress, Modal, Container } from 'semantic-ui-react'
import { signOut } from '../../api/auth'
import LoadingScreen from '../shared/LoadingPage'
import { getAllQuestions } from '../../api/question'
import QuestionSegment from './QuestionSegment'


const QuestionIndex = ({ user, msgAlert, newQuestion }) => {

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
                color='yellow' 
                // verticalAlign='middle' 
                fluid
                
            >
                <Grid >
                    <Segment raised textAlign='middle'>
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
                </Grid>
		    </Segment>
        </div>
		</>
	)
}

export default QuestionIndex
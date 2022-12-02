import React, { useState, useEffect } from 'react'
import {   Segment, Grid } from 'semantic-ui-react'
import LoadingScreen from '../shared/LoadingPage'
import { getAllTests } from '../../api/test'
import { getAllQuestions } from '../../api/question'
import TestSegment from './TestSegment'
import AddTestModal from './AddTestModal'

const TestIndex = ({ user, msgAlert, newTest, setNewTest}) => {

    const [allTests, setAllTests] = useState(null)

    const [allQuestions, setAllQuestions] = useState(null)

    useEffect(() => {
        
        getAllTests(user)
            .then(res => {
                setAllTests(res.data.test_thiss)
            })
            .catch(error => {
                msgAlert({
                    'heading': 'Error',
                    'message': 'Could not get tests',
                    'variant': 'danger'
                })
            })
    },[])

    useEffect(() => {
        
        getAllQuestions(user)
            .then(res => {
                setAllQuestions(res.data.question_news)
            })
            .catch(error => {
                msgAlert({
                    'heading': 'Error',
                    'message': 'Could not get tests',
                    'variant': 'danger'
                })
            })
    },[])
   console.log(allTests, 'All the damn tests')
	return (
		<>
            <div >
                <Segment 
                    raised
                    inverted 
                    fluid
                >
                    <Grid centered>

<<<<<<< HEAD
                    <Segment raised >
                        <Grid.Row>
                        <AddTestModal user={user} msgAlert={msgAlert} 
                        // setNewTest={setNewTest}
                        /></Grid.Row>
                        <h1 id='commFeed'>All Tests</h1>
                        <div className='scrolling-group'>
                        {allTests ? 
                            allTests.slice(0).map((test) => (
                                <TestSegment key={test.id} test={test} user={user} msgAlert={msgAlert} setNewTest={setNewTest} allQuestions={allQuestions}/>
                            ))
                            :
                            <LoadingScreen />
                        }
                        </div>
                    </Segment>
                </Grid>
		    </Segment>
        </div>
=======
                        <Segment raised >
                            <Grid.Row>
                                <AddTestModal user={user} msgAlert={msgAlert} />
                            </Grid.Row>
                            <h1 id='commFeed'>All Tests</h1>
                            <div className='scrolling-group'>
                                {allTests ? 
                                    allTests.slice(0).reverse().map((test) => (
                                        <TestSegment key={test.id} test={test} user={user} msgAlert={msgAlert} setNewTest={setNewTest}/>
                                    ))
                                :
                                    <LoadingScreen />
                                }
                            </div>
                        </Segment>
                    </Grid>
                </Segment>
            </div>
>>>>>>> 27bdab7 (cleaned up)
		</>
	)
}

export default TestIndex
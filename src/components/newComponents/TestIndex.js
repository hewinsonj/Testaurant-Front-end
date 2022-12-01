import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {  Button, Divider, Segment, Grid, Feed, Icon, Image, Progress, Modal, Container } from 'semantic-ui-react'
import LoadingScreen from '../shared/LoadingPage'
import { getAllTests } from '../../api/test'
import TestSegment from './TestSegment'
import AddTestModal from './AddTestModal'


const TestIndex = ({ user, msgAlert, newTest, setNewTest}) => {

    const [allTests, setAllTests] = useState(null)

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

                    <Segment raised >
                        <Grid.Row>
                        <AddTestModal user={user} msgAlert={msgAlert} 
                        // setNewTest={setNewTest}
                        /></Grid.Row>
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
		</>
	)
}

export default TestIndex
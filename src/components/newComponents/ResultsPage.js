import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {  Button, Divider, Segment, Grid, Feed, Icon, Image, Progress, Modal, Container } from 'semantic-ui-react'
import LoadingScreen from '../shared/LoadingPage'
import { getAllResults } from '../../api/result'
import ResultsSegment from './ResultsSegment'


const ResultsPage = ({ user, msgAlert, newTest, setNewTest}) => {

    const [allResults, setAllResults] = useState([])

    useEffect(() => {
        
        getAllResults(user)
            .then(res => {
                setAllResults(res.data.results)
            })
            .catch(error => {
                msgAlert({
                    'heading': 'Error',
                    'message': 'Could not get Results',
                    'variant': 'danger'
                })
            })
    },[])
    console.log('all the results', allResults)
   
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
                        {/* <AddTestModal user={user} msgAlert={msgAlert} 
                        // setNewTest={setNewTest}
                        /> */}
                        </Grid.Row>
                        <h1 id='commFeed'>All Results</h1>
                        <div className='scrolling-group'>
                        {allResults ? 
                            allResults.slice(0).reverse().map((result) => (
                                <ResultsSegment key={result.id} result={result} user={user} msgAlert={msgAlert} 
                                // setNewResult={setNewResult}
                                />
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

export default ResultsPage
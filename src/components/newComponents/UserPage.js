import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {  Button, Divider, Segment, Grid, Feed, Icon, Image, Progress, Modal, Container } from 'semantic-ui-react'
import { signOut } from '../../api/auth'
import { getAllResults } from '../../api/result'
import LoadingScreen from '../shared/LoadingPage'
import ResultsSegment from './ResultsSegment'

const UserPage = ({ user, msgAlert,}) => {

    
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


	return (
		<>
        <div >
		    <Segment 
                raised
                inverted 
                color='black' 
                // verticalAlign='middle' 
                fluid
                
            >
                <Container fluid>

  
                </Container>
                <Divider />

                <Grid columns={3}>
                    <Grid.Column width={4}>
     
                    </Grid.Column>
                    <Grid.Column width={7}>
                            <Segment>
                                <h2 id='yourActs'>Your Activities dog</h2>
                            </Segment>       
                            <Segment>
                            {allResults ? 
                            allResults.slice(0).reverse().map((result) => (
                                
                                <ResultsSegment key={result.id} result={result} user={user} msgAlert={msgAlert} 
                                // setNewResult={setNewResult}
                                />
                            ))
                            :
                            <LoadingScreen />
                            }
                            
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={5} >
                        <Segment raised textAlign='middle'>
                            <h1 id='commFeed'>Community Tasks</h1>
                           
                        </Segment>
                    </Grid.Column>
                </Grid>
		    </Segment>
         
		
        </div>
		</>
	)
}

export default UserPage
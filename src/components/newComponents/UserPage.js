import React, { useState, useEffect } from 'react'
import { Divider, Segment, Grid, Container } from 'semantic-ui-react'
import { getAllResults } from '../../api/result'
import LoadingScreen from '../shared/LoadingPage'
import ResultsSegment from './ResultsSegment'
import ChangePasswordModal from './ChangePasswordModal'

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
                        <ChangePasswordModal user={user} msgAlert={msgAlert} />
                    </Grid.Column>
                    <Grid.Column width={7}>
                            <Segment>
                                <h2 id='yourActs'>Your results dog</h2>
                            </Segment>       
                            <Segment>
                            {allResults ? 
                            allResults.slice(0).reverse().filter(result => result.owner === user.id).map((result) => (
                                
                                <ResultsSegment key={result.id} result={result} user={user} msgAlert={msgAlert} 
                                // setNewResult={setNewResult}
                                />
                            ))
                            :
                            <LoadingScreen />
                            }
                            
                        </Segment>
                    </Grid.Column>
                </Grid>
		    </Segment>
         
		
        </div>
		</>
	)
}

export default UserPage
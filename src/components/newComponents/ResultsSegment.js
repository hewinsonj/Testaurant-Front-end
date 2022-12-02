import React, { useState, useEffect } from 'react'
import {  Link } from 'react-router-dom'
import {  Segment, Grid, Image, Progress, Container, Form, Checkbox, Button, GridColumn } from 'semantic-ui-react'
import TestShow from './TestShow'
import TestTake from './TestTake'
import { getAllTests } from "../../api/test"
import LoadingScreen from "../shared/LoadingPage"

const ResultsSegment = ({ result, msgAlert, user}) => {

    const [allTests, setAllTests] = useState([])


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

    const findString = (result) => {
        for (let i = 0; i < allTests.length; i++) {
          if(result.the_test == allTests[i].id){
            return (<h1>{allTests[i].name}</h1> )
           
          } 
        }
        
      }
      
    return (
         <Segment id='actListItems' textAlign='center' >
                    <Grid centered  textAlign='center' columns={3}>
                        {result ? 
                            
                                
                                findString(result)
                            
                            :
                            <LoadingScreen />
                            }
                        
                        <Grid.Row centered textAlign='center'>
                            <Grid.Column textAlign='center'>
                        
                        
                        <h2>Correct: {result.correct}</h2>
                            <h2>Wrong: {result.wrong}</h2>
                        </Grid.Column>
                        <Grid.Column textAlign='center'>
                            <h2>{result.score} Correct</h2>
                            <h2>Taken on: {result.created_at}</h2>
                        </Grid.Column>
                            <Grid.Column textAlign='center'>
                                
                            <h2>Percent: {result.percent}</h2>
                            <h2>Total Questions: {result.total}</h2>
                            {/* <h2>Time {result.time}</h2> */}
                            
                        {/* <TestShow  test={test} user={user} msgAlert={msgAlert}/>
                        <TestTake  test={test} user={user} msgAlert={msgAlert}/>
                        <Link to={`/test-take-page/${test.id}`}>
                            <Button>Test Take Page</Button>
                        </Link> */}
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>
        </Segment>
    )
}

export default ResultsSegment
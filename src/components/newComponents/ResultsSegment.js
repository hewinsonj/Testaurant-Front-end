import React, { useState, useEffect } from 'react'
import {  Link } from 'react-router-dom'
import {  Segment, Grid, Image, Progress, Container, Form, Checkbox, Button } from 'semantic-ui-react'
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
      
    console.log(result, 'this is supposed to be the test' )
    return (
         <Segment id='actListItems' textAlign='center'>
                    <Grid centered verticalAlign='middle' textAlign='center'>
                        {result ? 
                            
                                
                                findString(result)
                            
                            :
                            <LoadingScreen />
                            }
                        <Grid.Row>
                        <h2>Result Score: {result.score}</h2>
                        <h2>Percent: {result.percent}</h2>
                        </Grid.Row>
                        <Grid.Row>
                            <h2>Correct {result.correct}</h2>
                            <h2>Wrong {result.wrong}</h2>
                            <h2>Total {result.total}</h2>
                            <h2>Time {result.time}</h2>
                            <h2>Taken on: {result.created_at}</h2>
                        {/* <TestShow  test={test} user={user} msgAlert={msgAlert}/>
                        <TestTake  test={test} user={user} msgAlert={msgAlert}/>
                        <Link to={`/test-take-page/${test.id}`}>
                            <Button>Test Take Page</Button>
                        </Link> */}
                        </Grid.Row>
                    </Grid>
        </Segment>
    )
}

export default ResultsSegment
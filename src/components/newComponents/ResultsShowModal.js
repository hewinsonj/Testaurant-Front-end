import React, { useState, useEffect } from 'react'
import {  Link } from 'react-router-dom'
import {  Segment, Grid, Image, Progress, Container, Form, Checkbox, Button } from 'semantic-ui-react'
import TestShow from './TestShow'
import TestTake from './TestTake'
import { getAllTests } from "../../api/test"
import LoadingScreen from "../shared/LoadingPage"
import {  Button, Divider, Segment, Grid, Feed, Icon, Image, Progress, Modal, Container } from 'semantic-ui-react'
import ResultsSegment from './ResultsSegment'

const ResultsShowModal = ({ result, msgAlert, user}) => {

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
        <Modal
        onClose={() => {
            setOpen(false)
            setResult(props.result)
        }}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
            <Button color='black' onClick={()=>setFood(props.food)}>Show Result for test "{findString(result)}"</Button>
        }
        >
            <Modal.Content>
                <ResultsSegment 
                    user={user} 
                    msgAlert={msgAlert}  
                    result={result}
                    handleChange={handleChange}
                    setOpen={setOpen}
                    heading='Your Results'
                />
            </Modal.Content>
        </Modal>
    )
}

export default ResultsShowModal
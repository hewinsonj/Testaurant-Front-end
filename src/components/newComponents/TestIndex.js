// import React, { useState, useEffect } from 'react'
// import {   Segment, Grid } from 'semantic-ui-react'
// import LoadingScreen from '../shared/LoadingPage'
// import { getAllTests } from '../../api/test'
// import { getAllQuestions } from '../../api/question'
// import TestSegment from './TestSegment'
// import AddTestModal from './AddTestModal'

// const TestIndex = ({ user, msgAlert, newTest, setNewTest}) => {


//     const [allTests, setAllTests] = useState(null)

//     const [allQuestions, setAllQuestions] = useState(null)

//     useEffect(() => {
        
//         getAllTests(user)
//             .then(res => {
//                 setAllTests(res.data.test_thiss)
//             })
//             .catch(error => {
//                 msgAlert({
//                     'heading': 'Error',
//                     'message': 'Could not get tests',
//                     'variant': 'danger'
//                 })
//             })
//     },[])

//     useEffect(() => {
        
//         getAllQuestions(user)
//             .then(res => {
//                 setAllQuestions(res.data.question_news)
//             })
//             .catch(error => {
//                 msgAlert({
//                     'heading': 'Error',
//                     'message': 'Could not get tests',
//                     'variant': 'danger'
//                 })
//             })
//     },[])
//    console.log(allTests, 'All the damn tests')
// 	return (
// 		<>
//             <div >
//                 <Segment 
//                     raised
//                     inverted 
//                     fluid
//                 >
//                     <Grid centered>


//                     <Segment raised >
//                         <Grid.Row>
//                         <AddTestModal user={user} msgAlert={msgAlert} 
//                         // setNewTest={setNewTest}
//                         /></Grid.Row>
//                         <h1 id='commFeed'>All Tests</h1>
//                         <div className='scrolling-group'>
//                         {allTests ? 
//                             allTests.slice(0).map((test) => (
//                                 <TestSegment key={test.id} test={test} user={user} msgAlert={msgAlert} setNewTest={setNewTest} allQuestions={allQuestions}/>
//                             ))
//                             :
//                             <LoadingScreen />
//                         }
//                         </div>
//                     </Segment>
//                 </Grid>
// 		    </Segment>
//         </div>

// 		</>
// 	)
// }

// export default TestIndex;


import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {  Button, Divider, Segment, Grid, Feed, Icon, Image, Progress, Modal, Container } from 'semantic-ui-react'
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
   console.log(allTests, 'All the tests')
	return (
		<>
        <div >
		    {/* <Segment 
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
                            allTests.slice(0).map((test) => (
                                <TestSegment key={test.id} test={test} user={user} msgAlert={msgAlert} setNewTest={setNewTest} allQuestions={allQuestions}/>
                            ))
                            :
                            <LoadingScreen />
                        }
                        </div>
                    </Segment>
                </Grid>
		    </Segment> */}


<Segment raised inverted verticalAlign="middle" fluid>
            <Grid centered textAlign="center" fluid>
              <Grid.Column width={10}>
                <Segment raised verticalAlign="middle" textAlign="center" inverted>
                  <Grid.Row>
                  <AddTestModal user={user} msgAlert={msgAlert} 
                        // setNewTest={setNewTest}
                        />
                  </Grid.Row>
                <h1>All Tests</h1>
                <Grid columns={2}>
                  {/* <div className="scrolling-group"> */}
                    {/* {allDrinks ? (
                      allDrinks
                        .slice(0)
                        .reverse()
                        .map((drink) => (
                          <DrinkSegment
                            key={drink.id}
                            drink={drink}
                            user={user}
                            msgAlert={msgAlert}
                          />
                        ))
                    ) : (
                      <LoadingScreen />
                    )} */}


                        {allTests ? 
                            allTests.slice(0).map((test) => (
                                <TestSegment key={test.id} test={test} user={user} msgAlert={msgAlert} setNewTest={setNewTest} allQuestions={allQuestions}/>
                            ))
                            :
                            <LoadingScreen />
                        }
                  {/* </div> */}
                </Grid>
                </Segment>
              </Grid.Column>
            </Grid>
          </Segment>
        </div>
		</>
	)
}


export default TestIndex;

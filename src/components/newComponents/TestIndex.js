// import React, { useState, useEffect } from 'react'
// import { Grid, Segment } from 'semantic-ui-react'
// import LoadingScreen from '../shared/LoadingPage'
// import { getAllTests } from '../../api/test'
// import { getAllQuestions } from '../../api/question'
// import TestSegment from './TestSegment'
// import AddTestModal from './AddTestModal'

// const TestIndex = ({ user, msgAlert, newTest, setNewTest }) => {
//   const [allTests, setAllTests] = useState(null)
//   const [allQuestions, setAllQuestions] = useState(null)

//   useEffect(() => {
//     getAllTests(user)
//       .then(res => {
//         setAllTests(res.data.test_thiss)
//       })
//       .catch(error => {
//         msgAlert({
//           heading: 'Error',
//           message: 'Could not get tests',
//           variant: 'danger',
//         })
//       })
//   }, [])

//   useEffect(() => {
//     getAllQuestions(user)
//       .then(res => {
//         setAllQuestions(res.data.question_news)
//       })
//       .catch(error => {
//         msgAlert({
//           heading: 'Error',
//           message: 'Could not get questions',
//           variant: 'danger',
//         })
//       })
//   }, [])

//   return (
//     <Segment raised inverted verticalAlign="middle" fluid>
//       <Grid centered textAlign="center" fluid>
//         <Grid.Column width={10}>
//           <Segment raised verticalAlign="middle" textAlign="center" inverted>
//             <Grid.Row>
//               <AddTestModal user={user} msgAlert={msgAlert} />
//             </Grid.Row>
//             <h1>All Tests</h1>
//             <Grid columns={2}>
//               {allTests ? (
//                 allTests
//                   .slice()
//                   .reverse()
//                   .map(test => (
//                     <TestSegment
//                       key={test.id}
//                       test={test}
//                       user={user}
//                       msgAlert={msgAlert}
//                       setNewTest={setNewTest}
//                       allQuestions={allQuestions}
//                     />
//                   ))
//               ) : (
//                 <LoadingScreen />
//               )}
//             </Grid>
//           </Segment>
//         </Grid.Column>
//       </Grid>
//     </Segment>
//   )
// }

// // export default TestIndex

// import React, { useState, useEffect } from 'react'
// import { Grid, Segment, List, Button } from 'semantic-ui-react'
// import LoadingScreen from '../shared/LoadingPage'
// import { getAllTests } from '../../api/test'
// import { getAllQuestions } from '../../api/question'
// import AddTestModal from './AddTestModal'
// import TestUpdateModal from './TestUpdateModal'

// const TestIndex = ({ user, msgAlert, newTest, setNewTest }) => {
//   const [allTests, setAllTests] = useState([])
//   const [allQuestions, setAllQuestions] = useState([])
//   const [selectedTest, setSelectedTest] = useState(null)

//   useEffect(() => {
//     getAllTests(user)
//       .then(res => {
//         setAllTests(res.data.test_thiss)
//       })
//       .catch(error => {
//         msgAlert({
//           heading: 'Error',
//           message: 'Could not get tests',
//           variant: 'danger',
//         })
//       })
//   }, [])

//   useEffect(() => {
//     getAllQuestions(user)
//       .then(res => {
//         setAllQuestions(res.data.question_news)
//       })
//       .catch(error => {
//         msgAlert({
//           heading: 'Error',
//           message: 'Could not get questions',
//           variant: 'danger',
//         })
//       })
//   }, [])

//   const handleDelete = (id) => {
//     // you'll probably call your deleteTest function here
//     console.log('Delete test with id:', id)
//   }

//   return (
//     <Segment raised>          
//     <AddTestModal user={user} msgAlert={msgAlert} setNewTest={setNewTest} />
//       <Grid columns={3} divided padded>
//         {/* Column 1: Test list and create button */}
//         <Grid.Column width={5}>
//           <h3>All Tests</h3>

//           <List divided selection>
//             {allTests
//               .slice()
//               .reverse()
//               .map((test) => (
//                 <List.Item key={test.id} onClick={() => setSelectedTest(test)}>
//                   <List.Content>
//                     <List.Header>{test.name.slice(0, 100)}</List.Header>
//                   </List.Content>
//                 </List.Item>
//               ))}
//           </List>
//         </Grid.Column>

//         {/* Column 2: Selected test details */}
//         <Grid.Column width={7}>
//           {selectedTest ? (
//             <Segment>
//               <h2>{selectedTest.name}</h2>
//               <p><strong>Question Count:</strong> {selectedTest.question_new.length}</p>
//               <p><strong>Questions:</strong></p>
//               <ul>
//                 {selectedTest.question_new.map((q) => {
//                   const fullQuestion = allQuestions?.find((x) => x.id === q)
//                   return (
//                     <li key={q}>
//                       {fullQuestion ? fullQuestion.question : 'Loading...'}
//                     </li>
//                   )
//                 })}
//               </ul>
//             </Segment>
//           ) : (
//             <p>Select a test to view details</p>
//           )}
//         </Grid.Column>

//         {/* Column 3: Update + Delete */}
//         <Grid.Column width={4}>
//           <Segment>
//             {selectedTest && (
//               <>
//                 <TestUpdateModal
//                   user={user}
//                   test={selectedTest}
//                   msgAlert={msgAlert}
//                   allQuestions={allQuestions}
//                 />
//                 <Button
//                   color="red"
//                   fluid
//                   style={{ marginTop: '0.5rem' }}
//                   onClick={() => handleDelete(selectedTest.id)}
//                 >
//                   Delete
//                 </Button>
//               </>
//             )}
//           </Segment>
//         </Grid.Column>
//       </Grid>
//     </Segment>
//   )
// }

// export default TestIndeximport React, { useState, useEffect } from 'react'
import { Grid, Segment, List, Button } from 'semantic-ui-react'
import LoadingScreen from '../shared/LoadingPage'
import { getAllTests } from '../../api/test'
import { getAllQuestions } from '../../api/question'
import AddTestModal from './AddTestModal'
import TestUpdateModal from './TestUpdateModal'
import React, { useState, useEffect } from 'react'
import { deleteTest } from "../../api/test";
import TestTake from "./TestTake";


const TestIndex = ({ user, msgAlert, newTest, setNewTest }) => {
  const [allTests, setAllTests] = useState([])
  const [allQuestions, setAllQuestions] = useState([])
  const [selectedTest, setSelectedTest] = useState(null)

  useEffect(() => {
    getAllTests(user)
      .then(res => {
        console.log("✅ Fetched Tests:", res.data.test_thiss)
        setAllTests(res.data.test_thiss)
      })
      .catch(error => {
        msgAlert({
          heading: 'Error',
          message: 'Could not get tests',
          variant: 'danger',
        })
      })
  }, [])

  useEffect(() => {
    getAllQuestions(user)
      .then(res => {
        console.log("✅ Fetched Questions:", res.data.question_news)
        setAllQuestions(res.data.question_news)
      })
      .catch(error => {
        msgAlert({
          heading: 'Error',
          message: 'Could not get questions',
          variant: 'danger',
        })
      })
  }, [])

  const handleDeleteTest = () => {
    deleteTest(user, selectedTest.id)
      .then(() => {
        msgAlert({
          heading: "Success",
          message: "Test deleted successfully.",
          variant: "success",
        });
      })
      // .then(() => setOpen(false))
      .catch((error) => {
        msgAlert({
          heading: "Failure",
          message: `Failed to delete test: ${error.message}`,
          variant: "danger",
        });
      });
  };


  const findRelevantQuestions = (test, allQuestions) => {
    if (!test || !Array.isArray(test.question_new) || !Array.isArray(allQuestions)) return []

    return allQuestions.filter((question) =>
      test.question_new.some((testQuestion) =>
        typeof testQuestion === 'object'
          ? testQuestion.id === question.id
          : testQuestion === question.id
      )
    )
  }

  // const relevantQuestions =
  //   selectedTest && allQuestions.length
  //     ? findRelevantQuestions(selectedTest, allQuestions)
  //     : []

  const relevantQuestions = (() => {
    if (selectedTest && Array.isArray(allQuestions)) {
      const result = findRelevantQuestions(selectedTest, allQuestions)
      return Array.isArray(result) ? result : []
    }
    return []
  })()

  // console.log("📦 selectedTest:", selectedTest)
  // console.log("📦 relevantQuestions:", relevantQuestions)
  // console.log("📦 allQuestions:", allQuestions)

  return (
    <Segment raised><AddTestModal user={user} msgAlert={msgAlert} setNewTest={setNewTest} />
      <Grid columns={3} divided padded>
        {/* Column 1: Test list and create button */}
        <Grid.Column width={5}>
          <h3>All Tests</h3>
          
          <List divided selection>
            {Array.isArray(allTests) &&
              allTests
                .slice()
                .reverse()
                .map((test) => (
                  <List.Item key={test.id} onClick={() => setSelectedTest(test)}>
                    <List.Content>
                      <List.Header>
                        {test.name ? test.name.slice(0, 100) : 'Untitled Test'}
                      </List.Header>
                    </List.Content>
                  </List.Item>
                ))}
          </List>
        </Grid.Column>

        {/* Column 2: Selected test details */}
        <Grid.Column width={7}>
          {selectedTest ? (
            <Segment>
              <h2>{selectedTest.name}</h2>
              <p><strong>Question Count:</strong> {relevantQuestions.length}</p>
              <p><strong>Questions:</strong></p>
              <ul>
              {Array.isArray(relevantQuestions) && relevantQuestions.length > 0 ? (
                relevantQuestions.map((q) => (
                  <li key={q.id}>
                    (Q) {q.question_str} (A) {q.answer}
                  </li>
                ))
              ) : (
                <li>No questions linked to this test</li>
              )}
            </ul>
            </Segment>
          ) : (
            <p>Select a test to view details</p>
          )}
        </Grid.Column>

        {/* Column 3: Update + Delete */}
        <Grid.Column width={4}>
          <Segment>
            {selectedTest && (
              <>
               <TestUpdateModal
                  user={user}
                  test={selectedTest}
                   msgAlert={msgAlert}
                   allQuestions={allQuestions}
                 />
                <Button
                  color="red"
                  fluid
                  style={{ marginTop: '0.5rem' }}
                  onClick={() => handleDeleteTest(selectedTest)}
                >
                  Delete
                </Button>
                <TestTake  test={selectedTest} user={user} msgAlert={msgAlert} allQuestions={allQuestions}/>
              </>
            )}
          </Segment>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default TestIndex
// import { Grid, Segment, List, Button, Modal } from 'semantic-ui-react'
// import LoadingScreen from '../shared/LoadingPage'
// import { getAllTests } from '../../api/test'
// import { getAllQuestions } from '../../api/question'
// import AddTestModal from './AddTestModal'
// import TestUpdateModal from './TestUpdateModal'
// import React, { useState, useEffect } from 'react'
// import { deleteTest } from "../../api/test";
// import TestTake from "./TestTake";


// const AssignTestModal = ({ user, msgAlert, newTest, setNewTest }) => {
//   const [allTests, setAllTests] = useState([])
//   const [allQuestions, setAllQuestions] = useState([])
//   const [selectedTest, setSelectedTest] = useState(null)
//     const [open, setOpen] = useState(false);
//     //   const [test, setTest] = useState(initialTest);
    
  

//   useEffect(() => {
//     getAllTests(user)
//       .then(res => {
//         console.log("✅ Fetched Tests:", res.data.test_thiss)
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
//         console.log("✅ Fetched Questions:", res.data.question_news)
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

//   const findRelevantQuestions = (test, allQuestions) => {
//     if (!test || !Array.isArray(test.question_new) || !Array.isArray(allQuestions)) return []

//     return allQuestions.filter((question) =>
//       test.question_new.some((testQuestion) =>
//         typeof testQuestion === 'object'
//           ? testQuestion.id === question.id
//           : testQuestion === question.id
//       )
//     )
//   }

//   // const relevantQuestions =
//   //   selectedTest && allQuestions.length
//   //     ? findRelevantQuestions(selectedTest, allQuestions)
//   //     : []

//   const relevantQuestions = (() => {
//     if (selectedTest && Array.isArray(allQuestions)) {
//       const result = findRelevantQuestions(selectedTest, allQuestions)
//       return Array.isArray(result) ? result : []
//     }
//     return []
//   })()

//   // console.log("📦 selectedTest:", selectedTest)
//   // console.log("📦 relevantQuestions:", relevantQuestions)
//   // console.log("📦 allQuestions:", allQuestions)

//   return (
//     <Modal
//       onClose={() => {
//         setOpen(false);
//         // setTest(initialTest); // Reset to initial state
//       }}
//       onOpen={() => setOpen(true)}
//       open={open}
//       trigger={
//         <Button fluid color="orange" style={{ marginBottom: "1rem" }}>
//           Assign Test
//         </Button>
//       }
//     >
//       <Modal.Content>

//     <Segment raised><AddTestModal user={user} msgAlert={msgAlert} setNewTest={setNewTest} />
//       <Grid columns={3} divided padded>
//         {/* Column 1: Test list and create button */}
//         <Grid.Column width={5}>
//           <h3>All Tests</h3>
          
//           <List divided selection>
//             {Array.isArray(allTests) &&
//               allTests
//                 .slice()
//                 .reverse()
//                 .map((test) => (
//                   <List.Item key={test.id} onClick={() => setSelectedTest(test)}>
//                     <List.Content>
//                       <List.Header>
//                         {test.name ? test.name.slice(0, 100) : 'Untitled Test'}
//                       </List.Header>
//                     </List.Content>
//                   </List.Item>
//                 ))}
//           </List>
//         </Grid.Column>

//         {/* Column 2: Selected test details */}
//         <Grid.Column width={7}>
//           {selectedTest ? (
//             <Segment>
//               <h2>{selectedTest.name}</h2>
//               <p><strong>Question Count:</strong> {relevantQuestions.length}</p>
//               <p><strong>Questions:</strong></p>
//               <ul>
//               {Array.isArray(relevantQuestions) && relevantQuestions.length > 0 ? (
//                 relevantQuestions.map((q) => (
//                   <li key={q.id}>
//                     (Q) {q.question_str} (A) {q.answer}
//                   </li>
//                 ))
//               ) : (
//                 <li>No questions linked to this test</li>
//               )}
//             </ul>
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
       
//               </>
//             )}
//           </Segment>
//         </Grid.Column>
//       </Grid>
//     </Segment>

//       </Modal.Content>
//     </Modal>
//   )
// }

// export default AssignTestModal


import React, { useState } from "react"
import {
  Button,
  Modal,
  Dropdown,
  Header,
  Segment,
  Icon,
} from "semantic-ui-react"
import { updateEmployee } from "../../api/user"

const AssignTestModal = ({ user, employee, tests, msgAlert }) => {
  const [open, setOpen] = useState(false)
  const [selectedTests, setSelectedTests] = useState([])

  const testOptions = tests.map((test) => ({
    key: test.id,
    text: test.name,
    value: test.id,
  }))

  const handleSubmit = () => {
    const updatedFields = {
      assigned_tests: selectedTests,
    }

    updateEmployee(user, employee.id, updatedFields)
      .then(() => {
        msgAlert({
          heading: "Success",
          message: "Test(s) assigned to employee.",
          variant: "success",
        })
        setOpen(false)
      })
      .catch((error) => {
        msgAlert({
          heading: "Error",
          message: "Failed to assign test(s): " + error.message,
          variant: "danger",
        })
      })
  }

  return (
    <Modal
      closeIcon
      open={open}
      trigger={
        <Button fluid color="orange" style={{ marginBottom: "1rem" }}>
          Assign Test
        </Button>
      }
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="tasks" content={`Assign Test(s) to ${employee.email}`} />
      <Modal.Content>
        <Segment basic>
          <Dropdown
            placeholder="Select Test(s)"
            fluid
            multiple
            search
            selection
            options={testOptions}
            onChange={(e, { value }) => setSelectedTests(value)}
            value={selectedTests}
          />
        </Segment>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>
          <Icon name="remove" /> Cancel
        </Button>
        <Button color="green" onClick={handleSubmit}>
          <Icon name="checkmark" /> Assign
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default AssignTestModal
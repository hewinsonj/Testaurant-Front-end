// import React, { useState, useEffect } from "react";
// import { Button, Modal } from "semantic-ui-react";
// import { updateTest } from "../../api/test";
// import { getAllQuestions } from "../../api/question";
// import AddTest from "./AddTest";

// const TestUpdateModal = (props) => {

//     const { heading, user, msgAlert, setNewTest, activeItem, question } = props

//     const [open, setOpen] = useState(false)
//     const [test, setTest] = useState(props.test)
//     const [idStorage, setIdStorage] = useState(props.tempQuestion)
//     const [allQuestions, setAllQuestions] = useState(props.allQuestions)

//   const tempQuestion = {
//     question_ids: [],
//   };

//     // useEffect(() => {
//     //     // handleChecked();
//     //     getAllQuestions(user)
//     //         .then(res => {
//     //             setAllQuestions(res.data.question_news)
//     //         })
//     //         .then(() => {
//     //             // handleChecked()
//     //         })
//     //         .catch(error => {
//     //             msgAlert({
//     //                 'heading': 'Error',
//     //                 'message': 'Could not get questions',
//     //                 'variant': 'danger'
//     //             })
//     //         })
//     // },[])

//     const handleChange = (e , target) => {
        
//         setIdStorage(prevTest => {
//             const { name, value } = target
//             const updatedName = name
//             let updatedValue = value
//             if(target.type === 'number') {
//             // change from string to actual number
//                 updatedValue = parseInt(e.target.value)
//             }
//             // handle the checkbox
//             if (updatedName === 'question_ids' && target.checked) {
                
//                 updatedValue = (props.test.question_new).push(parseInt(target.id))
//             } else if (updatedName === 'question_ids' && !target.checked) {
//                 for (let i = 0; i < prevTest.question_ids.length; i++) {
//                     if(prevTest.question_ids[i] === parseInt(target.id)){
//                         prevTest.question_ids.splice(i, 1)
//                     }
//                 }
//                 updatedValue = false
//             }
//             const updatedTest = { [updatedName]: updatedValue }
//             return { ...prevTest}
//         })
//     }

//     // const handleChecked = (test , question) => {
//     //     for (let i = 0; i < test.question_new.length; i++) {
//     //         if(test.question_new[i].id === question.id){

//     //             // idStorage.question_ids.push(parseInt(question.id)

//     //             // console.log('working')

//     //             return true
                
//     //         }
//     //     } console.log('not working')
        
//     // }
//     // console.log(test, 'this is test.question_new.id -------------------------------------')
//     // console.log(question, 'this is question-------------------------------------')




//     const handleChangeOther = (e , target) => {
//         setTest(prevTest => {
//             const { name, value } = target
//             const updatedName = name
//             let updatedValue = value
//             // handle number type
//             if(target.type === 'number') {
//             // change from string to actual number
//                 updatedValue = parseInt(e.target.value)
//             }
//             const updatedTest = { [updatedName]: updatedValue }

//             return { ...prevTest, ...updatedTest}
//         })
//     }

//   const handleUpdateTest = (e) => {
//     e.preventDefault();
//     console.log(test, "this is the updated test");

//     allQuestions
//       .slice(0)
//       .map((question) => findQuestionObject(question, idStorage));

//         updateTest(user, test, props.test.id)

//             .then(() => {
//                 msgAlert({
//                     heading: 'Success',
//                     message: 'Created Test',
//                     variant: 'success'
//                 })
//             })
//             .then(() => {
//                 setOpen(false)
//             })
//             .then(() => setNewTest(prev => !prev))
//             .catch((error) => {
//                 msgAlert({
//                     heading: 'Failure',
//                     message: 'Create Test Failure' + error,
//                     variant: 'danger'
//                 })
//             })
//     }
    
//     const findQuestionObject = (question, idStorage) => {
//         for (let i = 0; i < tempQuestion.question_ids.length; i++) {
//           if(idStorage.question_ids[i] == question.id){
//             props.test.question_new.push(question.id)
//         //    console.log('this function works')
//           }
//         } 
//         return 
//       }
    
//     //   console.log(props.test, 'this is the damn temp q')
      
//     // console.log('these are the question objects', test.question_new)
//     // console.log('this is the tempQuestion', idStorage.question_ids)

//     return (
//         <Modal
//             onClose={() => {
//                     setOpen(false)
//                     setTest(props.test)
//                 }
//             }
//             onOpen={() => setOpen(true)}
//             open={open}
//             trigger={
//                 <Button color='black' onClick={()=>setTest(props.test)}>Update Test</Button>
//             }
//         >
//             <Modal.Content>
//                 <AddTest
//                     test={ test }
//                     handleChange={ handleChange }
//                     handleChangeOther={handleChangeOther}
//                     heading="Update Test!"
//                     handleSubmit={ handleUpdateTest }
//                     allQuestions={allQuestions}
//                     user={user}
//                     // handleChecked={handleChecked}
//                     // isChecked={isChecked}
//                 />
//             </Modal.Content>
//         </Modal>
//     )
// }

// export default TestUpdateModal;
import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import { updateTest } from "../../api/test";
import AddTest from "./AddTest";

const TestUpdateModal = (props) => {
  const { heading, user, msgAlert, setNewTest, test: initialTest, relevantQuestions,  } = props;

  const [open, setOpen] = useState(false);
  const [test, setTest] = useState(initialTest);
  const [idStorage, setIdStorage] = useState({
    question_ids: Array.isArray(relevantQuestions) ? relevantQuestions.map((q) => q.id) : [],
  });

  const handleChange = (e, { name, id, checked }) => {
    setIdStorage((prevState) => {
      let updatedIds = [...prevState.question_ids];
      if (name === "question_ids") {
        if (checked) {
          updatedIds.push(parseInt(id));
        } else {
          updatedIds = updatedIds.filter((questionId) => questionId !== parseInt(id));
        }
      }
      return { ...prevState, question_ids: updatedIds };
    });
  };

  const handleChangeOther = (e, { name, value, type }) => {
    setTest((prevState) => ({
      ...prevState,
      [name]: type === "number" ? parseInt(value) : value,
    }));
  };

  const handleUpdateTest = (e) => {
    e.preventDefault();
  
    // Construct updated test object with only question IDs
    const updatedTest = {
      ...test,
      question_new: idStorage.question_ids, // Only pass the question IDs
    };
  
    // console.log("Updated Test Object to be Sent:", updatedTest);
  
    updateTest(user, updatedTest, initialTest.id)
      .then(() => {
        msgAlert({
          heading: "Success",
          message: "Test updated successfully!",
          variant: "success",
        });
        setOpen(false);
        setNewTest((prev) => !prev);
      })
      .catch((error) => {
        console.error("Error During Test Update:", error.message);
        msgAlert({
          heading: "Error",
          message: `Failed to update test: ${error.message}`,
          variant: "danger",
        });
      });
  };

  return (
    <Modal
      onClose={() => {
        setOpen(false);
        setTest(initialTest); // Reset to initial state
      }}
      // onOpen={() => setOpen(true)}
      onOpen={() => {
        setTest(initialTest);
      
        setIdStorage((prev) => {
          const existingIds = Array.isArray(initialTest.question_new)
            ? initialTest.question_new.map((q) => (typeof q === "object" ? q.id : q))
            : [];
      
          const mergedIds = Array.from(new Set([...prev.question_ids, ...existingIds]));
      
          return { question_ids: mergedIds };
        });
      
        setOpen(true);
      }}
      open={open}
      trigger={
        <Button color="black" fluid onClick={() => setTest(initialTest)}>
          Update Test
        </Button>
      }
    >
      <Modal.Content>
        <AddTest
          test={test}
          handleChange={handleChange}
          handleChangeOther={handleChangeOther}
          heading={heading}
          handleSubmit={handleUpdateTest}
          relevantQuestions={relevantQuestions} // Pass relevantQuestions here
          allQuestions={props.allQuestions}
          user={user}
        />
      </Modal.Content>
    </Modal>
  );
};

export default TestUpdateModal;
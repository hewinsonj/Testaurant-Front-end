// import React, { useState, useEffect } from 'react'
// import {Button, Checkbox, Form, Container, Icon, Segment, Grid} from 'semantic-ui-react'
// import { createTest } from '../../api/test'
// import { getAllQuestions } from '../../api/question'
// import LoadingScreen from '../shared/LoadingPage'
// import QuestionSegment from './QuestionSegment'
// import AddTest from './AddTest'

// const CreateTest = (props) => {

//     const { heading, user, msgAlert, setNewTest, activeItem, question, setOpen  } = props

    
//     const defaultTest = {
//         name: '',
//         question_new: [],
//         // created_at: '',
//         // updated_at: '',
//     }

//     const tempQuestion = {
//         question_ids: [],
//     }

//     const [test, setTest] = useState(defaultTest)
//     const [idStorage, setIdStorage] = useState(tempQuestion)

//     const [allQuestions, setAllQuestions] = useState(null)

//     useEffect(() => {
        
//         getAllQuestions(user)
//             .then(res => {
//                 setAllQuestions(res.data.question_news)
//             })
//             .catch(error => {
//                 msgAlert({
//                     'heading': 'Error',
//                     'message': 'Could not get questions',
//                     'variant': 'danger'
//                 })
//             })
//     },[])

//     const handleChange = (e , target) => {
        
//         setIdStorage(prevTest => {
//             const { name, value } = target
//             const updatedName = name
//             let updatedValue = value
//             // handle number type
//             if(target.type === 'number') {
//                 // change from string to actual number
//                 updatedValue = parseInt(e.target.value)
//             }

//             //handle the checkbox
//             if (updatedName === 'question_ids' && target.checked) {
                
//                 updatedValue = (prevTest.question_ids).push(parseInt(target.id))

                
//                 // console.log(target.id, 'target id')
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
//     console.log("this is the test from testAdd", test)


//     const handleChangeOther = (e , target) => {
//         setTest(prevTest => {
//             const { name, value } = target
//             const updatedName = name
//             let updatedValue = value
//             // handle number type
//             if(target.type === 'number') {
//                 // change from string to actual number
//                 updatedValue = parseInt(e.target.value)
//             }
//             const updatedTest = { [updatedName]: updatedValue }

//             return { ...prevTest, ...updatedTest}
//         })
//     }

//     const handleCreateTest = (e) => {
//         e.preventDefault()
//         allQuestions.slice(0).map((question) => (
//             findQuestionObject( question, idStorage)
//         ))

//         createTest(user, test)
//             // .then(() => handleClose())
//             .then(() => {
//                 msgAlert({
//                     heading: 'Success',
//                     message: 'Created Test',
//                     variant: 'success'
//                 })
//             })
//             .then(() => {
//                 console.log("this is the test", test)
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
    
    
    // const findQuestionObject = (question, idStorage) => {
    //     for (let i = 0; i < idStorage.question_ids.length; i++) {
    //       if(idStorage.question_ids[i] == question.id){
    //         test.question_new.push(question.id)
    //        console.log('this function works', test.question_new)
    //       } 
    //       setTest(prevTest => ({
    //         ...prevTest,
    //         question_new: [...prevTest.question_new, question.id]}));
    //     } return
        
    //   }

    
      
//     console.log('these are the questions associated with this test', test.question_new)
//     console.log('this is the idstorage.question_ids', idStorage.question_ids)

//     return (
//         <AddTest
//             test={ test }
//             handleChange={ handleChange }
//             handleChangeOther={handleChangeOther}
//             heading="Create a new Test!"
//             handleSubmit={ handleCreateTest }
//             allQuestions={allQuestions}
//             user={user}
//         />
//     )
// }

// export default CreateTest




// import React, { useState, useEffect } from 'react'
// import {Button, Checkbox, Form, Container, Icon, Segment, Grid} from 'semantic-ui-react'
// import { createTest } from '../../api/test'
// import { getAllQuestions } from '../../api/question'
// import LoadingScreen from '../shared/LoadingPage'
// import QuestionSegment from './QuestionSegment'
// import AddTest from './AddTest'

// const CreateTest = (props) => {

//     const { heading, user, msgAlert, setNewTest, activeItem, question, setOpen  } = props

    
//     const defaultTest = {
//         name: '',
//         question_new: [],
//         // created_at: '',
//         // updated_at: '',
//     }

//     const tempQuestion = {
//         question_ids: [],
//     }

//     const [test, setTest] = useState(defaultTest)
//     const [idStorage, setIdStorage] = useState(tempQuestion)

//     const [allQuestions, setAllQuestions] = useState(null)

//     useEffect(() => {
        
//         getAllQuestions(user)
//             .then(res => {
//                 setAllQuestions(res.data.question_news)
//             })
//             .catch(error => {
//                 msgAlert({
//                     'heading': 'Error',
//                     'message': 'Could not get questions',
//                     'variant': 'danger'
//                 })
//             })
//     },[])


//     // useEffect(() => {
//     //     if (test.question_new.length > 0) {
//     //         // Now that the question_new has been updated, make the API call
//     //         createTest(user, test)
//     //             .then(() => {
//     //                 msgAlert({
//     //                     heading: 'Success',
//     //                     message: 'Created Test',
//     //                     variant: 'success'
//     //                 });
//     //                 setOpen(false);
//     //                 setNewTest(prev => !prev);
//     //             })
//     //             .catch(error => {
//     //                 msgAlert({
//     //                     heading: 'Failure',
//     //                     message: 'Create Test Failure' + error,
//     //                     variant: 'danger'
//     //                 });
//     //             });
//     //     }
//     // }, [test]); // This will trigger the API call only after `test` is updated with IDs
//     //------------------- handleChange refactor ---------------------
//     const handleChange = (e , target) => {
//         setIdStorage(prevTest => {
//             const { name } = target;
//             let updatedValue = [...prevTest.question_ids]; // Clone the array

//             //handle the checkbox
//             if (name === 'question_ids' && target.checked) {
//                 updatedValue.push(parseInt(target.id)); // Add the new question ID
//             } else if (name === 'question_ids' && !target.checked) {
//                 updatedValue = updatedValue.filter(id => id !== parseInt(target.id)); // Remove the unchecked question ID
//             }

//             return { ...prevTest, question_ids: updatedValue }; // Return the new state
//         });
//     };
//     //------------------- End handleChange refactor -----------------

//     // console.log("this is the test from testAdd", test)


//     const handleChangeOther = (e , target) => {
//         setTest(prevTest => {
//             const { name, value } = target
//             const updatedName = name
//             let updatedValue = value
//             // handle number type
//             if(target.type === 'number') {
//                 // change from string to actual number
//                 updatedValue = parseInt(e.target.value)
//             }
//             const updatedTest = { [updatedName]: updatedValue }

//             return { ...prevTest, ...updatedTest}
//         })
//     }

//     const handleCreateTest = (e) => {
//         e.preventDefault()
//         allQuestions.slice(0).map((question) => (
//             findQuestionObject( question, idStorage)
//         ))

//         createTest(user, test)
//             // .then(() => handleClose())
//             .then(() => {
//                 console.log("this is the test after createTest", test)
//             })
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
//         // Create a new array for `question_new` instead of mutating the existing state
//         const newQuestionIds = idStorage.question_ids.filter(id => id === question.id);
    
//         if (newQuestionIds.length == idStorage.question_ids.length) {
//             // Update the state properly using setTest, avoid direct mutation
//             setTest(prevTest => ({
//                 ...prevTest,
//                 question_new: [...prevTest.question_new, ...newQuestionIds]
//             }));
    
//             console.log('Updated question_new in state:', test.question_new);
//         }
//         else {
//             console.log('newQuestionIds', newQuestionIds)
//         }
//     }



//     //------------------- End findQuestionObject refactor -----------------

//     console.log('this is the idstorage.question_ids', idStorage.question_ids)

//     return (
//         <AddTest
//             test={ test }
//             handleChange={ handleChange }
//             handleChangeOther={handleChangeOther}
//             heading="Create a new Test!"
//             handleSubmit={ handleCreateTest }
//             allQuestions={allQuestions}
//             user={user}
//         />
//     )
// }

// export default CreateTest


import React, { useState, useEffect } from 'react'
import { createTest } from '../../api/test'
import { getAllQuestions } from '../../api/question'
import AddTest from './AddTest'

const CreateTest = (props) => {

    const {  user, msgAlert, setNewTest, setOpen  } = props

    const defaultTest = {
        name: '',
        question_new: [],
    }

    const tempQuestion = {
        question_ids: [],
    }

    const [test, setTest] = useState(defaultTest)
    const [idStorage, setIdStorage] = useState(tempQuestion)
    const [allQuestions, setAllQuestions] = useState(null)
    const [isTestReady, setIsTestReady] = useState(false) // Add flag to determine when the test state is ready for API call

    useEffect(() => {
        getAllQuestions(user)
            .then(res => {
                setAllQuestions(res.data.question_news)
            })
            .catch(error => {
                msgAlert({
                    'heading': 'Error',
                    'message': 'Could not get questions',
                    'variant': 'danger'
                })
            })
    },[])

    //------------------- handleChange refactor ---------------------
    const handleChange = (e , target) => {
        setIdStorage(prevTest => {
            const { name } = target;
            let updatedValue = [...prevTest.question_ids]; // Clone the array

            // Handle checkbox logic
            if (name === 'question_ids' && target.checked) {
                updatedValue.push(parseInt(target.id)); // Add the new question ID
            } else if (name === 'question_ids' && !target.checked) {
                updatedValue = updatedValue.filter(id => id !== parseInt(target.id)); // Remove unchecked question ID
            }
<<<<<<< HEAD

            return { ...prevTest, question_ids: updatedValue }; // Return updated state
        });
    };
    //------------------- End handleChange refactor -----------------
=======
            //handle the checkbox
            console.log(updatedName, "this is the name")
            console.log(target.checked, "target.checked??????")
            if (updatedName === 'question_ids' && target.checked) {
                
                updatedValue = (prevTest.question_ids).push(parseInt(target.id))
            } else if (updatedName === 'question_ids' && !target.checked) {
                for (let i = 0; i < prevTest.question_ids.length; i++) {
                    if(prevTest.question_ids[i] === parseInt(target.id)){
                        prevTest.question_ids.splice(i, 1)
                    }
                }
                updatedValue = false
            }

            const updatedTest = { [updatedName]: updatedValue }
            return { ...prevTest}
        })
    }
    console.log("this is the test from testAdd", test)

>>>>>>> 27bdab7 (cleaned up)

    const handleChangeOther = (e , target) => {
        setTest(prevTest => {
            const { name, value } = target;
            const updatedValue = target.type === 'number' ? parseInt(value) : value;
            return { ...prevTest, [name]: updatedValue };
        });
    }

    //------------------- handleCreateTest refactor ---------------------
    const handleCreateTest = (e) => {
        e.preventDefault();

<<<<<<< HEAD
        // Update test state with question IDs from idStorage before API call
        setTest(prevTest => ({
            ...prevTest,
            question_new: idStorage.question_ids // Sync the selected question IDs
        }));

        // Set flag to true so useEffect can trigger API call
        setIsTestReady(true);
    };
    //------------------- End handleCreateTest refactor ---------------------

    //------------------- useEffect for API Call ---------------------
    useEffect(() => {
        if (isTestReady) {
            createTest(user, test)
                .then(() => {
                    msgAlert({
                        heading: 'Success',
                        message: 'Created Test',
                        variant: 'success'
                    });
                    setOpen(false);
                    setNewTest(prev => !prev);
=======
        createTest(user, test)
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Created Test',
                    variant: 'success'
>>>>>>> 27bdab7 (cleaned up)
                })
                .catch(error => {
                    msgAlert({
                        heading: 'Failure',
                        message: 'Create Test Failure' + error,
                        variant: 'danger'
                    });
                })
<<<<<<< HEAD
                .finally(() => {
                    setIsTestReady(false); // Reset the flag after the API call
                });
        }
    }, [isTestReady, test]); // Run when test is updated and isTestReady is true
    //------------------- End useEffect for API Call ---------------------

    console.log('this is the idstorage.question_ids', idStorage.question_ids);
=======
            })
    }
    
    const findQuestionObject = (question, idStorage) => {
        for (let i = 0; i < idStorage.question_ids.length; i++) {
          if(idStorage.question_ids[i] == question.id){
            test.question_new.push(question.id)
           console.log('this function works')
          }
        } return 
      }
>>>>>>> 27bdab7 (cleaned up)

    return (
        <AddTest
            test={ test }
            handleChange={ handleChange }
            handleChangeOther={handleChangeOther}
            heading="Create a new Test!"
            handleSubmit={ handleCreateTest }
            allQuestions={allQuestions}
            user={user}
        />
    )
}

export default CreateTest;
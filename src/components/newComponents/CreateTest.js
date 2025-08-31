import React, { useState, useEffect } from 'react'
import { createTest } from '../../api/test'
import { getAllQuestions } from '../../api/question'
import AddTest from './AddTest'

const CreateTest = (props) => {

    const {  user, msgAlert, setNewTest, setOpen, onCreated, getAllRestaurants } = props

    const defaultTest = {
        name: '',
        question_new: [],
        restaurant: ''
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

            return { ...prevTest, question_ids: updatedValue }; // Return updated state
        });
    };
    //------------------- End handleChange refactor -----------------

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
      let isMounted = true; // guard against updates after unmount

      if (isTestReady) {
        createTest(user, test)
          .then((res) => {
            if (!isMounted) return;
            const newTest = (res && res.data && (res.data.test || res.data)) || null;
            msgAlert({
              heading: 'Success',
              message: 'Created Test',
              variant: 'success'
            });
            if (typeof onCreated === 'function' && newTest) {
              onCreated(newTest);
            }
            setOpen(false);
            setNewTest((prev) => !prev);
          })
          .catch(error => {
            if (!isMounted) return;
            msgAlert({
              heading: 'Failure',
              message: 'Create Test Failure' + error,
              variant: 'danger'
            });
          })
          .finally(() => {
            if (!isMounted) return;
            setIsTestReady(false);
          });
      }

      return () => {
        isMounted = false;
      };
    }, [isTestReady]);
    //------------------- End useEffect for API Call ---------------------

    // console.log('this is the idstorage.question_ids', idStorage.question_ids);

  return (
    <AddTest
      test={test}
      handleChange={handleChange}
      handleChangeOther={handleChangeOther}
      heading="Create a new Test!"
      handleSubmit={handleCreateTest}
      allQuestions={allQuestions}
      user={user}
      getAllRestaurants={getAllRestaurants}
    />
  );
};

export default CreateTest;
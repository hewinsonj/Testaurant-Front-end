import { useState, useEffect, useRef } from 'react'
import { createTest } from '../../api/test'
import { getAllQuestions } from '../../api/question'
import AddTest from './AddTest'

const CreateTest = (props) => {

    const { user, msgAlert, setNewTest = null, setOpen, onCreated, getAllRestaurants } = props

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
    const submittingRef = useRef(false);

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
    }, [msgAlert, user])

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
    const handleCreateTest = async (e) => {
        e.preventDefault();

        // prevent duplicate submissions (e.g., React StrictMode double-invoke)
        if (submittingRef.current) return;
        submittingRef.current = true;

        const payload = {
          ...test,
          question_new: Array.isArray(idStorage.question_ids) ? idStorage.question_ids : [],
        };

        try {
          const res = await createTest(user, payload);
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
          if (typeof setNewTest === 'function') {
            setNewTest((prev) => !prev);
          }
        } catch (error) {
          msgAlert({
            heading: 'Failure',
            message: 'Create Test Failure' + error,
            variant: 'danger'
          });
        } finally {
          submittingRef.current = false;
        }
    };
    //------------------- End handleCreateTest refactor ---------------------

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
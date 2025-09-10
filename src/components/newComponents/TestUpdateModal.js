import { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import { updateTest } from "../../api/test";
import AddTest from "./AddTest";

const TestUpdateModal = (props) => {
  const { heading, user, msgAlert, setNewTest, test: initialTest, relevantQuestions, getAllRestaurants } = props;

  const [open, setOpen] = useState(false);
  const [test, setTest] = useState(initialTest);
  const [idStorage, setIdStorage] = useState({
    question_ids: Array.isArray(relevantQuestions) ? relevantQuestions.map((q) => q.id) : [],
  });

  const safeToggleNewTest = () => {
    if (typeof setNewTest === 'function') {
      setNewTest((prev) => !prev);
    }
  };

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
        safeToggleNewTest();
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
          getAllRestaurants={getAllRestaurants}
          user={user}
        />
      </Modal.Content>
    </Modal>
  );
};

export default TestUpdateModal;
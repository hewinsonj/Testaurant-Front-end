import React, { useState, useEffect } from "react";
import { Button, Modal } from "semantic-ui-react";
import { updateTest } from "../../api/test";
import { getAllQuestions } from "../../api/question";
import AddTest from "./AddTest";

const TestUpdateModal = (props) => {
  const { user, msgAlert, setNewTest } = props;
  const [open, setOpen] = useState(false);
  const [test, setTest] = useState(props.test);
  const [idStorage, setIdStorage] = useState(props.tempQuestion);
  const [allQuestions, setAllQuestions] = useState(null);

  const tempQuestion = {
    question_ids: [],
  };

  useEffect(() => {
    getAllQuestions(user)
      .then((res) => {
        setAllQuestions(res.data.question_news);
      })
      .then(() => {
        handleChecked();
      })
      .catch((error) => {
        msgAlert({
          heading: "Error",
          message: "Could not get questions",
          variant: "danger",
        });
      });
  }, []);

  const handleChange = (e, target) => {
    setIdStorage((prevTest) => {
      console.log(
        props.test.question_new,
        "props.test.question_new before ---------"
      );
      const { name, value } = target;
      const updatedName = name;
      let updatedValue = value;
      if (target.type === "number") {
        // change from string to actual number
        updatedValue = parseInt(e.target.value);
      }
      // handle the checkbox
      if (updatedName === "question_ids" && target.checked) {
        updatedValue = props.test.question_new.push(parseInt(target.id));
      } else if (updatedName === "question_ids" && !target.checked) {
        for (let i = 0; i < props.test.question_new.length; i++) {
          if (props.test.question_new[i] === parseInt(target.id)) {
            props.test.question_new.splice(i, 1);
          }
        }
        updatedValue = false;
      }
      console.log(
        props.test.question_new,
        "props.test.question_new after ---------"
      );
      const updatedTest = { [updatedName]: updatedValue };
      return { ...prevTest };
    });
  };

  const handleChecked = (question, test) => {
    for (let i = 0; i < test.question_new.length; i++) {
      if (test.question_new[i].id === question.id) {
        return true;
      } else {
        return false;
      }
    }
    console.log(test.question_new, "question new");
  };

  const handleChangeOther = (e, target) => {
    setTest((prevTest) => {
      const { name, value } = target;
      const updatedName = name;
      let updatedValue = value;
      // handle number type
      if (target.type === "number") {
        // change from string to actual number
        updatedValue = parseInt(e.target.value);
      }
      const updatedTest = { [updatedName]: updatedValue };

      return { ...prevTest, ...updatedTest };
    });
  };

  const handleUpdateTest = (e) => {
    e.preventDefault();
    console.log(test, "this is the updated test");

    allQuestions
      .slice(0)
      .map((question) => findQuestionObject(question, idStorage));

    updateTest(user, test, props.test.id)
      .then(() => {
        msgAlert({
          heading: "Success",
          message: "Created Test",
          variant: "success",
        });
      })
      .then(() => {
        setOpen(false);
      })
      .then(() => setNewTest((prev) => !prev))
      .catch((error) => {
        msgAlert({
          heading: "Failure",
          message: "Create Test Failure" + error,
          variant: "danger",
        });
      });
  };

  const findQuestionObject = (question, idStorage) => {
    for (let i = 0; i < tempQuestion.question_ids.length; i++) {
      if (idStorage.question_ids[i] == question.id) {
        props.test.question_new.push(question.id);
      }
    }
    return;
  };

  return (
    <Modal
      onClose={() => {
        setOpen(false);
        setTest(props.test);
      }}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button color="black" onClick={() => setTest(props.test)}>
          Update Test
        </Button>
      }
    >
      <Modal.Content>
        <AddTest
          test={test}
          handleChange={handleChange}
          handleChangeOther={handleChangeOther}
          heading="Update Test!"
          handleSubmit={handleUpdateTest}
          allQuestions={allQuestions}
          user={user}
          handleChecked={handleChecked}
        />
      </Modal.Content>
    </Modal>
  );
};

export default TestUpdateModal;

import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import { updateQuestion } from "../../api/question";
import AddItem from "./AddItem";

const QuestionUpdateModal = (props) => {
  const { user, msgAlert, triggerRefresh, getAllRestaurants } = props;
  const [question, setQuestion] = useState(props.question);
  const [open, setOpen] = useState(false);

  const handleChange = (e, target) => {
    setQuestion((prevQuestion) => {
      const { name, value } = target;
      const updatedName = name;
      let updatedValue = value;
      // handle number type
      if (target.type === "number") {
        // change from string to actual number
        updatedValue = parseInt(e.target.value);
      }

      //handle the checkbox
      if (updatedName === "private" && target.checked) {
        updatedValue = true;
      } else if (updatedName === "private" && !target.checked) {
        updatedValue = false;
      }

      const updatedQuestion = { [updatedName]: updatedValue };

      return { ...prevQuestion, ...updatedQuestion };
    });
  };

  const handleUpdateQuestion = (e) => {
    e.preventDefault();
    //close form if no change was made
    if (question == props.question) {
      setOpen(false);
    } else {
      updateQuestion(user, question, props.question.id)
        .then(() => {
          setOpen(false);
          triggerRefresh();
          msgAlert({
            heading: "Success",
            message: "Updated Question",
            variant: "success",
          });
        })
        .catch((error) => {
          setOpen(false);
          msgAlert({
            heading: "Failure",
            message: "Update Question Failure" + error,
            variant: "danger",
          });
        });
    }
  };

  // console.log(user, "this be the user");
  return (
    <Modal
      onClose={() => {
        setOpen(false);
        setQuestion(props.question);
      }}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button color="black" fluid onClick={() => setQuestion(props.question)}>
          Update Question
        </Button>
      }
    >
      <Modal.Content>
        <AddItem
          question={question}
          handleChange={handleChange}
          heading="Update a Question!"
          handleSubmit={handleUpdateQuestion}
          getAllRestaurants={getAllRestaurants}
          user={user}
        />
      </Modal.Content>
    </Modal>
  );
};

export default QuestionUpdateModal;

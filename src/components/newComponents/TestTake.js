import React, { useState } from "react";
import { Button, Segment, Grid, Form, Modal } from "semantic-ui-react";
import LoadingScreen from "../shared/LoadingPage";
import { updateEmployee } from "../../api/user";
import { createResult } from "../../api/result";

const TestTake = ({ user, msgAlert, test, onCompleted }) => {
  const defaultResult = {
    score: "",
    correct: 0,
    wrong: 0,
    total: "",
    percent: 0,
    time: "",
    the_test: null,
  };

  const [open, setOpen] = useState(false);
  const [result, setResult] = useState(defaultResult);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswerChange = (e) => {
    const { value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: value,
    }));
  };

  const handleCheckAnswer = () => {
    const currentQuestion = test.question_new[currentQuestionIndex];
    if (answers[currentQuestionIndex] === currentQuestion.answer) {
      setResult((prevResult) => ({
        ...prevResult,
        correct: prevResult.correct + 1,
      }));
    } else {
      setResult((prevResult) => ({
        ...prevResult,
        wrong: prevResult.wrong + 1,
      }));
    }
  };

  const handleNext = () => {
    if (!answers[currentQuestionIndex]) return;
    if (currentQuestionIndex < test.question_new.length - 1) {
      handleCheckAnswer(); // Check the current answer before moving to the next question
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSubmit = () => {
    const totalQuestions = test.question_new.length;

    let correctCount = 0;
    let wrongCount = 0;

    test.question_new.forEach((question, index) => {
      if (answers[index] === question.answer) {
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    const percentage = Math.round((correctCount / totalQuestions) * 100);

    const finalResult = {
      score: `${correctCount} out of ${totalQuestions}`,
      correct: String(correctCount),
      wrong: String(wrongCount),
      total: String(totalQuestions),
      percent: `${percentage}%`,
      time: ` mins`, // you can plug in a timer later
      the_test: String(test.id),
      owner: user.id,
    };

    createResult(user, finalResult)
      .then(() => {
        // Remove this completed test from the user's assigned tests (standardize on user.assigned_tests)
        const currentAssigned = Array.isArray(user?.assigned_tests)
          ? user.assigned_tests.map((t) => (typeof t === 'object' && t?.id ? t.id : t))
          : [];

        const updatedAssigned = currentAssigned.filter((id) => String(id) !== String(test.id));

        return updateEmployee(user, user.id, { assigned_tests: updatedAssigned })
          .then(() => {
            // Update in-memory user object so other components reading user.assigned_tests stay in sync
            if (Array.isArray(user.assigned_tests)) {
              user.assigned_tests = updatedAssigned;
            }

            msgAlert({
              heading: 'Success',
              message: 'Result submitted and test removed from your assigned tests.',
              variant: 'success',
            });
            setOpen(false);
            if (typeof onCompleted === 'function') {
              onCompleted(updatedAssigned);
            }
          });
      })
      .catch((error) => {
        msgAlert({
          heading: 'Error',
          message: 'Failed to submit result or unassign test: ' + (error?.message || error),
          variant: 'danger',
        });
      });
  };

  if (!test) {
    return <LoadingScreen />;
  }

  const currentQuestion = test.question_new[currentQuestionIndex];
  const isCurrentAnswered = answers[currentQuestionIndex] !== undefined && answers[currentQuestionIndex] !== "";

  return (
    <>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Button color="green" fluid style={{ marginTop: "0.5rem" }}>
            Take Test
          </Button>
        }
        size="large"
        closeOnDimmerClick={false}
        dimmer="blurring"
        className="dark-modal"
      >
        <Modal.Content scrolling>
          <Segment>
            <Grid padded textAlign="center">
              <h2>{test.name}</h2>
              <p>
                Question {currentQuestionIndex + 1} of{" "}
                {test.question_new.length}
              </p>
            </Grid>
          </Segment>

          {/* <Segment>
            <h3>{currentQuestion.question_str}</h3>
            <Form>
              {[currentQuestion.option1, currentQuestion.option2, currentQuestion.option3, currentQuestion.option4].map(
                (option, index) => (
                  <Form.Radio
                    key={index}
                    label={option}
                    name="answer"
                    value={option}
                    checked={answers[currentQuestionIndex] === option}
                    onChange={handleAnswerChange}
                  />
                )
              )}
            </Form>
          </Segment>*/}

          <Segment>
            <h3>{currentQuestion.question_str}</h3>
            <Form>
              {[
                currentQuestion.option1,
                currentQuestion.option2,
                currentQuestion.option3,
                currentQuestion.option4,
              ].map((option, index) => (
                <Form.Radio
                  key={index}
                  label={option}
                  name={`question-${currentQuestionIndex}`}
                  value={option}
                  checked={answers[currentQuestionIndex] === option}
                  onChange={(e, { value }) =>
                    setAnswers((prevAnswers) => ({
                      ...prevAnswers,
                      [currentQuestionIndex]: value,
                    }))
                  }
                />
              ))}
            </Form>
          </Segment>

          <Grid columns={2} textAlign="center">
            <Grid.Column>
              <Button
                color="blue"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button
                color="green"
                onClick={handleNext}
                disabled={currentQuestionIndex === test.question_new.length - 1 || !isCurrentAnswered}
              >
                Next
              </Button>
            </Grid.Column>
          </Grid>
        </Modal.Content>

        <Modal.Actions>
          {/* <Button
            color="red"
            onClick={() => setOpen(false)}
            disabled={result.correct + result.wrong === 0}
          >
            Cancel
          </Button> */}
          <Button
            color="green"
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < test.question_new.length}
          >
            Submit Test
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default TestTake;

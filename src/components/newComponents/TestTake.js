import React, { useState, useRef, useEffect } from "react";
import { Button, Segment, Grid, Form, Modal } from "semantic-ui-react";
import LoadingScreen from "../shared/LoadingPage";
import { updateEmployee } from "../../api/user";
import { createResult } from "../../api/result";

const TestTake = ({ user, msgAlert, test, onCompleted }) => {

  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [startedAt, setStartedAt] = useState(null);
  const [timeLeftSec, setTimeLeftSec] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Track mount status to avoid setting state on unmounted component
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const parseAllottedSeconds = (t) => {
    // `test.allotted_time` is stored as minutes (string or number). Treat <= 0 as no timer.
    const raw = t && t.allotted_time != null ? Number(t.allotted_time) : 0;
    if (!Number.isFinite(raw) || raw <= 0) return 0;
    return Math.max(0, Math.floor(raw * 60));
  };

  const formatMMSS = (sec) => {
    const s = Math.max(0, Number(sec) || 0);
    const mPart = Math.floor(s / 60);
    const sPart = s % 60;
    const mm = String(mPart).padStart(2, '0');
    const ss = String(sPart).padStart(2, '0');
    return `${mm}:${ss}`;
  };

  const handleNext = () => {
    if (!answers[currentQuestionIndex]) return;
    if (currentQuestionIndex < test.question_new.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSubmit = React.useCallback((auto = false) => {
    if (submitting) return;
    setSubmitting(true);

    const totalQuestions = test.question_new.length;

    let correctCount = 0;
    let wrongCount = 0;
    const wrongIds = [];

    test.question_new.forEach((question, index) => {
      const isCorrect = answers[index] === question.answer;
      if (isCorrect) {
        correctCount++;
      } else {
        wrongCount++;
        // Normalize to Question_new.id; support shapes: {id}, {question_new: {id}}, {question_new: 123}
        let qid = null;
        if (question && typeof question === 'object') {
          if (question.id != null) {
            qid = question.id;
          } else if (question.question_new != null) {
            qid = typeof question.question_new === 'object' ? question.question_new.id : question.question_new;
          }
        }
        if (qid != null) {
          const numId = Number(qid);
          wrongIds.push(Number.isNaN(numId) ? qid : numId);
        }
      }
    });

    // De-duplicate any repeated ids just in case
    const uniqueWrongIds = Array.from(new Set(wrongIds));

    const percentage = Math.round((correctCount / totalQuestions) * 100);

    // Build time strings
    const finished = new Date();
    const hhmmss = finished.toISOString().slice(11, 19); // HH:MM:SS (fits CharField(10))
    let elapsedStr = '';
    if (startedAt) {
      const ms = Date.now() - startedAt;
      const sec = Math.floor(ms / 1000);
      const mins = Math.floor(sec / 60);
      const rem = sec % 60;
      elapsedStr = `${mins}m ${rem}s`;
    }

    // Always save the result.restaurant as the test's restaurant (not the user's)
    const testRestaurantRaw = (test?.restaurant && typeof test.restaurant === 'object')
      ? (test.restaurant.id ?? test.restaurant.pk ?? null)
      : (test?.restaurant ?? test?.restaurant_id ?? null);
    const testRestaurantId = (testRestaurantRaw === '' || testRestaurantRaw === null)
      ? null
      : (Number.isFinite(Number(testRestaurantRaw)) ? Number(testRestaurantRaw) : null);

    const finalResult = {
      score: `${correctCount} out of ${totalQuestions}`,
      correct: String(correctCount),
      wrong: String(wrongCount),
      wrong_question_ids: uniqueWrongIds, // <-- NEW
      total: String(totalQuestions),
      percent: `${percentage}%`,
      time: elapsedStr || '0m 0s',
      time_completed: hhmmss, // <-- NEW
      the_test: String(test.id),
      owner: user.id,
      restaurant: testRestaurantId,
    };

    // if (process.env.NODE_ENV !== 'production') {
    //   console.log('[Result] resolved test.restaurant id →', testRestaurantId);
    // }

    // console.log('[Result] creating', finalResult)
    createResult(user, finalResult)
      .then(() => {
        const currentAssigned = Array.isArray(user?.assigned_tests)
          ? user.assigned_tests.map((t) => (typeof t === 'object' && t?.id ? t.id : t))
          : [];

        const updatedAssigned = currentAssigned.filter((id) => String(id) !== String(test.id));

        return updateEmployee(user, user.id, { assigned_tests: updatedAssigned })
          .then(() => {
            if (Array.isArray(user.assigned_tests)) {
              user.assigned_tests = updatedAssigned;
            }

            msgAlert({
              heading: 'Success',
              message: auto ? 'Time is up! Your test was submitted automatically.' : 'Result submitted and test removed from your assigned tests.',
              variant: 'success',
            });
            if (isMounted.current) {
              setTimerActive(false);
              setOpen(false);
            }
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
      })
      .finally(() => {
        if (isMounted.current) {
          setSubmitting(false);
        }
      });
  }, [answers, test, startedAt, user, msgAlert, onCompleted, submitting]);

  React.useEffect(() => {
    if (!open || !timerActive || !startedAt) return;
    const allotted = parseAllottedSeconds(test);
    if (allotted <= 0) return;
    const endAt = startedAt + allotted * 1000;

    const tick = () => {
      const rem = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
      setTimeLeftSec(rem);
      if (rem <= 0) {
        clearInterval(id);
        setTimerActive(false);
        if (!submitting) handleSubmit(true); // auto-submit
      }
    };

    // Initial tick, then interval
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [open, timerActive, startedAt, test, submitting, handleSubmit]);

  if (!test) {
    return <LoadingScreen />;
  }

  const currentQuestion = test.question_new[currentQuestionIndex];
  const isCurrentAnswered = answers[currentQuestionIndex] !== undefined && answers[currentQuestionIndex] !== "";

  return (
    <>
      <Modal
        onClose={() => {
          const total = test.question_new.length;
          if (Object.keys(answers).length >= total) {
            setOpen(false);
          }
        }}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Button color="green" fluid style={{ marginTop: "0.5rem" }} onClick={() => setConfirmOpen(true)}>
            Take Test
          </Button>
        }
        size="large"
        closeOnDimmerClick={false}
        closeOnEscape={false}
        dimmer="blurring"
        className="dark-modal"
      >
        <Modal.Content scrolling>
          <Segment style={{ position: 'relative' }}>
            {timerActive && timeLeftSec > 0 && (
              <div style={{ position: 'absolute', top: 8, right: 12, fontWeight: 700, fontSize: '1rem' }}>
                ⏳ {formatMMSS(timeLeftSec)}
              </div>
            )}
            <Grid padded textAlign="center">
              <h2>{test.name}</h2>
              <p>
                Question {currentQuestionIndex + 1} of {test.question_new.length}
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
            onClick={() => handleSubmit(false)}
            disabled={submitting || Object.keys(answers).length < test.question_new.length}
          >
            Submit Test
          </Button>
        </Modal.Actions>
      </Modal>
      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        size="small"
        closeOnDimmerClick={true}
        closeOnEscape={true}
        dimmer
        className="dark-modal"
      >
        <Modal.Header>Ready to start?</Modal.Header>
        <Modal.Content>
          <p>
            Are you sure you’re ready to take the test? Once started, every question must be answered before exiting the test.
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => { setConfirmOpen(false); setOpen(false); }}>Cancel</Button>
          <Button
            color="green"
            onClick={() => {
              setConfirmOpen(false);
              const now = Date.now();
              setStartedAt(now);
              const secs = parseAllottedSeconds(test);
              if (secs > 0) {
                setTimeLeftSec(secs);
                setTimerActive(true);
              } else {
                setTimeLeftSec(0);
                setTimerActive(false);
              }
              setOpen(true);
            }}
          >
            I’m ready
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default TestTake;

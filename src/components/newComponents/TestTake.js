// import React, { useState } from "react";
// import { Button, Segment, Grid, Form, Modal, Divider } from "semantic-ui-react";
// import LoadingScreen from "../shared/LoadingPage";
// import { createResult } from "../../api/result";

// const TestTake = ({ user, msgAlert, test }) => {
//   const defaultResult = {
//     score: "",
//     correct: 0,
//     wrong: 0,
//     total: "",
//     percent: 0,
//     time: "",
//     the_test: null,
//   };
//   const defaultResponses = {
//     answer: "",
//     index: 0,
//   };

//   const defaultIndex = {
//     count: 0,
//   };

//   const defaultValue = 1;

//   // const [updated, setUpdated] = useState(false)
//   // const [deleted, setDeleted] = useState(false)
//   const [open, setOpen] = React.useState(false);
//   const [result, setResult] = useState(defaultResult);
//   const [responses, setResponses] = useState(defaultResponses);
//   const [value, setValue] = useState(defaultValue);
//   const [index, setIndex] = useState(defaultIndex);

//   const handleChange = (e, target) => {
//     setResponses((prevResponse) => {
//       const { name, value } = target;
//       const updatedName = name;
//       let updatedValue = value;
//       const updatedResponse = { [updatedName]: updatedValue };

//       return { ...prevResponse, ...updatedResponse };
//     });
//   };

//   const handleCheckAnswer = () => {
//     if (responses.answer === test.question_new[index.count].answer) {
//       result.correct += 1;
//     } else {
//       result.wrong += 1;
//     }
//     index.count += 1;
//     setResponses(defaultResponses);
//     console.log(index.count, "responses . index");
//   };

//   const handleCreateResult = (e) => {
//     e.preventDefault();
//     if (result.correct == 0) {
//       result.correct = "0";
//     } else if (result.wrong == 0) {
//       result.wrong = "0";
//     }
//     result.correct = `${result.correct}`;
//     result.percent =
//       (result.correct / parseInt(test.question_new.length)) * 100;
//     result.percent = `${result.percent}` + "%";
//     result.wrong = `${result.wrong}`;
//     result.time = ` mins`;
//     result.total = "" + test.question_new.length;
//     result.score = `${result.correct}` + " out of " + `${result.total}`;
//     result.the_test = test.id;
//     if (result.correct !== "0" || result.wrong !== "0") {
//       createResult(user, result)
//         .then(() => {
//           msgAlert({
//             heading: "Success",
//             message: "Created Result",
//             variant: "success",
//           });
//         })
//         .then(() => {
//           setOpen(false);
//         })
//         .catch((error) => {
//           msgAlert({
//             heading: "Failure",
//             message: "Create Result Failure" + error,
//             variant: "danger",
//           });
//         });
//     }
//   };

//   if (!test) {
//     return <LoadingScreen />;
//   }

//   const questionsJSX = test.question_new.slice(0).map((question) => (
//     <>
//       <div class="hideMe">
//         <Segment inverted>
//           <Grid centered stretched>
//             <Grid.Row padded>
//               <Segment fluid>
//                 <Grid textAlign="center" columns={4}>
//                   <Grid.Row>
//                     <Grid.Column floated="left" width={10}>
//                       <h2>{question.question_str}</h2>
//                     </Grid.Column>
//                     <Grid.Column width={6}>
//                       <h2>
//                         Question's Answered: {result.correct + result.wrong}
//                       </h2>
//                     </Grid.Column>
//                   </Grid.Row>
//                   <Segment>
//                     <Grid.Column>
//                       <h2>{question.option1}</h2>
//                     </Grid.Column>
//                   </Segment>
//                   <Segment>
//                     <Grid.Column>
//                       <h2>{question.option2}</h2>
//                     </Grid.Column>
//                   </Segment>
//                   <Segment>
//                     <Grid.Column>
//                       <h2>{question.option3}</h2>
//                     </Grid.Column>
//                   </Segment>
//                   <Segment>
//                     <Grid.Column>
//                       <h2>{question.option4}</h2>
//                     </Grid.Column>
//                   </Segment>
//                   <Grid.Row>
//                     <Form onSubmit={handleCheckAnswer}>
//                       <Form.Input
//                         required
//                         name="answer"
//                         placeholder="your answer"
//                         onChange={handleChange}
//                         value={responses.answer}
//                       />
//                       {/* <h3>Save after every question</h3> */}
//                       <Button type="submit" color="green">
//                         Submit Answer
//                       </Button>
//                     </Form>
//                   </Grid.Row>
//                 </Grid>
//               </Segment>
//             </Grid.Row>
//           </Grid>
//         </Segment>
//       </div>
//       <Divider section />
//     </>
//   ));

//   return (
//     <>
//       <Modal
//         onClose={() => setOpen(false)}
//         onOpen={() => setOpen(true)}
//         open={open}
//         trigger={<Button floated="right">Take Test</Button>}
//         size="large"
//         closeOnDimmerClick={false}
//       >
//         <Modal.Content scrolling>
//           <Segment inverted verticalAlign="middle" id="segment">
//             <Segment>
//               <Grid padded textAlign="center">
//                 <h2>{test.name} </h2>
//               </Grid>
//             </Segment>
//             {questionsJSX}
//           </Segment>
//           <Form onSubmit={handleCreateResult}>
//             <Button type="submit" color="green">
//               Submit
//             </Button>

//             {result.correct + result.wrong == 0 ? (
//               <Button
//                 color="red"
//                 floated="right"
//                 onClick={() => setOpen(false)}
//               >
//                 Cancel
//               </Button>
//             ) : null}
//           </Form>
//         </Modal.Content>
//       </Modal>
//     </>
//   );
// };

// export default TestTake;


import React, { useState } from "react";
import { Button, Segment, Grid, Form, Modal } from "semantic-ui-react";
import LoadingScreen from "../shared/LoadingPage";
import { createResult } from "../../api/result";

const TestTake = ({ user, msgAlert, test }) => {
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
    const percentage = Math.round((result.correct / totalQuestions) * 100);
  
    const finalResult = {
      score: `${result.correct} out of ${totalQuestions}`,
      correct: String(result.correct),
      wrong: String(result.wrong),
      total: String(totalQuestions),
      percent: `${percentage}%`,
      time: ` mins`, // Assuming the time is calculated elsewhere
      the_test: String(test.id), // Assuming `test.id` is numeric
    };
  
    createResult(user, finalResult)
      .then(() => {
        msgAlert({
          heading: "Success",
          message: "Result submitted successfully!",
          variant: "success",
        });
        setOpen(false);
      })
      .catch((error) => {
        msgAlert({
          heading: "Error",
          message: "Failed to submit result: " + error.message,
          variant: "danger",
        });
      });
  };
  if (!test) {
    return <LoadingScreen />;
  }

  const currentQuestion = test.question_new[currentQuestionIndex];

  return (
    <>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button floated="right">Take Test</Button>}
        size="large"
        closeOnDimmerClick={false}
      >
        <Modal.Content scrolling>
          <Segment>
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
    {[currentQuestion.option1, currentQuestion.option2, currentQuestion.option3, currentQuestion.option4].map(
      (option, index) => (
        <Form.Radio
          key={index}
          label={option}
          name={`question-${currentQuestionIndex}`}
          value={option}
          checked={answers[currentQuestionIndex] === option}
          onChange={(e, { value }) => setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [currentQuestionIndex]: value,
          }))}
        />
      )
    )}
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
                disabled={currentQuestionIndex === test.question_new.length - 1}
              >
                Next
              </Button>
            </Grid.Column>
          </Grid>
        </Modal.Content>

        <Modal.Actions>
          <Button
            color="red"
            onClick={() => setOpen(false)}
            disabled={result.correct + result.wrong === 0}
          >
            Cancel
          </Button>
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
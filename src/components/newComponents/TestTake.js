import React, { useState } from "react";
import { Button, Segment, Grid, Form, Modal, Divider } from "semantic-ui-react";
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
  const defaultResponses = {
    answer: "",
    index: 0,
  };

  const defaultIndex = {
    count: 0,
  };

  const defaultValue = 1
 
    const [updated, setUpdated] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [open, setOpen] = React.useState(false)
    const [result, setResult] = useState(defaultResult)
    const [responses, setResponses] = useState(defaultResponses)
    const [value, setValue] = useState(defaultValue)
    const [index, setIndex] = useState(defaultIndex)


    const handleChange = (e , target) => {
      setResponses(prevResponse => {
          const { name, value } = target
          const updatedName = name
          let updatedValue = value
          const updatedResponse = { [updatedName]: updatedValue }
<<<<<<< HEAD
          console.log('this is the reponses as you make em', responses)
>>>>>>> 8a48fff (about to refactor)
=======
>>>>>>> 27bdab7 (cleaned up)

//           return { ...prevResponse, ...updatedResponse}
//       })
//   }

<<<<<<< HEAD
//   // const pushIt = (target, i) => {
//   //   for(let i = 0; i < test.question_new.length; i ++){
//   //     if(responses.answers[i]){
//   //       responses.answers[i].splice(i, 1)
//   //       responses.answers[i].push(target.value)
//   //     }
//   //   }
//   // }
//   let index = 0
//   const handleCheckAnswer = () => {
    
//     if((responses.answer) === test.question_new[index].answer){
//       result.correct += 1
//     } else {
//       result.wrong += 1
      
//     }
//     console.log(responses.answer, 'responses.answers 666')
//     console.log(result.correct, 'corrrect')
//     console.log(index, 'index')
//     index += 1

//   }

//   const handleCreateResult = (e) => {
//     // for(let i = 0; i < test.question_new.length; i ++){
//     // console.log(test)}


//     //----------------------------------------------------------------
//     e.preventDefault()




//     // for(let i = 0; i < test.question_new.length; i ++){
      
//     //   if(responses.answers[i] === test.question_new[i].answer){
//     //     result.correct += '1'
//     //   } else {
//     //     result.wrong += '1'
//     //     console.log(responses.answers, 'responses.answers')
//     //     console.log(test.question_new, 'test question')
//     //   }
//     // }
    
    
//     // (parseInt(result.total)/parseInt(result.correct))
//     if(result.correct.length === 0){
//       result.correct = '0'
//     } else if (result.wrong === 0){
//       result.wrong = '0'
//     }
//     result.correct = `${result.correct}`
//     result.percent = (((result.correct)/parseInt(test.question_new.length)) * 100)
//     result.percent = `${result.percent}`+'%'
//     result.wrong = `${result.wrong}`
//     result.time = ` mins` //${countMin}
//     result.total = '' + (test.question_new.length)
//     result.score = `${result.correct}` + ' out of ' + `${result.total}`
//     result.the_test = test.id
//     // console.log(result, 'this be the result')

//     // -------------------------------------------------------------
=======

  const handleCheckAnswer = () => {
    if (responses.answer === test.question_new[index.count].answer) {
      result.correct += 1;
    } else {
      result.wrong += 1;
    }
    index.count += 1;
    setResponses(defaultResponses);
    console.log(index.count, "responses . index");
  };

  const handleCreateResult = (e) => {
    e.preventDefault();
    if (result.correct == 0) {
      result.correct = "0";
    } else if (result.wrong == 0) {
      result.wrong = "0";
    }
    result.correct = `${result.correct}`;
    result.percent =
      (result.correct / parseInt(test.question_new.length)) * 100;
    result.percent = `${result.percent}` + "%";
    result.wrong = `${result.wrong}`;
    result.time = ` mins`;
    result.total = "" + test.question_new.length;
    result.score = `${result.correct}` + " out of " + `${result.total}`;
    result.the_test = test.id;
    if (result.correct !== "0" || result.wrong !== "0") {
      createResult(user, result)
        .then(() => {
          msgAlert({
            heading: "Success",
            message: "Created Result",
            variant: "success",
          });
        })
        .then(() => {
          setOpen(false);
        })
        .catch((error) => {
          msgAlert({
              heading: 'Failure',
              message: 'Create Result Failure' + error,
              variant: 'danger'
          })
      })
    }
}

// handleCancel()


=======
>>>>>>> 27bdab7 (cleaned up)
  if (!test) {
    return (
      <LoadingScreen />
    )
  }
<<<<<<< HEAD
// let minutes = 0
//   const minAdd = () => {
//     minutes += 1
//     console.log(minutes, 'mins')
//     return minutes
>>>>>>> 8a48fff (about to refactor)
// }




//   if (!test) {
//     return (
//       <LoadingScreen />
//     )
//   }
// // let minutes = 0
// //   const minAdd = () => {
// //     minutes += 1
// //     console.log(minutes, 'mins')
// //     return minutes
// // }

//   // const countMin = setInterval(minAdd, 60000)
  
<<<<<<< HEAD
//   const zero = clearInterval()

//   // let value = 1
//   // console.log('right here', responses.answers)

//   // const questionsJSX = test.question_new.slice(0).reverse().map((question) => (
//   const questionsJSX = (test) => {  for (let i = 0; i < test.question_new.length; i++) { 
//     return(
//     <Segment inverted class="capitalize-me">
//             <Grid centered stretched>
//                 <Grid.Row padded>
//                     <Segment fluid>
//                         <Grid textAlign="center" columns={4}>
//                             <Grid.Row >
//                             <h2>{test.question_new[i].question_str}</h2>
//                             </Grid.Row>
//                             <Grid.Column>
//                               <h2>{test.question_new[i].option1}</h2>
//                             </Grid.Column>
//                             <Grid.Column>
//                               <h2>{test.question_new[i].option2}</h2>
//                             </Grid.Column>
//                             <Grid.Column>
//                               <h2>{test.question_new[i].option3}</h2>
//                             </Grid.Column>
//                             <Grid.Column>
//                               <h2>{test.question_new[i].option4}</h2>
//                             </Grid.Column>
//                             <Grid.Row>
//                             <Form onSubmit= { handleCheckAnswer }>
//                             <Form.Input 
//                               required 
//                               name='answer'
//                               id='answer'
//                               placeholder='your answer'
//                               onChange= { handleChange } 
//                               // defaultValue={responses.answer}
//                               value= {responses.answer}
//                             />
//                             <Button type='submit' color='green' >Save</Button>
//                            </Form>
//                             </Grid.Row>
//                         </Grid>
//                     </Segment>
//                 </Grid.Row>
//             </Grid>
//         </Segment>
//     )}}


//   return(
//     <>  
//     <Modal
//             onClose={() => setOpen(false)}
//             onOpen={() => setOpen(true)}
//             open={open}
//             trigger={<Button floated="right" 
//             >Take Test</Button>}
//             size='large'
//         >
//             <Modal.Content scrolling>
=======
  // const zero = clearInterval()

  // let value = 1
  console.log('right here', responses.answer)
=======
>>>>>>> 27bdab7 (cleaned up)

  const questionsJSX = test.question_new.slice(0).map((question) => (

      <>
        <div class='hideMe'>
          <Segment inverted >
            <Grid centered stretched>
              <Grid.Row padded>
                <Segment fluid >
                  <Grid textAlign="center" columns={4}>
                      <Grid.Row >
                        <Grid.Column floated='left' width={10}>
                          <h2>{question.question_str}</h2>
                        </Grid.Column>
                        <Grid.Column width={6}>
                          <h2>Question's Answered: {result.correct + result.wrong}</h2>
                        </Grid.Column>
                      </Grid.Row>
                      <Segment>
                        <Grid.Column>
                          <h2>{question.option1}</h2>
                        </Grid.Column>
                      </Segment>
                      <Segment>
                        <Grid.Column>
                          <h2>{question.option2}</h2>
                        </Grid.Column>
                      </Segment>
                      <Segment>
                        <Grid.Column>
                          <h2>{question.option3}</h2>
                        </Grid.Column>
                      </Segment>
                      <Segment>
                        <Grid.Column>
                          <h2>{question.option4}</h2>
                        </Grid.Column>
                      </Segment>
                      <Grid.Row>
                        <Form onSubmit= { handleCheckAnswer }>
                          <Form.Input 
                            required 
                            name='answer'
                            placeholder='your answer'
                            onChange= { handleChange } 
                            value= {responses.answer}
                          />
                          {/* <h3>Save after every question</h3> */}
                          <Button type='submit' color='green' >Submit Answer</Button>
                        </Form>
                      </Grid.Row>
                  </Grid>
                </Segment>
              </Grid.Row>
            </Grid>
          </Segment>
        </div>
        <Divider section/>
      </>
        
    ))

  return(
    <>  
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button >Take Test</Button>}
        size="large"
        closeOnDimmerClick={false}
      >
        <Modal.Content scrolling>
          <Segment inverted verticalAlign="middle" id="segment">
            <Segment>
              <Grid padded textAlign="center">
                <h2>{test.name} </h2>
              </Grid>
            </Segment>
            {questionsJSX}
          </Segment>
          <Form onSubmit={handleCreateResult}>
            <Button type="submit" color="green">
              Submit
            </Button>

            {result.correct + result.wrong == 0 ? (
              <Button
                color="red"
                floated="right"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            ) : null}
          </Form>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default TestTake
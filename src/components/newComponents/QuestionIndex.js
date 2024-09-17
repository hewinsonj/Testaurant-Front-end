import React, { useState, useEffect } from "react";
import { Segment, Grid } from "semantic-ui-react";
import LoadingScreen from "../shared/LoadingPage";
import { getAllQuestions } from "../../api/question";
import QuestionSegment from "./QuestionSegment";
import AddQuestionModal from "./AddQuestionModal";

const QuestionIndex = ({ user, msgAlert, newQuestion, setNewQuestion }) => {
  const [allQuestions, setAllQuestions] = useState(null);

  useEffect(() => {
    getAllQuestions(user)
      .then((res) => {
        setAllQuestions(res.data.question_news);
      })
      .catch((error) => {
        msgAlert({
          heading: "Error",
          message: "Could not get questions",
          variant: "danger",
        });
      });
  }, []);
  console.log("these are the questions", allQuestions);
  return (
    <>
      <div>
        <Segment raised inverted verticalAlign="middle" fluid>
          <Grid centered textAlign="center">
            <Grid.Column width={10}>
            <Segment raised verticalAlign="middle" textAlign="center" inverted>
              <Grid.Row>
                <AddQuestionModal
                  user={user}
                  msgAlert={msgAlert}
                  setNewQuestion={setNewQuestion}
                />
              </Grid.Row>
              {/* <Grid.Row centered textAlign="center" verticalAlign="middle"> */}
                <h1>All Questions</h1>
              {/* </Grid.Row> */}
              {/* <div className="scrolling-group"> */}
              <Grid columns={2}>
                {allQuestions ? (
                  allQuestions
                    .slice(0)
                    .reverse()
                    .map((question) => (
                      <QuestionSegment
                        key={question.id}
                        question={question}
                        user={user}
                        msgAlert={msgAlert}
                      />
                    ))
                ) : (
                  <LoadingScreen />
                )}
                {/* </div> */}
              </Grid>
              </Segment>
            </Grid.Column>
          </Grid>
        </Segment>
      </div>
    </>
  );
};
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
// //    console.log('these are the questions', allQuestions)
// 	return (
// 		<>
//         <div >
// 		    <Segment 
//                 raised
//                 inverted  
//                 verticalAlign='middle' 
//                 fluid
//             >
//                 <Grid centered textAlign='center'>
//                     <Segment raised verticalAlign='middle' textAlign='center'>
//                         <Grid.Row>
//                             <AddQuestionModal user={user} msgAlert={msgAlert} setNewQuestion={setNewQuestion}/>
//                         </Grid.Row>
//                         <Grid.Row centered textAlign='center' verticalAlign='middle'>
//                             <h1 >All Questions</h1>
//                         </Grid.Row>
//                         <div className='scrolling-group'>
//                             {allQuestions ? 
//                                 allQuestions.slice(0).reverse().map((question) => (
//                                     <QuestionSegment key={question.id} question={question} user={user} msgAlert={msgAlert}/>
//                                 ))
//                             :
//                                 <LoadingScreen />
//                             }
//                         </div>
//                     </Segment>
//                 </Grid>
// 		    </Segment>
//         </div>
// 		</>
// 	)
// };

export default QuestionIndex;

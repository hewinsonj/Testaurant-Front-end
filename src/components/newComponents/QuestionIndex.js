import React, { useState, useEffect } from 'react';
import { Grid, Segment, List, Button } from 'semantic-ui-react';
import { getAllQuestions } from '../../api/question';
import LoadingScreen from '../shared/LoadingPage';
import AddQuestionModal from './AddQuestionModal';
import QuestionUpdateModal from "./QuestionUpdateModal";


const QuestionIndex = ({ user, msgAlert, newQuestion, setNewQuestion }) => {
//   const [allQuestions, setAllQuestions] = useState(null);
  const [allQuestions, setAllQuestions] = useState([]); // instead of null
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  

  useEffect(() => {
    getAllQuestions(user)
      .then(res => {
        setAllQuestions(res.data.question_news);
      })
      .catch(error => {
        msgAlert({
          heading: 'Error',
          message: 'Could not get questions',
          variant: 'danger',
        });
      });
  }, []);

//   if (!allQuestions) return <LoadingScreen />;

  return (
    <Segment raised >
             <AddQuestionModal
              user={user}
              msgAlert={msgAlert}
              setNewQuestion={setNewQuestion}
            />
      <Grid columns={3} divided padded>
        
        {/* Column 1: List of questions */}
        <Grid.Column width={5}>
          <h3>All Questions</h3>
          <List divided selection>
            {allQuestions
              .slice()
              .reverse()
              .map((question) => (
                <List.Item
                  key={question.id}
                  onClick={() => setSelectedQuestion(question)}
                >
                  <List.Content>
                    <List.Header>
  {question.question_str ? `${question.question_str.slice(0, 60)}...` : "No text"}
</List.Header>
                  </List.Content>
                </List.Item>
              ))}
          </List>
        </Grid.Column>

        {/* Column 2: Selected question details */}
        <Grid.Column width={7}>
          {selectedQuestion ? (
            <Segment>
              <h2>{selectedQuestion.question_str}</h2>
              <p>
                <strong>A:</strong> {selectedQuestion.option1}
              </p>
              <p>
                <strong>B:</strong> {selectedQuestion.option2}
              </p>
              <p>
                <strong>C:</strong> {selectedQuestion.option3}
              </p>
              <p>
                <strong>D:</strong> {selectedQuestion.option4}
              </p>
              <p>
                <strong>Correct Answer:</strong> {selectedQuestion.answer}
              </p>
            </Segment>
          ) : (
            <p>Select a question to view details</p>
          )}
        </Grid.Column>

        {/* Column 3: Actions */}
        <Grid.Column width={4}>
          <Segment>
       
            {selectedQuestion && (
              <>
                <QuestionUpdateModal
                question={selectedQuestion}
                user={user}
                msgAlert={msgAlert}
                />
                <Button
                  color="red"
                  fluid
                  style={{ marginTop: '0.5rem' }}
                  onClick={() => console.log('Handle delete')}
                >
                  Delete
                </Button>
              </>
            )}
          </Segment>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default QuestionIndex;
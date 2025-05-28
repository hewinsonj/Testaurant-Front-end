import React, { useState, useEffect } from "react";
import { Grid, Segment, List, Button } from "semantic-ui-react";
import { getAllQuestions } from "../../api/question";
import LoadingScreen from "../shared/LoadingPage";
import AddQuestionModal from "./AddQuestionModal";
import QuestionUpdateModal from "./QuestionUpdateModal";
import SearchList from "./SearchList";

const QuestionIndex = ({ user, msgAlert, newQuestion, setNewQuestion }) => {
  //   const [allQuestions, setAllQuestions] = useState(null);
  const [allQuestions, setAllQuestions] = useState([]); // instead of null
  const [originalQuestions, setOriginalQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    getAllQuestions(user)
      .then((res) => {
        const enrichedQuestions = res.data.question_news.map((q) => {
          const employees = res.data.users || [];
          const owner = employees.find((emp) => emp.id === q.owner);
          return {
            ...q,
            employees,
            creator_name: owner
              ? `${owner.first_name || ""} ${owner.last_name || ""}`
              : "Unknown",
          };
        });
        setAllQuestions(enrichedQuestions);
        setOriginalQuestions(enrichedQuestions);
        setFilteredQuestions(enrichedQuestions);
      })
      .catch((error) => {
        msgAlert({
          heading: "Error",
          message: "Could not get questions",
          variant: "danger",
        });
      });
  }, []);

  //   if (!allQuestions) return <LoadingScreen />;

  return (
    <Segment raised>
      <AddQuestionModal
        user={user}
        msgAlert={msgAlert}
        setNewQuestion={setNewQuestion}
      />
      <Grid columns={3} divided padded>
        {/* Column 1: List of questions */}
        <Grid.Column width={5}>
          <h3>All Questions</h3>
          <SearchList
            data={filteredQuestions}
            onSearch={(val) => {
              const lowerVal = val.toLowerCase();
              const filtered = originalQuestions.filter((q) => {
                const textMatch = q.question_str
                  ?.toLowerCase()
                  .includes(lowerVal);
                const emp = q.employees?.find((e) => e.id === q.owner);
                const empMatch = emp
                  ? `${emp.first_name || ""} ${emp.last_name || ""}`
                      .toLowerCase()
                      .includes(lowerVal)
                  : false;
                return textMatch || empMatch;
              });
              setFilteredQuestions(filtered);
            }}
            onSelect={(question) => setSelectedQuestion(question)}
            searchPlaceholder="Search questions or creator"
            extractLabel={(q) =>
              q.question_str ? `${q.question_str.slice(0, 60)}...` : "No text"
            }
            extractUpdatedAt={(q) => q.updated_at || null}
            extractOwner={(q) => q.creator_name || "Unknown"}
            sortOptions={[
              { key: "updated_at", label: "Last Updated", style: { display: "inline-block", marginRight: "0.5rem" } },
              { key: "creator_name", label: "Creator", style: { display: "inline-block", marginRight: "0.5rem" } },
            ]}
            defaultSortKey="updated_at"
            buttonContainerStyle={{ height: "2.5rem", overflow: "hidden" }}
          />
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
                  style={{ marginTop: "0.5rem" }}
                  onClick={() => console.log("Handle delete")}
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

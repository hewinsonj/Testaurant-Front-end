import { useState, useEffect, useCallback } from "react";
import { Grid, Segment, Button } from "semantic-ui-react";
import { deleteQuestion } from "../../api/question";
import AddQuestionModal from "./AddQuestionModal";
import EditLogModal from "./EditLogModal";
import QuestionUpdateModal from "./QuestionUpdateModal";
import SearchList from "./SearchList";

const QuestionIndex = ({ user, msgAlert, setNewQuestion, employees, getAllQuestions, getAllRestaurants }) => {
  const [originalQuestions, setOriginalQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [logOpen, setLogOpen] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  const reloadQuestions = useCallback(() => {
    return getAllQuestions(user)
      .then((qRes) => {
        const list = qRes?.data?.question_news || [];
        setOriginalQuestions(list);
        setFilteredQuestions(list);
      })
      .catch(() => {
        msgAlert({
          heading: "Error",
          message: "Could not get questions",
          variant: "danger",
        });
      });
  }, [getAllQuestions, user, msgAlert]);

  useEffect(() => {
    reloadQuestions();
  }, [reloadQuestions]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (typeof getAllRestaurants !== 'function') return;
      try {
        const resp = user ? await getAllRestaurants(user) : await getAllRestaurants();
        const list = Array.isArray(resp?.data) ? resp.data : (resp?.data?.restaurants || resp?.data || []);
        if (mounted) setRestaurants(Array.isArray(list) ? list : []);
      } catch (e) {
        if (mounted) setRestaurants([]);
        if (process.env.NODE_ENV !== 'production') {
          console.warn('[QuestionIndex] getAllRestaurants failed', e?.response?.status, e?.response?.data);
        }
      } finally {
      }
    };
    load();
    return () => { mounted = false; };
  }, [user, getAllRestaurants]);

  const getOwnerName = (q) => {
    if (!q) return "Unknown";
    // Questions typically store owner as an id; normalize to id if object
    const ownerId = typeof q.owner === 'object' ? (q.owner?.id ?? q.owner?.pk) : q.owner;
    if (ownerId === null) return "Unknown";

    // Look up the employee in the provided list
    const match = Array.isArray(employees)
      ? employees.find((emp) => String(emp?.id ?? emp?.pk ?? emp?.user?.id) === String(ownerId))
      : null;

    if (match) {
      const first = match.first_name ?? match.firstName ?? match?.user?.first_name ?? match?.user?.firstName ?? '';
      const last  = match.last_name  ?? match.lastName  ?? match?.user?.last_name  ?? match?.user?.lastName  ?? '';
      const full = `${first} ${last}`.trim();
      if (full) return full;
      return match?.email || match?.user?.email || `User #${ownerId}`;
    }

    // Fallbacks if list not available or no match
    if (typeof q.owner === 'object') {
      const first = q.owner?.first_name ?? q.owner?.firstName ?? '';
      const last  = q.owner?.last_name  ?? q.owner?.lastName  ?? '';
      const full = `${first} ${last}`.trim();
      if (full) return full;
      return q.owner?.email || `User #${ownerId}`;
    }

    return `User #${ownerId}`;
  };

  const handleDelete = (questionId) => {
    if (!questionId) return;

    // Optimistically remove from lists
    setOriginalQuestions((prev) => prev.filter((q) => q.id !== questionId));
    setFilteredQuestions((prev) => prev.filter((q) => q.id !== questionId));
    setSelectedQuestion(null);

    deleteQuestion(user, questionId)
      .then(() => {
        msgAlert({
          heading: 'Success',
          message: 'Question deleted.',
          variant: 'success',
        });
      })
      .catch((error) => {
        msgAlert({
          heading: 'Error',
          message: 'Failed to delete question: ' + (error?.message || error),
          variant: 'danger',
        });
      })
      .finally(() => {
        // Authoritative refresh
        reloadQuestions();
      });
  };

  const getRestaurantName = (q) => {
    if (!q) return '';
    let restId = null;
    if (q.restaurant && typeof q.restaurant === 'object') {
      restId = q.restaurant.id ?? q.restaurant.pk ?? null;
    } else if (q.restaurant !== undefined) {
      restId = q.restaurant; // may be number, '', or null
    }
    if (restId === null || restId === '') {
      restId = q.restaurant_id ?? null;
    }
    if (restId === null || restId === '') return 'No Restaurant';
    if (!Array.isArray(restaurants) || restaurants.length === 0) return '';
    const match = restaurants.find((r) => String(r.id) === String(restId));
    if (!match) return `Restaurant #${restId}`;
    return match.city && match.state ? `${match.name} — ${match.city}, ${match.state}` : match.name;
  };

  return (
    <Segment raised>
      <AddQuestionModal
        user={user}
        msgAlert={msgAlert}
        setNewQuestion={setNewQuestion}
        getAllRestaurants={getAllRestaurants}
        onCreated={(newQ) => {

          setOriginalQuestions((prev) => Array.isArray(prev) ? [newQ, ...prev] : [newQ]);
          setFilteredQuestions((prev) => Array.isArray(prev) ? [newQ, ...prev] : [newQ]);
          setSelectedQuestion(newQ);

          // Authoritative refresh from server to sync any computed fields
          reloadQuestions();
        }}
      />
      <Grid columns={3} divided padded>
        {/* Column 1: List of questions */}
        <Grid.Column width={5}>
          <h3>All Questions</h3>
          <SearchList
            getOwnerName={getOwnerName}   
            employeesList={employees}
            data={filteredQuestions}
            onSearch={(val) => {
              const lowerVal = val.toLowerCase();
              const filtered = originalQuestions.filter((q) => {
                const textMatch = q.question_str?.toLowerCase().includes(lowerVal);
                return textMatch;
              });
              setFilteredQuestions(filtered);
            }}
            onSelect={(question) => setSelectedQuestion(question)}
            searchPlaceholder="Search questions"
            inputSize="large"
            inputStyle={{ width: "28rem", maxWidth: "100%" }}
            extractLabel={(q) => {
              const s = q.question_str || '';
              return s.length > 60 ? `${s.slice(0, 60)}…` : (s || 'No text');
            }}
            extractUpdatedAt={(q) => q.updated_at || null}
            // extractOwner={(q) => getOwnerName(q)}
            sortOptions={[
              { key: "updated_at", label: "Last Updated", style: { display: "inline-block", marginRight: "0.5rem" } },
              // { key: "creator", label: "Creator", style: { display: "inline-block", marginRight: "0.5rem" } },
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
              <p><strong>Created by:</strong> {getOwnerName(selectedQuestion)}</p>
              <p><strong>Last Updated:</strong> {new Date(selectedQuestion.updated_at).toLocaleString()}</p>
              <p><strong>Restaurant:</strong> {getRestaurantName(selectedQuestion)}</p>
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
                  getAllRestaurants={getAllRestaurants}
                  
                />
                <Button
                  color="blue"
                  fluid
                  style={{ marginTop: "0.5rem" }}
                  onClick={() => setLogOpen(true)}
                >
                  Show Edit Log
                </Button>
                <EditLogModal
                  open={logOpen}
                  onClose={() => setLogOpen(false)}
                  user={user}
                  itemType="Question"
                  itemId={selectedQuestion?.id}
                />
                <Button
                  color="red"
                  fluid
                  style={{ marginTop: "0.5rem" }}
                  onClick={() => handleDelete(selectedQuestion.id)}
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

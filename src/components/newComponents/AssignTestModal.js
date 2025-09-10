import { useState } from "react";
import {
  Button,
  Modal,
  Header,
  Segment,
  Icon,
  List,
  Form,
  Grid,
} from "semantic-ui-react";
import { updateEmployee } from "../../api/user";

const AssignTestModal = ({ user, employee, tests, msgAlert, allQuestions, onAssigned }) => {
  const [open, setOpen] = useState(false);
  const [selectedTests, setSelectedTests] = useState([]);
  const [hoveredTestId, setHoveredTestId] = useState(null);

  const toggleTestSelection = (testId) => {
    // console.log("Toggling test selection for:", testId);
    setSelectedTests((prevSelected) =>
      prevSelected.includes(testId)
        ? prevSelected.filter((id) => id !== testId)
        : [...prevSelected, testId]
    );
  };

  const handleSubmit = () => {
    // console.log("Submitting selected tests:", selectedTests);
    const updatedFields = { assigned_tests: selectedTests };
    updateEmployee(user, employee.id, updatedFields)
      .then(() => {
        msgAlert({
          heading: "Success",
          message: "Test(s) assigned to employee.",
          variant: "success",
        });
        if (typeof onAssigned === "function") {
          onAssigned(selectedTests);
        }
        setOpen(false);
      })
      .catch((error) => {
        msgAlert({
          heading: "Error",
          message: "Failed to assign test(s): " + error.message,
          variant: "danger",
        });
      });
  };

  // When the modal opens, preselect tests already assigned to the employee.
  const handleOpen = () => {
    // console.log("Modal opened");
    const preselected = employee.assigned_tests.map((test) =>
      typeof test === "object" && test.id ? test.id : test
    );
    // console.log("Preselected tests:", preselected);
    setSelectedTests(preselected);
    setOpen(true);
    // console.log("All questions from parent:", allQuestions);
  };

  const selectedTestDetails = selectedTests.map((id) =>
    tests.find((t) => t.id === id)
  );

  const hoveredTest = tests.find((t) => t.id === hoveredTestId);
  if (hoveredTest) {
    // console.log("Hovered test:", hoveredTest);
  }

  return (
    <Modal
      closeIcon
      open={open}
      trigger={
        <Button fluid color="orange" style={{ marginBottom: "1rem" }}>
          Assign Test
        </Button>
      }
      onClose={() => setOpen(false)}
      onOpen={handleOpen}
      size="large"
    >
      <Header icon="tasks" content={`Assign Test(s) to ${employee.email}`} />
      <Modal.Content>
        <Grid columns={2} divided stackable>
          {/* Left column: Test selection checkboxes */}
          <Grid.Column width={8}>
            <Segment basic>
              <Header as="h4">Select Tests</Header>
              <Form>
                {tests.map((test) => (
                  <Form.Checkbox
                    key={test.id}
                    label={
                      <label>
                        <strong>{test.name}</strong>{" "}
                        <span style={{ color: "gray", fontSize: "0.9em" }}>
                          ({test.question_new?.length || 0} question
                          {test.question_new?.length === 1 ? "" : "s"})
                        </span>
                      </label>
                    }
                    checked={selectedTests.includes(test.id)}
                    onChange={() => toggleTestSelection(test.id)}
                    onMouseEnter={() => {
                      // console.log("Hovering over test:", test.id);
                      setHoveredTestId(test.id);
                    }}
                    // onMouseLeave={() => {
                    //   console.log("Mouse left test:", test.id);
                    //   setHoveredTestId(null);
                    // }}
                  />
                ))}
              </Form>
            </Segment>
          </Grid.Column>

          {/* Right column: Preview panel */}
          <Grid.Column width={8}>
            <Segment
              basic
              color="blue"
              style={{ maxHeight: "440px", overflowY: "auto" }}
            >
              {" "}
              <Header as="h4">Preview Panel</Header>
              {hoveredTest ? (
                <>
                  <Header as="h5" >Test: {hoveredTest.name}</Header>
                  <p>
                    <strong>Questions:</strong>{" "}
                    {hoveredTest.question_new?.length || 0}
                  </p>
                  <List bulleted>
                    {hoveredTest.question_new?.map((qId, idx) => {
                      // console.log("qId is:", qId, "| type:", typeof qId);
                      let question = allQuestions.find((q) => q.id === Number(qId));
                      // console.log(
                      //   "Matching by direct ID => question found:",
                      //   question
                      // );
                      if (!question && qId?.id) {
                        question = allQuestions.find((q) => q.id === Number(qId.id));
                        // console.log(
                        //   "Trying qId.id => question found:",
                        //   question
                        // );
                      }
                      return (
                        <List.Item key={idx}>
                          {question?.question_str || "Loading..."}
                        </List.Item>
                      );
                    })}
                  </List>
                </>
              ) : (
                <p style={{ color: "gray" }}>
                  Hover over a test to preview its questions
                </p>
              )}
            </Segment>
          </Grid.Column>
        </Grid>

        {/* Selected tests summary */}
        {selectedTests.length > 0 && (
          <Segment style={{ marginTop: "2rem" }}>
            <Header as="h4" content="Selected Test(s)" />
            <List divided relaxed>
              {selectedTestDetails.map((test) => (
                <List.Item key={test.id}>
                  <List.Icon
                    name="clipboard list"
                    size="large"
                    verticalAlign="middle"
                  />
                  <List.Content>
                    <List.Header>{test.name}</List.Header>
                    <List.Description>
                      {test.question_new?.length || 0} question(s)
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Segment>
        )}
      </Modal.Content>

      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>
          <Icon name="remove" /> Cancel
        </Button>
        <Button color="green" onClick={handleSubmit}>
          <Icon name="checkmark" /> Assign
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default AssignTestModal;

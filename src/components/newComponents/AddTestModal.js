import React, { useState } from "react";
import {
  Button,
  Segment,
  Grid,
  Label,
  Icon,
  Image,
  Modal,
  Header,
  List,
  Container,
} from "semantic-ui-react";
import AddTest from "./AddTest";
import CreateTest from "./CreateTest";

const AddTestModal = ({
  heading,
  user,
  msgAlert,
  setNewQuestion,
  activeItem,
  onCreated,            // ← NEW
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Grid.Column>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        dimmer="blurring"
        size="small"
        trigger={
          <Button inverted color="green" floated="left">
            Create Test
          </Button>
        }
      >
        <Modal.Header>
          <Grid centered padded>
            Create Test
          </Grid>
        </Modal.Header>
        <Modal.Content scrolling>
          <CreateTest
            user={user}
            setNewQuestion={setNewQuestion}
            msgAlert={msgAlert}
            activeItem={activeItem}
            setOpen={setOpen}
            onCreated={onCreated}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </Grid.Column>
  );
};

export default AddTestModal;

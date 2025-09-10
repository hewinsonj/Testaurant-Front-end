import React, { useState } from "react";
import {
  Button,
  Grid,
  Modal,
} from "semantic-ui-react";
import CreateTest from "./CreateTest";

const AddTestModal = ({
  heading,
  user,
  msgAlert,
  setNewQuestion,
  activeItem,
  onCreated, 
  getAllRestaurants           // ← NEW
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
            getAllRestaurants={getAllRestaurants}
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

import React, { useState } from "react";
import { Button, Grid, Modal } from "semantic-ui-react";
import CreateFood from "./CreateFood";

const AddFoodModal = ({ user, msgAlert, setNewFood, activeItem, onCreated }) => {
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
            Create Food Item
          </Button>
        }
      >
        <Modal.Header>
          <Grid centered padded>
            Create Food Item
          </Grid>
        </Modal.Header>
        <Modal.Content scrolling>
          <CreateFood
            user={user}
            setNewFood={setNewFood}
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

export default AddFoodModal;

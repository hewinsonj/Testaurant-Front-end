import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../api/auth";
import messages from "../shared/AutoDismissAlert/messages";
import { Segment, Form, Container } from "semantic-ui-react";

const ChangePassword = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();

  const onChangePassword = (event) => {
    event.preventDefault();

    const { msgAlert, user } = props;
    const passwords = { oldPassword, newPassword, password_confirmation };

    changePassword(passwords, user)
      .then(() =>
        msgAlert({
          heading: "Change Password Success",
          message: messages.changePasswordSuccess,
          variant: "success",
        })
      )
      .then(() => navigate("/"))
      .catch((error) => {
        setOldPassword("");
        setNewPassword("");
        setPasswordConfirmation("");
        msgAlert({
          heading: "Change Password Failed with error: " + error.message,
          message: messages.changePasswordFailure,
          variant: "danger",
        });
      });
  };

  return (
    <div>
      <Container id="container">
        <Segment
          padded="very"
          inverted
          color="grey"
          verticalAlign="middle"
          id="segment"
        >
          <h3 id="signOutText">Change Password</h3>
          <Form onSubmit={onChangePassword}>
            <Form.Field>
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                required
                type="password"
                name="oldPassword"
                value={oldPassword}
                placeholder="Current Password"
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </Form.Field>
            <br />
            <Form.Field>
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                required
                name="newPassword"
                value={newPassword}
                type="password"
                placeholder="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Field>
            <br />
            <Form.Field>
              <Form.Input
                fluid
                icon="check"
                iconPosition="left"
                required
                name="password_confirmation"
                value={password_confirmation}
                type="password"
                placeholder="Confirm New Password"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </Form.Field>
            <br />
            <Form.Button
              secondary
              inverted
              color="orange"
              class="signButton"
              type="submit"
            >
              Submit
            </Form.Button>
          </Form>
        </Segment>
      </Container>
    </div>
  );
};

export default ChangePassword;

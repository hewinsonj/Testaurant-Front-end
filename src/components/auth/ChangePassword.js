import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../api/auth";
import messages from "../shared/AutoDismissAlert/messages";
import { Segment, Form, Container } from "semantic-ui-react";

const ChangePassword = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const { msgAlert, user } = props;
  const isGuest = user?.email === "guestemployee@gmail.com" || user?.email === "guestmanager@gmail.com";
  const navigate = useNavigate();

  const onChangePassword = (event) => {
    event.preventDefault();


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
  {isGuest && (
    <p style={{ color: "orange", marginBottom: "1rem" }}>
      Guest users cannot change their password.
    </p>
  )}
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
      disabled={isGuest}
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
      disabled={isGuest}
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
      disabled={isGuest}
    />
  </Form.Field>
  <br />
  <Form.Button
    secondary
    inverted
    color="orange"
    className="signButton"
    type="submit"
    disabled={isGuest}
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

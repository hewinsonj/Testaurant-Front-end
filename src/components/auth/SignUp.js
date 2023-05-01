import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp, signIn } from "../../api/auth";
import messages from "../shared/AutoDismissAlert/messages";
import { Grid, Segment, Form, Container } from "semantic-ui-react";

// const options = [
//   { key: "g", text: "General", value: "general" },
//   { key: "a", text: "Admin", value: "admin" },
// ];

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const onSignUp = (event) => {
    event.preventDefault();

    const { msgAlert, setUser } = props;
    const credentials = { email, password, password_confirmation };

    signUp(credentials)
      .then(() => signIn(credentials))
      .then((res) => setUser(res.data.user))
      .then(() =>
        msgAlert({
          heading: "Sign Up Success",
          message: messages.signUpSuccess,
          variant: "success",
        })
      )
      .then(() => navigate("/user-page"))
      .catch((error) => {
        setEmail("");
        setUsername("");
        setPassword("");
        setPasswordConfirmation("");
        msgAlert({
          heading: "Sign Up Failed with error: " + error.message,
          message: messages.signUpFailure,
          variant: "danger",
        });
      });
  };

  return (
    <div>
      <Container id="container">
        <Segment inverted color="grey" verticalAlign="middle" id="segment">
          <h3>Sign Up</h3>
          <Form onSubmit={onSignUp}>
            <Grid columns={2}>
              <Grid.Column>
                <Form.Field>
                  <br />
                  <br />
                  <Form.Field>
                    <Form.Input
                      fluid
                      type="email"
                      name="email"
                      value={email}
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                  </Form.Field>
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    name="password"
                    value={password}
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <br />
                  <Form.Input
                    fluid
                    icon="check"
                    iconPosition="left"
                    placeholder="Confirm Password"
                    name="passwordConfirmation"
                    value={password_confirmation}
                    type="password"
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid>
            <br />
            <Form.Button
              color="orange"
              class="signButton"
              type="submit"
              centered
              textAlign="center"
              verticalAlign="middle"
            >
              Submit
            </Form.Button>
          </Form>
        </Segment>
      </Container>
    </div>
  );
};

export default SignUp;

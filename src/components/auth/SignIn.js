import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../api/auth";
import messages from "../shared/AutoDismissAlert/messages";
import { Segment, Form, Container } from "semantic-ui-react";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSignIn = (event) => {
    event.preventDefault();

    const { msgAlert, setUser, activeItem } = props;
    const credentials = { email, password };

    signIn(credentials)
      .then((res) => setUser(res.data.user))
      .then(() => navigate("/results"))
      .then(() => activeItem === "testaurant")
      .catch((error) => {
        setEmail("");
        setPassword("");
        msgAlert({
          heading: "Sign In Failed with error: " + error.message,
          message: messages.signInFailure,
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
          <h3>Sign In</h3>
          <Form onSubmit={onSignIn}>
            <Form.Field>
              <Form.Input
                fluid
                icon="users"
                iconPosition="left"
                required
                type="email"
                name="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Field>
            <br />
            <Form.Field>
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                required
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Field>
            <br />
            <Form.Button color="orange" class="signButton" type="submit">
              Submit
            </Form.Button>
          </Form>
        </Segment>
      </Container>
    </div>
  );
};

export default SignIn;

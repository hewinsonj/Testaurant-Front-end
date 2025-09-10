import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signUp, signIn } from "../../api/auth";
import messages from "../shared/AutoDismissAlert/messages";
import { Grid, Segment, Form, Container } from "semantic-ui-react";
import { getAllRestaurants } from "../../api/restaurant";


const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [restaurantId, setRestaurantId] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  const navigate = useNavigate();

  const { msgAlert, setUser = [], user } = props;

  useEffect(() => {
  getAllRestaurants(user)
    .then((res) => {
      const list = res?.data?.restaurants ?? res?.data?.results ?? res?.data ?? [];
      setRestaurants(Array.isArray(list) ? list : []);
    })
    .catch((err) => {
      console.warn('[SignUp] failed to load restaurants', err);
      setRestaurants([]);
    });
}, [user]);

  const onSignUp = (event) => {
    event.preventDefault();

    // Client-side check: ensure the password fields match
    if (password !== password_confirmation) {
      msgAlert({
        heading: "Sign Up Error",
        message: "Passwords do not match",
        variant: "danger",
      });
      return;
    }

    // Build the credentials payload expected by the backend.
    // Note that we omit the password confirmation since the serializer does not expect it.
    const credentials = {
      email,
      password,
      password_confirmation,
      first_name: firstName,
      last_name: lastName,
      role, // should be one of: 'Admin','GeneralManager','Manager','Employee'
      hire_date: hireDate || null,
      restaurant: restaurantId || null,
    };

    // console.log("Attempting to sign up with credentials:", credentials);

    signUp(credentials)
      .then(() => signIn(credentials))
      .then((res) => {
        // console.log("Sign in response:", res.data);
        setUser(res.data.user);
      })
      .then(() =>
        msgAlert({
          heading: "Sign Up Success",
          message: messages.signUpSuccess,
          variant: "success",
        })
      )
      .then(() => navigate("/user-page"))
      .catch((error) => {
        console.error("Error during sign up:", error.response || error);
        // Clear the fields so the user can try again
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
        setFirstName("");
        setLastName("");
        setRole("");
        setHireDate("");
        setRestaurantId("");
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
        <Segment inverted color="grey" id="segment">
          <h3>Sign Up</h3>
          <Form onSubmit={onSignUp}>
            <Grid columns={2}>
              <Grid.Column>
                <Form.Input
                  fluid
                  label="Email"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="Password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  value={password}
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="Confirm Password"
                  icon="check"
                  iconPosition="left"
                  name="passwordConfirmation"
                  value={password_confirmation}
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
              </Grid.Column>

              <Grid.Column>
                <Form.Input
                  fluid
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <Form.Field>
                  <label>Role</label>
                  <Form.Group inline>
                    <Form.Radio
                      label="Admin"
                      name="role"
                      value="Admin"
                      checked={role === "Admin"}
                      onChange={(e, { value }) => setRole(value)}
                    />
                    <Form.Radio
                      label="General Manager"
                      name="role"
                      value="GeneralManager"
                      checked={role === "GeneralManager"}
                      onChange={(e, { value }) => setRole(value)}
                    />
                    <Form.Radio
                      label="Manager"
                      name="role"
                      value="Manager"
                      checked={role === "Manager"}
                      onChange={(e, { value }) => setRole(value)}
                    />
                    <Form.Radio
                      label="Employee"
                      name="role"
                      value="Employee"
                      checked={role === "Employee"}
                      onChange={(e, { value }) => setRole(value)}
                    />
                  </Form.Group>
                </Form.Field>
                <Form.Select
                  fluid
                  clearable
                  label="Restaurant"
                  placeholder="Select a restaurant (optional)"
                  name="restaurant"
                  value={restaurantId}
                  onChange={(e, { value }) => setRestaurantId(value)}
                  options={[
                    { key: 'none', text: 'None', value: '' },
                    ...(restaurants || []).map((r) => ({ key: r.id, text: r.name, value: r.id })),
                  ]}
                />
                <Form.Input
                  fluid
                  label="Hire Date"
                  type="date"
                  value={hireDate}
                  onChange={(e) => setHireDate(e.target.value)}
                />
              </Grid.Column>
            </Grid>

            <br />
            <Form.Button color="orange" type="submit" className="signButton">
              Submit
            </Form.Button>
          </Form>
        </Segment>
      </Container>
    </div>
  );
};

export default SignUp;

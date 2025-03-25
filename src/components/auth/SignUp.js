// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signUp, signIn } from "../../api/auth";
// import messages from "../shared/AutoDismissAlert/messages";
// import { Grid, Segment, Form, Container } from "semantic-ui-react";

// // const options = [
// //   { key: "g", text: "General", value: "general" },
// //   { key: "a", text: "Admin", value: "admin" },
// // ];

// const SignUp = (props) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [password_confirmation, setPasswordConfirmation] = useState("");
//   const [username, setUsername] = useState("");

//   const navigate = useNavigate();

//   const onSignUp = (event) => {
//     event.preventDefault();

//     const { msgAlert, setUser } = props;
//     const credentials = { email, password, password_confirmation };

//     signUp(credentials)
//       .then(() => signIn(credentials))
//       .then((res) => setUser(res.data.user))
//       .then(() =>
//         msgAlert({
//           heading: "Sign Up Success",
//           message: messages.signUpSuccess,
//           variant: "success",
//         })
//       )
//       .then(() => navigate("/user-page"))
//       .catch((error) => {
//         setEmail("");
//         setUsername("");
//         setPassword("");
//         setPasswordConfirmation("");
//         msgAlert({
//           heading: "Sign Up Failed with error: " + error.message,
//           message: messages.signUpFailure,
//           variant: "danger",
//         });
//       });
//   };

//   return (
//     <div>
//       <Container id="container">
//         <Segment inverted color="grey" verticalAlign="middle" id="segment">
//           <h3>Sign Up</h3>
//           <Form onSubmit={onSignUp}>
//             <Grid columns={2}>
//               <Grid.Column>
//                 <Form.Field>
//                   <br />
//                   <br />
//                   <Form.Field>
//                     <Form.Input
//                       fluid
//                       type="email"
//                       name="email"
//                       value={email}
//                       placeholder="Enter your email"
//                       onChange={(e) => setEmail(e.target.value)}
//                     />
//                     <br />
//                   </Form.Field>
//                   <Form.Input
//                     fluid
//                     icon="lock"
//                     iconPosition="left"
//                     name="password"
//                     value={password}
//                     type="password"
//                     placeholder="Password"
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                   <br />
//                   <Form.Input
//                     fluid
//                     icon="check"
//                     iconPosition="left"
//                     placeholder="Confirm Password"
//                     name="passwordConfirmation"
//                     value={password_confirmation}
//                     type="password"
//                     onChange={(e) => setPasswordConfirmation(e.target.value)}
//                   />
//                 </Form.Field>
//               </Grid.Column>
//             </Grid>
//             <br />
//             <Form.Button
//               color="orange"
//               class="signButton"
//               type="submit"
//               centered
//               textAlign="center"
//               verticalAlign="middle"
//             >
//               Submit
//             </Form.Button>
//           </Form>
//         </Segment>
//       </Container>
//     </div>
//   );
// };

// export default SignUp;


import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signUp, signIn } from "../../api/auth"
import messages from "../shared/AutoDismissAlert/messages"
import { Grid, Segment, Form, Container } from "semantic-ui-react"

const SignUp = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password_confirmation, setPasswordConfirmation] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [role, setRole] = useState("")
  const [hireDate, setHireDate] = useState("")

  const navigate = useNavigate()

  const onSignUp = (event) => {
    event.preventDefault()

    const { msgAlert, setUser } = props
    const credentials = {
      email,
      password,
      password_confirmation,
      first_name: firstName,
      last_name: lastName,
      role,
      hire_date: hireDate || null,
      is_superuser: true,     // 👈 Hidden flag
      is_active: true,         // 👈 Hidden flag
      is_staff: true,
    }

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
        setEmail("")
        setPassword("")
        setPasswordConfirmation("")
        setFirstName("")
        setLastName("")
        setRole("")
        setHireDate("")
        msgAlert({
          heading: "Sign Up Failed with error: " + error.message,
          message: messages.signUpFailure,
          variant: "danger",
        })
      })
  }

  return (
    <div>
      <Container id="container">
        <Segment inverted color="grey" verticalAlign="middle" id="segment">
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
                <Form.Input
                  fluid
                  label="Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
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
  )
}

export default SignUp
import { useNavigate } from "react-router-dom";
import { Segment, Container, Button } from "semantic-ui-react";
import { signOut } from "../../api/auth";
import messages from "../shared/AutoDismissAlert/messages";

const SignOut = (props) => {
  const { msgAlert, clearUser, user } = props;

  const navigate = useNavigate();

  const onSignOut = () => {
    signOut(user)
      .finally(() =>
        msgAlert({
          heading: "Signed Out Successfully",
          message: messages.signOutSuccess,
          variant: "success",
        })
      )
      .finally(() => navigate("/"))
      .finally(() => clearUser());
  };

  const onCancel = () => {
    navigate("/");
  };

  console.log(user);
  return (
    <>
      <div>
        <Container id="container">
          <Segment
            padded="very"
            inverted
            color="grey"
            verticalAlign="middle"
            id="segment"
          >
            <h3 id="signOutText">Are you sure you want to sign out?</h3>
            <Button color="orange" onClick={onSignOut}>
              Sign Out
            </Button>
            <Button color="orange" onClick={onCancel}>
              Stay
            </Button>
          </Segment>
        </Container>
      </div>
    </>
  );
};

export default SignOut;

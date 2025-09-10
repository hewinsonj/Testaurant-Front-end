import { Segment, Grid } from "semantic-ui-react";
import QuestionShow from "./QuestionShow";

const QuestionSegment = ({ question, msgAlert, user }) => {
  return (
    <Grid.Column>
      <Segment id="actListItems" textAlign="center" >
        <Grid centered verticalAlign="middle" textAlign="center" padded>
          <Grid.Row>
            <h2>{question.question_str}</h2>
          </Grid.Row>
            <Grid padded>
              <QuestionShow
                question={question}
                user={user}
                msgAlert={msgAlert}
              />
            </Grid>
        </Grid>
      </Segment>
    </Grid.Column>
  );
};

export default QuestionSegment;

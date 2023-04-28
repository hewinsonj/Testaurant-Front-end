import React from "react";
import { Segment, Grid } from "semantic-ui-react";
import QuestionShow from "./QuestionShow";

const QuestionSegment = ({ question, msgAlert, user }) => {
  return (
    <Segment id="actListItems" textAlign="center">
      <Grid>
        <Grid.Row>
          <h2>{question.question_str}</h2>
          <QuestionShow question={question} user={user} msgAlert={msgAlert} />
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default QuestionSegment;

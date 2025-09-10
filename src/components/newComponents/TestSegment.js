import { Segment, Grid } from "semantic-ui-react";
import TestShow from "./TestShow";
import TestTake from "./TestTake";

const TestSegment = ({ test, msgAlert, user, allQuestions}) => {
    
    return (
        <Grid.Column>
         <Segment id='actListItems' textAlign='center'>
                <Grid centered verticalAlign='middle' textAlign='center' padded>
                    <Grid.Row>
                        <h2>Test name: {test.name}</h2>
                        <h2>Created: {test.created_at}</h2>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <TestShow  test={test} user={user} msgAlert={msgAlert} allQuestions={allQuestions}/>
                        </Grid.Column>
                        <Grid.Column>
                            <TestTake  test={test} user={user} msgAlert={msgAlert} allQuestions={allQuestions}/>
                        </Grid.Column>
                    </Grid.Row>
                
                </Grid>

        </Segment>
        </Grid.Column>
    )
}

export default TestSegment;

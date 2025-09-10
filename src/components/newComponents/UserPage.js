import { useState, useEffect } from "react";
import { Divider, Segment, Grid } from "semantic-ui-react";
import { getAllResults } from "../../api/result";
import { getAllTests } from "../../api/test";
import LoadingScreen from "../shared/LoadingPage";
import ResultsSegment from "./ResultsSegment";
import ChangePasswordModal from "./ChangePasswordModal";

const UserPage = ({ user, msgAlert }) => {
  const [allResults, setAllResults] = useState([]);
  const [allTests, setAllTests] = useState([]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await getAllResults(user);
        if (!cancelled) {
          setAllResults(res.data.results);
        }
      } catch (error) {
        msgAlert({
          heading: "Error",
          message: "Could not get Results",
          variant: "danger",
        });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, msgAlert]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await getAllTests(user);
        if (!cancelled) {
          setAllTests(res.data.test_thiss);
        }
      } catch (error) {
        msgAlert({
          heading: "Error",
          message: "Could not get tests",
          variant: "danger",
        });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, msgAlert]);

  return (
    <>
      <div>
        <Segment raised inverted color="black" fluid>
          <Divider />
          <Grid columns={3}>
            <Grid.Column width={3}>
              <ChangePasswordModal user={user} msgAlert={msgAlert} />
            </Grid.Column>
            <Grid.Column width={11}>
              <Segment>
                <h2 id="yourActs">Your Results</h2>
              </Segment>
              <Segment color="grey" inverted>
                {allResults ? (
                  allResults
                    .slice(0)
                    .reverse()
                    .filter((result) => result.owner === user.id)
                    .map((result) => (
                      <ResultsSegment
                        key={result.id}
                        result={result}
                        user={user}
                        msgAlert={msgAlert}
                        allTests={allTests}
                      />
                    ))
                ) : (
                  <LoadingScreen />
                )}
              </Segment>
            </Grid.Column>
          </Grid>
        </Segment>
      </div>
    </>
  );
};

export default UserPage;

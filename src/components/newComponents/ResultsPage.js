import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Segment, Grid, Feed, Icon, Image, Progress, Modal, Container} from "semantic-ui-react";
import LoadingScreen from "../shared/LoadingPage";
import { getAllResults } from "../../api/result";
import { getAllTests } from "../../api/test";
import ResultsSegment from "./ResultsSegment";

const ResultsPage = ({ user, msgAlert, newTest, setNewTest }) => {
  const [allResults, setAllResults] = useState(null);
  const [allTests, setAllTests] = useState(null);

  useEffect(() => {
    getAllResults(user)
      .then((res) => {
        setAllResults(res.data.results);
      })
      .catch((error) => {
        msgAlert({
          heading: "Error",
          message: "Could not get Results",
          variant: "danger",
        });
      });
  }, []);

  useEffect(() => {
    getAllTests(user)
      .then((res) => {
        setAllTests(res.data.test_thiss);
      })
      .then(() => {
        console.log(allTests, "ALL TESTS");
      })

      
      .catch((error) => {
        msgAlert({
          heading: "Error",
          message: "Could not get tests",
          variant: "danger",
        });
      });
  }, []);


  // useEffect(() => {
  //   // Function to fetch both results and tests
  //   const fetchData = async () => {
  //     try {
  //       // Fetch all results
  //       const resultsResponse = await getAllResults(user);
  //       setAllResults(resultsResponse.data.results);
  
  //       // Fetch all tests
  //       const testsResponse = await getAllTests(user);
  //       setAllTests(testsResponse.data.test_thiss);
        
  //     } catch (error) {
  //       msgAlert({
  //         heading: "Error",
  //         message: "Could not get data",
  //         variant: "danger",
  //       });
  //     }
  //   };
  
    // Call the fetch function
  //   fetchData();
  // }, [user, msgAlert]);

  return (
    <>
      <div>
        <Segment raised color="black" inverted>
          <Grid centered>
            <Segment raised color="grey" inverted>
              <h1 id="commFeed">All Results</h1>
              <div className="scrolling-group">
                {allResults ? (
                  allResults
                    .slice(0)
                    .reverse()
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
                  <LoadingScreen/>
                )}
              </div>
            </Segment>
          </Grid>
        </Segment>
      </div>
    </>
  );
};

export default ResultsPage;

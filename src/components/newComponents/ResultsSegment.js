// import React, { useState, useEffect } from "react";
// import { Segment, Grid } from "semantic-ui-react";
// import { getAllTests } from "../../api/test";
// import LoadingScreen from "../shared/LoadingPage";

// const ResultsSegment = ({ result, msgAlert, user, allTests}) => {

// //   const [allTests, setAllTests] = useState([]);

// //   useEffect(() => {
// //     getAllTests(user)
// //       .then((res) => {
// //         setAllTests(res.data.test_thiss);
// //       })
// //       .catch((error) => {
// //         msgAlert({
// //           heading: "Error",
// //           message: "Could not get tests",
// //           variant: "danger",
// //         });
// //       });
// //   }, []);
// // console.log(allTests,"alllll tests")

//   const findString = (result) => {
//     for (let i = 0; i < allTests.length; i++) {
//       if (result.the_test == allTests[i].id) {
//         return <h1>{allTests[i].name}</h1>;
//       }
//     }
//   };

//   if (!allTests) {
//     // Display loading screen while `allTests` is being fetched
//     return <LoadingScreen />;
//   }
//   return (
//     <Segment id="actListItems" textAlign="center">
//       <Grid centered textAlign="center" columns={3}>
//         {result ? findString(result, allTests) : <LoadingScreen />}
//         <Grid.Row centered textAlign="center">
//           <Grid.Column textAlign="center">
//             <h2>Correct: {result.correct}</h2>
//             <h2>Wrong: {result.wrong}</h2>
//           </Grid.Column>
//           <Grid.Column textAlign="center">
//             <h2>{result.score} Correct</h2>
//             <h2>Taken on: {result.created_at}</h2>
//           </Grid.Column>
//           <Grid.Column textAlign="center">
//             <h2>Percent: {result.percent}</h2>
//             <h2>Total Questions: {result.total}</h2>
//           </Grid.Column>
//         </Grid.Row>
//       </Grid>
//     </Segment>
//   );
// };

// export default ResultsSegment;
import React from "react";
import { Segment, Grid } from "semantic-ui-react";
import LoadingScreen from "../shared/LoadingPage";

const ResultsSegment = ({ result, msgAlert, user, allTests }) => {
  
  // Check if allTests is available and has content
  const findString = (result) => {
    if (!allTests || allTests.length === 0) {
      return <h1>Test not found</h1>; // Handle case where no tests are found
    }

    // Iterate through allTests to find the matching test name
    for (let i = 0; i < allTests.length; i++) {
      if (result.the_test === allTests[i].id) {
        return <h1>{allTests[i].name}</h1>;
      }
    }

    return <h1>Test not found</h1>; // Return this if no match is found
  };

  // // Show loading screen if allTests is still loading
  // if (!allTests) {
  //   return <LoadingScreen />;
  // }

  return (
    <Segment id="actListItems" textAlign="center">
      <Grid centered textAlign="center" columns={3}>
        {result ? findString(result) : <LoadingScreen />}
        <Grid.Row centered textAlign="center">
          <Grid.Column textAlign="center">
            <h2>Correct: {result.correct}</h2>
            <h2>Wrong: {result.wrong}</h2>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <h2>{result.score} Correct</h2>
            <h2>Taken on: {result.created_at}</h2>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <h2>Percent: {result.percent}</h2>
            <h2>Total Questions: {result.total}</h2>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default ResultsSegment;
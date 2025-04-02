// // // import React, { useState, useEffect } from "react";
// // // import { Segment, Grid } from "semantic-ui-react";
// // // import { getAllTests } from "../../api/test";
// // // import LoadingScreen from "../shared/LoadingPage";

// // // const ResultsSegment = ({ result, msgAlert, user, allTests}) => {

// // // //   const [allTests, setAllTests] = useState([]);

// // // //   useEffect(() => {
// // // //     getAllTests(user)
// // // //       .then((res) => {
// // // //         setAllTests(res.data.test_thiss);
// // // //       })
// // // //       .catch((error) => {
// // // //         msgAlert({
// // // //           heading: "Error",
// // // //           message: "Could not get tests",
// // // //           variant: "danger",
// // // //         });
// // // //       });
// // // //   }, []);
// // // // console.log(allTests,"alllll tests")

// // //   const findString = (result) => {
// // //     for (let i = 0; i < allTests.length; i++) {
// // //       if (result.the_test == allTests[i].id) {
// // //         return <h1>{allTests[i].name}</h1>;
// // //       }
// // //     }
// // //   };

// // //   if (!allTests) {
// // //     // Display loading screen while `allTests` is being fetched
// // //     return <LoadingScreen />;
// // //   }
// // //   return (
// // //     <Segment id="actListItems" textAlign="center">
// // //       <Grid centered textAlign="center" columns={3}>
// // //         {result ? findString(result, allTests) : <LoadingScreen />}
// // //         <Grid.Row centered textAlign="center">
// // //           <Grid.Column textAlign="center">
// // //             <h2>Correct: {result.correct}</h2>
// // //             <h2>Wrong: {result.wrong}</h2>
// // //           </Grid.Column>
// // //           <Grid.Column textAlign="center">
// // //             <h2>{result.score} Correct</h2>
// // //             <h2>Taken on: {result.created_at}</h2>
// // //           </Grid.Column>
// // //           <Grid.Column textAlign="center">
// // //             <h2>Percent: {result.percent}</h2>
// // //             <h2>Total Questions: {result.total}</h2>
// // //           </Grid.Column>
// // //         </Grid.Row>
// // //       </Grid>
// // //     </Segment>
// // //   );
// // // };

// // // export default ResultsSegment;
// // import React from "react";
// // import { Segment, Grid } from "semantic-ui-react";
// // import LoadingScreen from "../shared/LoadingPage";

// // const ResultsSegment = ({ result, msgAlert, user, allTests }) => {
  
// //   // Check if allTests is available and has content
// //   const findString = (result) => {
// //     if (!allTests || allTests.length === 0) {
// //       return <h1>Test not found</h1>; // Handle case where no tests are found
// //     }

// //     // Iterate through allTests to find the matching test name
// //     for (let i = 0; i < allTests.length; i++) {
// //       if (result.the_test === allTests[i].id) {
// //         return <h1>{allTests[i].name}</h1>;
// //       }
// //     }

// //     return <h1>Test not found</h1>; // Return this if no match is found
// //   };

// //   // // Show loading screen if allTests is still loading
// //   // if (!allTests) {
// //   //   return <LoadingScreen />;
// //   // }

// //   return (
// //     <Segment id="actListItems" textAlign="center">
// //       <Grid centered textAlign="center" columns={3}>
// //         {result ? findString(result) : <LoadingScreen />}
// //         <Grid.Row centered textAlign="center">
// //           <Grid.Column textAlign="center">
// //             <h2>Correct: {result.correct}</h2>
// //             <h2>Wrong: {result.wrong}</h2>
// //           </Grid.Column>
// //           <Grid.Column textAlign="center">
// //             <h2>{result.score} Correct</h2>
// //             <h2>Taken on: {result.created_at}</h2>
// //           </Grid.Column>
// //           <Grid.Column textAlign="center">
// //             <h2>Percent: {result.percent}</h2>
// //             <h2>Total Questions: {result.total}</h2>
// //           </Grid.Column>
// //         </Grid.Row>
// //       </Grid>
// //     </Segment>
// //   );
// // };

// // export default ResultsSegment;

// import React from "react"
// import { Segment, Header, Divider, Label } from "semantic-ui-react"

// const ResultsSegment = ({ result, allTests }) => {
//   const getTestName = (testId) => {
//     if (!Array.isArray(allTests)) return "Unknown Test"
//     const match = allTests.find((test) => test.id === testId)
//     return match ? match.name : "Unknown Test"
//   }

//   return (
//     <Segment padded="very" raised>
//       <Label ribbon="true"  color="black">
//     Test: {getTestName(result.the_test)}
//  </Label>
//  {getTestName(result.the_test)}
//       <Divider />

//       <Header as="h3" style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
//         Test Stats
//       </Header>
//       <p style={{ fontSize: "1.25rem" }}><strong>Correct:</strong> {result.correct}</p>
//       <p style={{ fontSize: "1.25rem" }}><strong>Wrong:</strong> {result.wrong}</p>
//       <p
//   style={{
//     fontSize: "2rem",
//     float: "right",
//     fontWeight: "bold",
//     marginBottom: "1rem",
//     color:
//       result.score < 70
//         ? "red"
//         : result.score < 80
//         ? "goldenrod"
//         : result.score < 90
//         ? "green"
//         : "dodgerblue",
//   }}
// >
//   Score: {result.percent}<div style={{ clear: "both", marginBottom: "1.5rem" }}></div>

// </p>
//       <p style={{ fontSize: "1.25rem" }}><strong>Score:</strong> {result.score}</p>
//       <p style={{ fontSize: "1.25rem" }}><strong>Total Questions:</strong> {result.total}</p>

//       <Divider />

//       <p style={{ fontSize: "1.1rem", color: "#888", marginTop: "1rem" }}>
//         <strong>Taken On:</strong> {new Date(result.created_at).toLocaleString()}
//       </p>
//     </Segment>
//   )
// }

// export default ResultsSegment

import React, { useState, useEffect } from "react";

import { Segment, Header, Divider, Label } from "semantic-ui-react"

const ResultsSegment = ({ result, allTests, employees, setOwnerName }) => {
  const getTestName = (testId) => {
    const match = allTests.find((test) => test.id === testId)
    return match ? match.name : "Unknown Test"
  }

  const getOwnerEmail = (ownerId) => {
    const match = employees.find((emp) => emp.id === ownerId)
    return match ? match.email : "Unknown User Email"
  }

  const getOwnerFullName = (ownerId) => {
    const match = employees.find((emp) => emp.id === ownerId)
    if (!match) return "Unknown User"
    return `${match.first_name || ""} ${match.last_name || ""}`.trim()
  }


  useEffect(() => {
    if (result && employees && employees.length > 0) {
      const owner = employees.find((emp) => emp.id === result.owner);
      const fullName = owner ? `${owner.first_name} ${owner.last_name}` : "";
      if (setOwnerName) {
        setOwnerName(fullName);
      }
    }
  }, [result, employees, setOwnerName]);


  return (
    <Segment raised>
      <Label ribbon color="black" size="huge">
        Test: {getTestName(result.the_test)}
      </Label>
      <Header as="h4" testAlign="right" color="grey" size="small">
        Taken by: {getOwnerFullName(result.owner)} 
        <Divider></Divider>
        Email: {getOwnerEmail(result.owner)}
      </Header>

      <Divider />

      <Header as="h3" style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
        Test Stats
      </Header>
      <p style={{ fontSize: "1.25rem" }}><strong>Correct:</strong> {result.correct}</p>
      <p style={{ fontSize: "1.25rem" }}><strong>Wrong:</strong> {result.wrong}</p>
      <p
        style={{
          fontSize: "2rem",
          float: "right",
          fontWeight: "bold",
          marginBottom: "1rem",
          color:
            result.score < 70
              ? "red"
              : result.score < 80
              ? "goldenrod"
              : result.score < 90
              ? "green"
              : "dodgerblue",
        }}
      >
        Score: {result.percent}
        <div style={{ clear: "both", marginBottom: "1.5rem" }}></div>
      </p>
      <p style={{ fontSize: "1.25rem" }}><strong>Score:</strong> {result.score}</p>
      <p style={{ fontSize: "1.25rem" }}><strong>Total Questions:</strong> {result.total}</p>

      <Divider />

      <p style={{ fontSize: "1.1rem", color: "#888", marginTop: "1rem" }}>
        <strong>Taken On:</strong> {new Date(result.created_at).toLocaleString()}
      </p>
    </Segment>
  )
}

export default ResultsSegment
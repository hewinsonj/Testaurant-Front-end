// import React, { useEffect, useState } from "react";
// import { Grid, Segment, Container } from "semantic-ui-react";
// import { getAllFoods, deleteFood } from "../../api/food";
// import AddFoodModal from "./AddFoodModal";
// import FoodSegment from "./FoodSegment";
// import LoadingScreen from "../shared/LoadingPage";

// const FoodIndexPage = ({ user, msgAlert, setNewFood }) => {
//   const [allFoods, setAllFoods] = useState(null);

//   useEffect(() => {
//     getAllFoods(user)
//       .then((res) => {
//         console.log(res.data.foods, "foods")
//         setAllFoods(res.data.foods);
//       })
//       .catch((error) => {
//         msgAlert({
//           heading: "Error",
//           message: "Could not get foods",
//           variant: "danger",
//         });
//       });
//   }, []);

//   return (
//     <>
//       <div>
        
//           <Segment raised inverted >
//             <Grid centered textAlign="center" fluid>
//               <Grid.Column width={10}>
              
//                 <Segment raised inverted verticalAlign="middle" textAlign="center">
//                   <Grid.Row>
//                     <AddFoodModal user={user} msgAlert={msgAlert} />
//                   </Grid.Row>
                  
//                     <h1>All Foods</h1>
                 
//                   <Grid columns={2}>
//                     {/* <div className="scrolling-group"> */}
//                       {allFoods ? (
//                         allFoods
//                           .slice(0)
//                           .reverse()
//                           .map((food) => (
//                             <FoodSegment
//                               key={food.id}
//                               food={food}
//                               user={user}
//                               msgAlert={msgAlert}
//                             />
//                           ))
//                       ) : (
//                         <LoadingScreen />
//                       )}
//                     {/* </div> */}
//                  </Grid>
//                 </Segment>
                
//               </Grid.Column>
//             </Grid>
//           </Segment>
       
//       </div>
//     </>
//   );
// };

// export default FoodIndexPage;import React, { useEffect, useState } from "react";
import { Grid, Segment, List, Button } from "semantic-ui-react";
import { getAllFoods, deleteFood } from "../../api/food";
import AddFoodModal from "./AddFoodModal";
import LoadingScreen from "../shared/LoadingPage";
import React, { useState, useEffect } from 'react';
import FoodUpdateModal from "./FoodUpdateModal";


const FoodIndexPage = ({ user, msgAlert, setNewFood }) => {
  const [allFoods, setAllFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    getAllFoods(user)
      .then((res) => {
        setAllFoods(res.data.foods);
      })
      .catch((error) => {
        msgAlert({
          heading: "Error",
          message: "Could not get foods",
          variant: "danger",
        });
      });
  }, []);

  const handleDelete = (id) => {
    deleteFood(user, id)
      .then(() => {
        setAllFoods((prevFoods) => prevFoods.filter((food) => food.id !== id));
        setSelectedFood(null);
        msgAlert({
          heading: "Deleted",
          message: "Food deleted successfully.",
          variant: "success",
        });
      })
      .catch((error) => {
        msgAlert({
          heading: "Error",
          message: "Failed to delete food: " + error.message,
          variant: "danger",
        });
      });
  };

  return (
    <Segment raised>
      <AddFoodModal user={user} msgAlert={msgAlert} setNewFood={setNewFood} />
      <Grid columns={3} divided padded>
        {/* Column 1: Food List */}
        <Grid.Column width={5}>
          <h3>All Foods</h3>
          <List divided selection>
            {allFoods
              .slice()
              .reverse()
              .map((food) => (
                <List.Item key={food.id} onClick={() => setSelectedFood(food)}>
                  <List.Content>
                    <List.Header>{food.name.slice(0, 100)}</List.Header>
                  </List.Content>
                </List.Item>
              ))}
          </List>
        </Grid.Column>

        {/* Column 2: Food Details */}
        <Grid.Column width={7}>
          {selectedFood ? (
            <Segment>
              <h2>{selectedFood.name}</h2>
              <p><strong>Ingredients:</strong> {selectedFood.ingredients}</p>
              <p><strong>Contains Allergens:</strong></p>
              <ul>
                {selectedFood.con_egg && <li>Egg</li>}
                {selectedFood.con_tree_nut && <li>Tree Nuts</li>}
                {selectedFood.con_peanut && <li>Peanut</li>}
                {selectedFood.con_shellfish && <li>Shellfish</li>}
                {selectedFood.con_soy && <li>Soy</li>}
                {selectedFood.con_fish && <li>Fish</li>}
                {selectedFood.con_wheat && <li>Wheat</li>}
                {selectedFood.con_sesame && <li>Sesame</li>}
                {selectedFood.con_gluten && <li>Gluten</li>}
                {selectedFood.con_dairy && <li>Dairy</li>}
              </ul>
            </Segment>
          ) : (
            <p>Select a food to view details</p>
          )}
        </Grid.Column>

        {/* Column 3: Actions */}
        <Grid.Column width={4}>
          <Segment>
            {selectedFood && (
              <>
                <FoodUpdateModal food={selectedFood} user={user} msgAlert={msgAlert} />

                <Button
                  color="red"
                  fluid
                  style={{ marginTop: "0.5rem" }}
                  onClick={() => handleDelete(selectedFood.id)}
                >
                  Delete
                </Button>
              </>
            )}
          </Segment>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default FoodIndexPage;
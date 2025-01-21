import React, { useEffect, useState } from "react";
import { Grid, Segment, Container } from "semantic-ui-react";
import { getAllFoods, deleteFood } from "../../api/food";
import AddFoodModal from "./AddFoodModal";
import FoodSegment from "./FoodSegment";
import LoadingScreen from "../shared/LoadingPage";

const FoodIndexPage = ({ user, msgAlert, setNewFood }) => {
  const [allFoods, setAllFoods] = useState(null);

  useEffect(() => {
    getAllFoods(user)
      .then((res) => {
        console.log(res.data.foods, "foods")
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

  return (
    <>
      <div>
        
          <Segment raised inverted >
            <Grid centered textAlign="center" fluid>
              <Grid.Column width={10}>
              
                <Segment raised inverted verticalAlign="middle" textAlign="center">
                  <Grid.Row>
                    <AddFoodModal user={user} msgAlert={msgAlert} />
                  </Grid.Row>
                  
                    <h1>All Foods</h1>
                 
                  <Grid columns={2}>
                    {/* <div className="scrolling-group"> */}
                      {allFoods ? (
                        allFoods
                          .slice(0)
                          .reverse()
                          .map((food) => (
                            <FoodSegment
                              key={food.id}
                              food={food}
                              user={user}
                              msgAlert={msgAlert}
                            />
                          ))
                      ) : (
                        <LoadingScreen />
                      )}
                    {/* </div> */}
                 </Grid>
                </Segment>
                
              </Grid.Column>
            </Grid>
          </Segment>
       
      </div>
    </>
  );
};

export default FoodIndexPage;

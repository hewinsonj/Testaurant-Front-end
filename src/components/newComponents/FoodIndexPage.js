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
        <Container>
          <Segment raised inverted verticalAlign="middle" fluid>
            <Grid centered textAlign="center" fluid>
              <Grid.Row>
                <Segment raised verticalAlign="middle" textAlign="center">
                  <Grid.Row>
                    <AddFoodModal user={user} msgAlert={msgAlert} />
                  </Grid.Row>
                  <Grid.Row centered textAlign="center" verticalAlign="middle">
                    <h1>All Foods</h1>
                  </Grid.Row>
                  <Grid.Row>
                    <div className="scrolling-group">
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
                    </div>
                  </Grid.Row>
                </Segment>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
      </div>
    </>
  );
};

export default FoodIndexPage;

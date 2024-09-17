import React, { useEffect, useState } from "react";
import { Grid, Segment, Container } from "semantic-ui-react";

import { getAllDrinks } from "../../api/drink";
import AddDrinkModal from "./AddDrinkModal";
import DrinkSegment from "./DrinkSegment";
import LoadingScreen from "../shared/LoadingPage";

const DrinkIndexPage = ({ user, msgAlert }) => {
  const [allDrinks, setAllDrinks] = useState(null);

  useEffect(() => {
    getAllDrinks(user)
      .then((res) => {
        setAllDrinks(res.data.drinks);
      })
      .catch((error) => {
        msgAlert({
          heading: "Error",
          message: "Could not get drinks",
          variant: "danger",
        });
      });
  }, []);

  return (
    <>
      <div>
        
          <Segment raised inverted verticalAlign="middle" fluid>
            <Grid centered textAlign="center" fluid>
              <Grid.Column width={10}>
                <Segment raised verticalAlign="middle" textAlign="center" inverted>
                  <Grid.Row>
                    <AddDrinkModal user={user} msgAlert={msgAlert} />
                  </Grid.Row>
                <h1>All Drinks</h1>
                <Grid columns={2}>
                  {/* <div className="scrolling-group"> */}
                    {allDrinks ? (
                      allDrinks
                        .slice(0)
                        .reverse()
                        .map((drink) => (
                          <DrinkSegment
                            key={drink.id}
                            drink={drink}
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

export default DrinkIndexPage;

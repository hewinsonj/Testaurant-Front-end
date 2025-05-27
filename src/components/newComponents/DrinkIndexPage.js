import React, { useEffect, useState } from "react";
import { Grid, Segment, List, Button } from "semantic-ui-react";

import { getAllDrinks, deleteDrink } from "../../api/drink";
import AddDrinkModal from "./AddDrinkModal";
import LoadingScreen from "../shared/LoadingPage";
import DrinkUpdateModal from "./DrinkUpdateModal";


const DrinkIndexPage = ({ user, msgAlert, setNewDrink }) => {
  const [allDrinks, setAllDrinks] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(null);

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

  const handleDelete = (id) => {
    deleteDrink(user, id)
      .then(() => {
        setAllDrinks((prevDrinks) => prevDrinks.filter((drink) => drink.id !== id));
        setSelectedDrink(null);
        msgAlert({
          heading: "Deleted",
          message: "Drink deleted successfully.",
          variant: "success",
        });
      })
      .catch((error) => {
        msgAlert({
          heading: "Error",
          message: "Failed to delete drink: " + error.message,
          variant: "danger",
        });
      });
  };

  return (
    <Segment raised>
  <AddDrinkModal user={user} msgAlert={msgAlert} />

      <Grid columns={3} divided padded>
        {/* Column 1: Drink List */}
        <Grid.Column width={5}>
          <h3>All Drinks</h3>
          <List divided selection>
            {allDrinks
              .slice()
              .reverse()
              .map((drink) => (
                <List.Item key={drink.id} onClick={() => setSelectedDrink(drink)}>
                  <List.Content>
                    <List.Header>{drink.name.slice(0, 100)}</List.Header>
                  </List.Content>
                </List.Item>
              ))}
          </List>
        </Grid.Column>

        {/* Column 2: Drink Details */}
        <Grid.Column width={7}>
          {selectedDrink ? (
            <Segment>
              <h2>{selectedDrink.name}</h2>
              <p><strong>Ingredients:</strong> {selectedDrink.ingredients}</p>
              <p><strong>Garnish:</strong> {selectedDrink.garnishes}</p>
              <p><strong>Glassware:</strong> {selectedDrink.glassware}</p>
              <p><strong>Prep Instructions:</strong> {selectedDrink.prep_instructs}</p>
              <p><strong>Contains Allergens:</strong></p>
              <ul>
                {selectedDrink.con_egg && <li>Egg</li>}
                {selectedDrink.con_tree_nut && <li>Tree Nuts</li>}
                {selectedDrink.con_peanut && <li>Peanut</li>}
                {selectedDrink.con_shellfish && <li>Shellfish</li>}
                {selectedDrink.con_soy && <li>Soy</li>}
                {selectedDrink.con_fish && <li>Fish</li>}
                {selectedDrink.con_wheat && <li>Wheat</li>}
                {selectedDrink.con_sesame && <li>Sesame</li>}
                {selectedDrink.con_gluten && <li>Gluten</li>}
                {selectedDrink.con_dairy && <li>Dairy</li>}
                {selectedDrink.is_vegan && <li>Vegan</li>}
                {selectedDrink.is_vegetarian && <li>Vegetarian</li>}

              </ul>
            </Segment>
          ) : (
            <p>Select a drink to view details</p>
          )}
        </Grid.Column>

        {/* Column 3: Actions */}
        <Grid.Column width={4}>
          <Segment>
            {selectedDrink && (
              <>
          <DrinkUpdateModal drink={selectedDrink} user={user} msgAlert={msgAlert} />

                <Button
                  color="red"
                  fluid
                  style={{ marginTop: "0.5rem" }}
                  onClick={() => handleDelete(selectedDrink.id)}
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

export default DrinkIndexPage;
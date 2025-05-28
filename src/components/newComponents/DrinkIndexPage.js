import React, { useEffect, useState } from "react";
import { Grid, Segment, List, Button, Input } from "semantic-ui-react";

import { getAllDrinks, deleteDrink } from "../../api/drink";
import AddDrinkModal from "./AddDrinkModal";
import LoadingScreen from "../shared/LoadingPage";
import DrinkUpdateModal from "./DrinkUpdateModal";
import FilterModal from "./FilterModal";

const DrinkIndexPage = ({ user, msgAlert, setNewDrink }) => {
  const [allDrinks, setAllDrinks] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(null);

  const allergenFilters = [
    { key: "con_egg", label: "Egg" },
    { key: "con_tree_nut", label: "Tree Nuts" },
    { key: "con_peanut", label: "Peanut" },
    { key: "con_shellfish", label: "Shellfish" },
    { key: "con_soy", label: "Soy" },
    { key: "con_fish", label: "Fish" },
    { key: "con_wheat", label: "Wheat" },
    { key: "con_sesame", label: "Sesame" },
    { key: "con_gluten", label: "Gluten" },
    { key: "con_dairy", label: "Dairy" },
    { key: "is_vegan", label: "Vegan" },
    { key: "is_vegetarian", label: "Vegetarian" },
  ];

  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({ excludeKeys: [], includeKeys: [] });
  const [searchTerm, setSearchTerm] = useState("");

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

  const applyFilters = ({ excludeKeys, includeKeys }) => {
    setActiveFilters({ excludeKeys, includeKeys });
  };

  const filteredDrinks = allDrinks.filter((drink) => {
    const matchesSearch =
      drink.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drink.ingredients.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesExclusions = activeFilters.excludeKeys.every((key) => !drink[key]);
    const matchesInclusions = activeFilters.includeKeys.every((key) => drink[key]);

    return matchesSearch && matchesExclusions && matchesInclusions;
  });

  return (
    <Segment raised>
      <AddDrinkModal user={user} msgAlert={msgAlert} setNewDrink={setNewDrink} />
      <Button icon="filter" content="Filters" onClick={() => setFilterOpen(true)} />
      <Input
        icon="search"
        placeholder="Search by name or ingredients..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginLeft: "1rem" }}
      />
      <FilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={allergenFilters}
        onApply={applyFilters}
      />
      {(activeFilters.excludeKeys.length > 0 || activeFilters.includeKeys.length > 0) && (
        <Segment secondary>
          {activeFilters.excludeKeys.length > 0 && (
            <p>
              <strong>Excluding:</strong>{" "}
              {activeFilters.excludeKeys
                .map((key) => {
                  const found = allergenFilters.find((f) => f.key === key);
                  return found ? found.label : key;
                })
                .join(", ")}
            </p>
          )}
          {activeFilters.includeKeys.length > 0 && (
            <p>
              <strong>Including:</strong>{" "}
              {activeFilters.includeKeys
                .map((key) => {
                  const found = allergenFilters.find((f) => f.key === key);
                  return found ? found.label : key;
                })
                .join(", ")}
            </p>
          )}
        </Segment>
      )}

      <Grid columns={3} divided padded>
        {/* Column 1: Drink List */}
        <Grid.Column width={5}>
          <h3>All Drinks</h3>
          <div style={{ maxHeight: '650px', overflowY: 'auto' }}>
            <List divided selection>
              {filteredDrinks
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
          </div>
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
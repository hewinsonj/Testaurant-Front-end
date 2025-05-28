import React, { useState, useEffect } from "react";
import { Grid, Segment, List, Button, Input } from "semantic-ui-react";
import { getAllFoods, deleteFood } from "../../api/food";
import AddFoodModal from "./AddFoodModal";
import LoadingScreen from "../shared/LoadingPage";
import FoodUpdateModal from "./FoodUpdateModal";
import FilterModal from "./FilterModal";

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

const FoodIndexPage = ({ user, msgAlert, setNewFood }) => {
  const [allFoods, setAllFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  // Use an object for activeFilters with excludeKeys and includeKeys
  const [activeFilters, setActiveFilters] = useState({ excludeKeys: [], includeKeys: [] });
  const [searchTerm, setSearchTerm] = useState("");

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

  // Apply filters: filters is expected to be an object with excludeKeys and includeKeys arrays
  const applyFilters = ({ excludeKeys, includeKeys }) => {
    setActiveFilters({ excludeKeys, includeKeys });
  };

  // Filtering logic: exclude foods that match any of the excludeKeys, include only foods that match all includeKeys
  const filteredFoods = allFoods.filter((food) => {
    const matchesSearch =
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.ingredients.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesExclusions = activeFilters.excludeKeys.every((key) => !food[key]);
    const matchesInclusions = activeFilters.includeKeys.every((key) => food[key]);

    return matchesSearch && matchesExclusions && matchesInclusions;
  });

  return (
    <Segment raised>
      <AddFoodModal user={user} msgAlert={msgAlert} setNewFood={setNewFood} />
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
              {activeFilters.excludeKeys.map((key) => {
                const found = allergenFilters.find((f) => f.key === key);
                return found ? found.label : key;
              }).join(", ")}
            </p>
          )}
          {activeFilters.includeKeys.length > 0 && (
            <p>
              <strong>Including:</strong>{" "}
              {activeFilters.includeKeys.map((key) => {
                const found = allergenFilters.find((f) => f.key === key);
                return found ? found.label : key;
              }).join(", ")}
            </p>
          )}
        </Segment>
      )}
      <Grid columns={3} divided padded>
        {/* Column 1: Food List */}
        <Grid.Column width={5}>
          <h3>All Foods</h3>
          <div style={{ maxHeight: '650px', overflowY: 'auto' }}>
            <List divided selection>
              {filteredFoods
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
          </div>
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
                {selectedFood.is_vegan && <li>Vegan</li>}
                {selectedFood.is_vegetarian && <li>Vegetarian</li>}
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
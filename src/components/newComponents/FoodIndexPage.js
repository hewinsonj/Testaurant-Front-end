import React, { useState, useEffect } from "react";
import { Grid, Segment, List, Button, Input } from "semantic-ui-react";
import { getAllFoods, deleteFood } from "../../api/food";
import AddFoodModal from "./AddFoodModal";
import LoadingScreen from "../shared/LoadingPage";
import FoodUpdateModal from "./FoodUpdateModal";
import EditLogModal from "./EditLogModal";
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

const FoodIndexPage = ({ user, msgAlert, setNewFood, employees: incomingEmployees = [], getAllRestaurants }) => {
  const [allFoods, setAllFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  // Use an object for activeFilters with excludeKeys and includeKeys
  const [activeFilters, setActiveFilters] = useState({ excludeKeys: [], includeKeys: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [logOpen, setLogOpen] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [restLoading, setRestLoading] = useState(false);

  const getOwnerName = (food) => {
    // Only show for elevated roles; employees don't need owner info
    if (!(user && ["Manager", "Admin", "GeneralManager"].includes(user.role))) {
      return "";
    }
    if (!food) return "Unknown";

    // Normalize owner id (can be id or object)
    const ownerId = typeof food.owner === 'object' ? (food.owner?.id ?? food.owner?.pk) : food.owner;
    if (ownerId == null) {
      // Fall back to embedded owner object (if present)
      const first = food.owner?.first_name ?? food.owner?.firstName ?? '';
      const last  = food.owner?.last_name  ?? food.owner?.lastName  ?? '';
      const full = `${first} ${last}`.trim();
      return full || food.owner?.email || 'Unknown';
    }

    // Choose candidates from the provided employees prop; support { users: [...] } as well
    const candidates = Array.isArray(incomingEmployees)
      ? incomingEmployees
      : (Array.isArray(incomingEmployees?.users) ? incomingEmployees.users : []);

    const match = candidates.find((emp) => {
      const eid = emp?.id ?? emp?.pk ?? emp?.user?.id;
      return String(eid) === String(ownerId);
    });

    if (!match) {
      return `User #${ownerId}`;
    }

    const first = match.first_name ?? match.firstName ?? match?.user?.first_name ?? match?.user?.firstName ?? '';
    const last  = match.last_name  ?? match.lastName  ?? match?.user?.last_name  ?? match?.user?.lastName  ?? '';
    const full = `${first} ${last}`.trim();
    return full || match?.email || match?.user?.email || `User #${ownerId}`;
  };

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

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setRestLoading(true);
        if (typeof getAllRestaurants !== 'function') return;
        const resp = user ? await getAllRestaurants(user) : await getAllRestaurants();
        const list = Array.isArray(resp?.data) ? resp.data : (resp?.data?.restaurants || resp?.data || []);
        if (mounted) setRestaurants(Array.isArray(list) ? list : []);
      } catch (e) {
        if (mounted) setRestaurants([]);
        if (process.env.NODE_ENV !== 'production') {
          console.warn('[FoodIndexPage] getAllRestaurants failed', e?.response?.status, e?.response?.data);
        }
      } finally {
        if (mounted) setRestLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [user, getAllRestaurants]);

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

  const getRestaurantName = (food) => {
    if (!food) return '';
    let restId = null;
    if (food.restaurant && typeof food.restaurant === 'object') {
      restId = food.restaurant.id ?? food.restaurant.pk ?? null;
    } else if (food.restaurant !== undefined) {
      restId = food.restaurant;
    }
    if (restId == null || restId === '') {
      restId = food.restaurant_id ?? null;
    }
    if (restId == null || restId === '') return 'No Restaurant';
    if (!Array.isArray(restaurants) || restaurants.length === 0) return '';
    const match = restaurants.find(r => String(r.id) === String(restId));
    return match ? match.name : `Restaurant #${restId}`;
  };

  return (
    <Segment raised>
      {user && ["Manager", "Admin", "GeneralManager"].includes(user.role) && (
        <AddFoodModal
          user={user}
          msgAlert={msgAlert}
          setNewFood={setNewFood}
          getAllRestaurants={getAllRestaurants}
          onCreated={(newFood) => {
            setAllFoods((prev) => (Array.isArray(prev) ? [...prev, newFood] : [newFood]));
            setSelectedFood(newFood);
          }}
        />
      )}
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
              <p>
                <strong>Created By:</strong> {getOwnerName(selectedFood) || 'Unknown'}
              </p>
              <p>
                <strong>Restaurant:</strong> {getRestaurantName(selectedFood)}
              </p>
            </Segment>
          ) : (
            <p>Select a food to view details</p>
          )}
        </Grid.Column>

        {/* Column 3: Actions */}
        {user && ["Manager", "Admin", "GeneralManager"].includes(user.role) && (
          <Grid.Column width={4}>
            <Segment>
              {selectedFood && (
                <>
                  <FoodUpdateModal food={selectedFood} user={user} msgAlert={msgAlert} getAllRestaurants={getAllRestaurants} />

                <Button
                  color="blue"
                  fluid
                  style={{ marginTop: "0.5rem" }}
                  onClick={() => setLogOpen(true)}
                >
                  Show Edit Log
                </Button>
                <EditLogModal
                  open={logOpen}
                  onClose={() => setLogOpen(false)}
                  user={user}
                  itemType="Food"
                  itemId={selectedFood?.id}
                />
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
        )}
      </Grid>
    </Segment>
  );
};

export default FoodIndexPage;
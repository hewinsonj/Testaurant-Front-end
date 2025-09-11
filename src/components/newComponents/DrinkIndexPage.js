import { useEffect, useState } from "react";
import { Grid, Segment, List, Button, Input, Dropdown } from "semantic-ui-react";
import { getAllDrinks, deleteDrink } from "../../api/drink";
import AddDrinkModal from "./AddDrinkModal";
import DrinkUpdateModal from "./DrinkUpdateModal";
import FilterModal from "./FilterModal";
import EditLogModal from "./EditLogModal";

const DrinkIndexPage = ({ user, msgAlert, setNewDrink, employees, getAllRestaurants }) => {
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
  const [activeFilters, setActiveFilters] = useState({
    excludeKeys: [],
    includeKeys: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [logOpen, setLogOpen] = useState(false);

  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState('all');

  const getOwnerName = (drink) => {
    // Only show for elevated roles
    if (!(user && ["Manager", "Admin", "GeneralManager"].includes(user.role))) {
      return "";
    }
    if (!drink) return "Unknown";

    // Normalize owner id (can be id or object)
    const ownerId = typeof drink.owner === 'object' ? (drink.owner?.id ?? drink.owner?.pk) : drink.owner;
    if (ownerId === null) {
      const first = drink.owner?.first_name ?? drink.owner?.firstName ?? '';
      const last  = drink.owner?.last_name  ?? drink.owner?.lastName  ?? '';
      const full = `${first} ${last}`.trim();
      return full || drink.owner?.email || 'Unknown';
    }

    const candidates = Array.isArray(employees)
      ? employees
      : (Array.isArray(employees?.users) ? employees.users : []);

    const match = candidates.find((emp) => {
      const eid = emp?.id ?? emp?.pk ?? emp?.user?.id;
      return String(eid) === String(ownerId);
    });

    if (!match) return `User #${ownerId}`;

    const first = match.first_name ?? match.firstName ?? match?.user?.first_name ?? match?.user?.firstName ?? '';
    const last  = match.last_name  ?? match.lastName  ?? match?.user?.last_name  ?? match?.user?.lastName  ?? '';
    const full = `${first} ${last}`.trim();
    return full || match?.email || match?.user?.email || `User #${ownerId}`;
  };

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
  }, [user, msgAlert]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        if (typeof getAllRestaurants !== 'function') return;
        const resp = user ? await getAllRestaurants(user) : await getAllRestaurants();
        const list = Array.isArray(resp?.data) ? resp.data : (resp?.data?.restaurants || resp?.data || []);
        if (mounted) setRestaurants(Array.isArray(list) ? list : []);
      } catch (e) {
        if (mounted) setRestaurants([]);
        if (process.env.NODE_ENV !== 'production') {
          console.warn('[DrinkIndexPage] getAllRestaurants failed', e?.response?.status, e?.response?.data);
        }
      } finally {
      }
    };
    load();
    return () => { mounted = false; };
  }, [user, getAllRestaurants]);

  const handleDelete = (id) => {
    deleteDrink(user, id)
      .then(() => {
        setAllDrinks((prevDrinks) =>
          prevDrinks.filter((drink) => drink.id !== id)
        );
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

  const getRestaurantId = (drink) => {
    if (!drink) return null;
    let restId = null;
    if (drink.restaurant && typeof drink.restaurant === 'object') {
      restId = drink.restaurant.id ?? drink.restaurant.pk ?? null;
    } else if (drink.restaurant !== undefined) {
      restId = drink.restaurant;
    }
    if (restId === null || restId === '') {
      restId = drink.restaurant_id ?? null;
    }
    return restId;
  };

  const currentRestaurantName = () => {
    if (selectedRestaurantId === 'all') return 'all restaurants';
    const match = Array.isArray(restaurants) && restaurants.find(r => String(r.id) === String(selectedRestaurantId));
    return match?.name || `Restaurant #${selectedRestaurantId}`;
  };

  const searchPlaceholder = `Search ${currentRestaurantName()} by name or ingredients...`;

  const filteredDrinks = allDrinks.filter((drink) => {
    const matchesSearch =
      drink.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drink.ingredients.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesExclusions = activeFilters.excludeKeys.every((key) => !drink[key]);
    const matchesInclusions = activeFilters.includeKeys.every((key) => drink[key]);

    const restMatches = selectedRestaurantId === 'all' || String(getRestaurantId(drink)) === String(selectedRestaurantId);

    return matchesSearch && matchesExclusions && matchesInclusions && restMatches;
  });

  const getRestaurantName = (drink) => {
    if (!drink) return '';
    let restId = null;
    if (drink.restaurant && typeof drink.restaurant === 'object') {
      restId = drink.restaurant.id ?? drink.restaurant.pk ?? null;
    } else if (drink.restaurant !== undefined) {
      restId = drink.restaurant;
    }
    if (restId === null || restId === '') {
      restId = drink.restaurant_id ?? null;
    }
    if (restId === null || restId === '') return 'No Restaurant';
    if (!Array.isArray(restaurants) || restaurants.length === 0) return '';
    const match = restaurants.find(r => String(r.id) === String(restId));
    return match ? match.name : `Restaurant #${restId}`;
  };

  return (
    <Segment raised>
      {user && ["Manager", "Admin", "GeneralManager"].includes(user.role) && (
        <AddDrinkModal
          user={user}
          msgAlert={msgAlert}
          setNewDrink={setNewDrink}
          getAllRestaurants={getAllRestaurants}
          onCreated={(newDrink) => {
            setAllDrinks((prev) =>
              Array.isArray(prev) ? [...prev, newDrink] : [newDrink]
            );
            setSelectedDrink(newDrink);
          }}
        />
      )}
      <Button
        icon="filter"
        content="Filters"
        onClick={() => setFilterOpen(true)}
      />
      {user && ["Admin"].includes(user.role) && (
        <Dropdown
          placeholder="Filter by restaurant"
          selection
          clearable
          value={selectedRestaurantId}
          onChange={(e, { value }) => setSelectedRestaurantId(value ?? 'all')}
          options={[
            { key: 'all', text: 'All Restaurants', value: 'all' },
            ...(Array.isArray(restaurants) ? restaurants.map(r => ({ key: r.id, text: r.name, value: r.id })) : [])
          ]}
          style={{ marginLeft: "1rem", minWidth: 220 }}
        />
      )}
      <Input
        icon="search"
        placeholder={searchPlaceholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        size="large"
        style={{ marginLeft: "1rem", width: "28rem", maxWidth: "100%" }}
      />
      <FilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={allergenFilters}
        onApply={applyFilters}
      />
      {(activeFilters.excludeKeys.length > 0 ||
        activeFilters.includeKeys.length > 0) && (
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
          <div style={{ maxHeight: "650px", overflowY: "auto" }}>
            <List divided selection>
              {filteredDrinks
                .slice()
                .reverse()
                .map((drink) => (
                  <List.Item
                    key={drink.id}
                    onClick={() => setSelectedDrink(drink)}
                  >
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
              <p>
                <strong>Ingredients:</strong> {selectedDrink.ingredients}
              </p>
              <p>
                <strong>Garnish:</strong> {selectedDrink.garnishes}
              </p>
              <p>
                <strong>Glassware:</strong> {selectedDrink.glassware}
              </p>
              <p>
                <strong>Prep Instructions:</strong>{" "}
                {selectedDrink.prep_instructs}
              </p>
              <p>
                <strong>Contains Allergens:</strong>
              </p>
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
              <p>
                <strong>Created By:</strong> {getOwnerName(selectedDrink) || 'Unknown'}
              </p>
              <p>
                <strong>Restaurant:</strong> {getRestaurantName(selectedDrink)}
              </p>
            </Segment>
          ) : (
            <p>Select a drink to view details</p>
          )}
        </Grid.Column>

        {/* Column 3: Actions */}
        {user && ["Manager", "Admin", "GeneralManager"].includes(user.role) && (
          <Grid.Column width={4}>
            <Segment>
              {selectedDrink && user && ["Manager", "Admin", "GeneralManager"].includes(user.role) && (
                <>
                  <DrinkUpdateModal
                    drink={selectedDrink}
                    user={user}
                    msgAlert={msgAlert}
                    getAllRestaurants={getAllRestaurants}
                  />
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
                    itemType="Drink"
                    itemId={selectedDrink?.id}
                  />
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
        )}
      </Grid>
    </Segment>
  );
};

export default DrinkIndexPage;

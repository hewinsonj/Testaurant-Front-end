import React from "react";
import { Button, Form, Container, Icon, Message } from "semantic-ui-react";

const AddDrinkForm = (props) => {
  const { drink, handleChange, handleSubmit, heading, errorMsg, getAllRestaurants, user } = props;

  const role = user?.role || '';
  const userRestaurantId = (typeof user?.restaurant === 'object') ? (user?.restaurant?.id ?? null) : (user?.restaurant ?? null);

  const [restaurants, setRestaurants] = React.useState([]);
  const [restLoading, setRestLoading] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (typeof getAllRestaurants !== 'function') return;
      try {
        setRestLoading(true);
        const resp = user ? await getAllRestaurants(user) : await getAllRestaurants();
        const list = Array.isArray(resp?.data) ? resp.data : (resp?.data?.restaurants || resp?.data || []);
        if (mounted) setRestaurants(Array.isArray(list) ? list : []);
      } catch (e) {
        if (mounted) setRestaurants([]);
        if (process.env.NODE_ENV !== 'production') {
          console.warn('[AddDrinkForm] getAllRestaurants failed', e?.response?.status, e?.response?.data);
        }
      } finally {
        if (mounted) setRestLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [user, getAllRestaurants]);

  // If Manager/GM, force their restaurant into form state
  React.useEffect(() => {
    if (user && ["GeneralManager", "Manager"].includes(role)) {
      if (userRestaurantId != null) {
        handleChange?.(null, { name: 'restaurant', value: userRestaurantId });
      }
    }
  }, [role, userRestaurantId]);

  const restaurantOptions = React.useMemo(() => {
    if (!Array.isArray(restaurants)) return [];
    const opts = restaurants.map(r => ({ key: String(r.id), value: r.id, text: r.city && r.state ? `${r.name} — ${r.city}, ${r.state}` : r.name }));
    return [{ key: 'none', value: '', text: 'No Restaurant' }, ...opts];
  }, [restaurants]);

  const forcedRestaurantLabel = React.useMemo(() => {
    if (userRestaurantId == null) return '';
    const match = Array.isArray(restaurants) ? restaurants.find(r => r.id === userRestaurantId) : null;
    if (!match) return String(userRestaurantId);
    return match.city && match.state ? `${match.name} — ${match.city}, ${match.state}` : match.name;
  }, [restaurants, userRestaurantId]);

  const handleRestaurantSelect = (e, { value }) => {
    return handleChange?.(null, { name: 'restaurant', value });
  };

  return (
    <Container className="justify-content-center">
      <h3>{heading}</h3>
      <Form onSubmit={handleSubmit} error={!!errorMsg}>
        <Form.Group widths="equal">
          <Form.Input
            required
            name="name"
            id="name"
            label="Name"
            placeholder="Name of Drink Item"
            value={drink.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Input
          required
          name="ingredients"
          id="ingredients"
          label="Ingredients"
          placeholder="Ingredients"
          value={drink.ingredients}
          onChange={handleChange}
        />
        <Form.Input
          required
          name="prep_instructs"
          id="prep_instructs"
          label="Prep Instructions"
          placeholder="Prep Instructions"
          value={drink.prep_instructs}
          onChange={handleChange}
        />
        <Form.Input
          required
          name="garnishes"
          id="garnishes"
          label="Garnishes"
          placeholder="Garnishes"
          value={drink.garnishes}
          onChange={handleChange}
        />
        <Form.Input
          required
          name="glassware"
          id="glassware"
          label="Glassware"
          placeholder="Glassware"
          value={drink.glassware}
          onChange={handleChange}
        />
        <Form.Checkbox
          required
          name="con_egg"
          id="con_egg"
          label="con_egg"
          defaultChecked={drink.con_egg}
          // value= { drink.con_egg}
          onChange={handleChange}
        />
        <Form.Checkbox
          required
          name="con_tree_nut"
          id="con_tree_nut"
          label="con_tree_nut"
          defaultChecked={drink.con_tree_nut}
          // value= { drink.con_tree_nut}
          onChange={handleChange}
        />
        <Form.Checkbox
          required
          name="con_peanut"
          id="con_peanut"
          label="con_peanut"
          defaultChecked={drink.con_peanut}
          // value= { drink.con_peanut}
          onChange={handleChange}
        />
        <Form.Checkbox
          required
          name="con_shellfish"
          id="con_shellfish"
          label="con_shellfish"
          defaultChecked={drink.con_shellfish}
          // value= { drink.con_shellfish}
          onChange={handleChange}
        />
        <Form.Checkbox
          required
          name="con_soy"
          id="con_soy"
          label="con_soy"
          defaultChecked={drink.con_soy}
          // value= { drink.con_soy}
          onChange={handleChange}
        />
        <Form.Checkbox
          required
          name="con_fish"
          id="con_fish"
          label="con_fish"
          defaultChecked={drink.con_fish}
          // value= { drink.con_fish}
          onChange={handleChange}
        />
        <Form.Checkbox
          required
          name="con_wheat"
          id="con_wheat"
          label="con_wheat"
          defaultChecked={drink.con_wheat}
          // value= { drink.con_wheat}
          onChange={handleChange}
        />
        <Form.Checkbox
          required
          name="con_sesame"
          id="con_sesame"
          label="con_sesame"
          defaultChecked={drink.con_sesame}
          // value= { drink.con_sesame}
          onChange={handleChange}
        />
        <Form.Checkbox
          required
          name="con_gluten"
          id="con_gluten"
          label="con_gluten"
          defaultChecked={drink.con_gluten}
          // value= { drink.con_gluten}
          onChange={handleChange}
        />
        <Form.Checkbox
          required
          name="con_dairy"
          id="con_dairy"
          label="con_dairy"
          defaultChecked={drink.con_dairy}
          onChange={handleChange}
        />
        <Form.Checkbox
          name="is_vegan"
          id="is_vegan"
          label="is_vegan"
          defaultChecked={drink.is_vegan}
          onChange={handleChange}
        />
        <Form.Checkbox
          name="is_vegetarian"
          id="is_vegetarian"
          label="is_vegetarian"
          defaultChecked={drink.is_vegetarian}
          onChange={handleChange}
        />
        {role === 'Admin' ? (
          <Form.Select
            name="restaurant"
            id="restaurant"
            label="Restaurant"
            placeholder={restLoading ? 'Loading…' : 'Select restaurant'}
            loading={restLoading}
            disabled={restLoading}
            options={restaurantOptions}
            value={(() => {
              const val = drink?.restaurant ?? drink?.restaurant_id ?? (typeof drink?.restaurant === 'object' ? drink.restaurant?.id : '');
              return val == null ? '' : val;
            })()}
            onChange={handleRestaurantSelect}
            clearable
          />
        ) : (
          <Form.Input
            label="Restaurant"
            value={forcedRestaurantLabel}
            readOnly
          />
        )}
        <Message
          error
          header="Invalid Entry"
          content={errorMsg}
        />
        <Button type="submit" color="orange">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddDrinkForm;

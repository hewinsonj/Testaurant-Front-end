import React, { useState, useEffect } from "react";
import { Button, Form, Container, Icon, Message } from "semantic-ui-react";

const AddFoodForm = (props) => {
  const { food, handleChange, handleSubmit, heading, errorMsg, getAllRestaurants, user } = props;

  const [restaurants, setRestaurants] = useState([]);
  const [restLoading, setRestLoading] = useState(true);

  useEffect(() => {
    if (getAllRestaurants && user) {
      getAllRestaurants(user).then((resp) => {
        const list = Array.isArray(resp?.data) ? resp.data : (resp?.data?.restaurants || resp?.data || []);
        setRestaurants(Array.isArray(list) ? list : []);
        setRestLoading(false);
      }).catch((e) => {
        console.warn('[AddFoodForm] getAllRestaurants failed', e);
        setRestaurants([]);
        setRestLoading(false);
      });
    }
  }, [getAllRestaurants, user]);

  const restaurantOptions = Array.isArray(restaurants)
    ? [
        { key: 'none', text: 'No Restaurant', value: '' },
        ...restaurants.map((r) => ({
          key: r.id,
          text: r.name,
          value: r.id,
        })),
      ]
    : [];

  const forcedRestaurantLabel = restaurants.find((r) => r.id === food.restaurant)?.name || "";

  const handleRestaurantSelect = (e, { value }) => {
    // Forward in (e, data) signature expected by Semantic UI handlers
    handleChange(null, { name: 'restaurant', value });
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
            placeholder="Name of Food Item"
            value={food.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Input
          required
          name="ingredients"
          id="ingredients"
          label="Ingredients"
          placeholder="Ingredients"
          value={food.ingredients}
          onChange={handleChange}
        />
        <Form.Checkbox
          required
          name="con_egg"
          id="con_egg"
          label="con_egg"
          defaultChecked={food.con_egg}
          onChange={handleChange}
        />
        <Form.Checkbox
          required
          name="con_tree_nut"
          id="con_tree_nut"
          label="con_tree_nut"
          defaultChecked={food.con_tree_nut}
          onChange={handleChange}
        />
        <Form.Checkbox
          required
          name="con_peanut"
          id="con_peanut"
          label="con_peanut"
          defaultChecked={food.con_peanut}
          onChange={handleChange}
        />
        <Form.Checkbox
          required
          name="con_shellfish"
          id="con_shellfish"
          label="con_shellfish"
          defaultChecked={food.con_shellfish}
          onChange={handleChange}
        />
        <Form.Checkbox
          required
          name="con_soy"
          id="con_soy"
          label="con_soy"
          defaultChecked={food.con_soy}
          onChange={handleChange}
        />
        <Form.Checkbox
          required
          name="con_fish"
          id="con_fish"
          label="con_fish"
          defaultChecked={food.con_fish}
          onChange={handleChange}
        />
        <Form.Checkbox
          required
          name="con_wheat"
          id="con_wheat"
          label="con_wheat"
          defaultChecked={food.con_wheat}
          onChange={handleChange}
        />
        <Form.Checkbox
          required
          name="con_sesame"
          id="con_sesame"
          label="con_sesame"
          defaultChecked={food.con_sesame}
          onChange={handleChange}
        />
        <Form.Checkbox
          required
          name="con_gluten"
          id="con_gluten"
          label="con_gluten"
          defaultChecked={food.con_gluten}
          onChange={handleChange}
        />
        <Form.Checkbox
          required
          name="con_dairy"
          id="con_dairy"
          label="con_dairy"
          defaultChecked={food.con_dairy}
          onChange={handleChange}
        />
        <Form.Checkbox
          name="is_vegan"
          id="is_vegan"
          label="is_vegan"
          defaultChecked={food.is_vegan}
          onChange={handleChange}
        />
        <Form.Checkbox
          name="is_vegetarian"
          id="is_vegetarian"
          label="is_vegetarian"
          defaultChecked={food.is_vegetarian}
          onChange={handleChange}
        />
        {user?.role === "Admin" ? (
          <Form.Select
            label="Restaurant"
            options={restaurantOptions}
            loading={restLoading}
            placeholder="Select Restaurant"
            value={food.restaurant}
            onChange={handleRestaurantSelect}
            required
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

export default AddFoodForm;

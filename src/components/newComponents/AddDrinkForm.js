import React from "react";
import { Button, Form, Container, Icon, Message } from "semantic-ui-react";

const AddDrinkForm = (props) => {
  const { drink, handleChange, handleSubmit, heading, errorMsg } = props;

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

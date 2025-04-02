import React, { useState } from "react";
import { createFood } from "../../api/food";
import AddFoodForm from "./AddFoodForm";

const CreateFood = (props) => {
  const { user, msgAlert, setOpen } = props;

  const defaultFood = {
    name: "",
    ingredients: "",
    con_egg: false,
    con_tree_nut: false,
    con_peanut: false,
    con_shellfish: false,
    con_soy: false,
    con_fish: false,
    con_wheat: false,
    con_sesame: false,
    con_gluten: false,
    con_dairy: false,
  };
  const [food, setFood] = useState(defaultFood);

  const handleChange = (e, { name, value, checked, type }) => {
    setFood((prevFood) => ({
      ...prevFood,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  console.log("Food object being submitted:", food);
  const handleCreateFood = (e) => {
    e.preventDefault();

    createFood(user, food)
      .then(() => {
        msgAlert({
          heading: "Success",
          message: "Created Food Item",
          variant: "success",
        });
      })
      .then(() => {
        setOpen(false);
      })
      .catch((error) => {
        msgAlert({
          heading: "Failure",
          message: "Create Food Item Failure" + error,
          variant: "danger",
        });
      });
  };

  return (
    <AddFoodForm
      food={food}
      handleChange={handleChange}
      heading="Create a new Food Item!"
      handleSubmit={handleCreateFood}
    />
  );
};

export default CreateFood;

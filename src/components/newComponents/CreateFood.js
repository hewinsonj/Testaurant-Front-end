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
    is_vegan: false,
    is_vegetarian: false,
  };
  const [food, setFood] = useState(defaultFood);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e, { name, value, checked, type }) => {
    setFood((prevFood) => {
      const updatedState = {
        ...prevFood,
        [name]: type === "checkbox" ? checked : value,
      };



      return updatedState;
    });
  };

  console.log("Food object being submitted:", food);
  const handleCreateFood = (e) => {
    e.preventDefault();

    if (food.con_dairy && (food.is_vegan || food.is_vegetarian)) {
      setErrorMsg("Food cannot be marked vegan or vegetarian if it contains dairy.");
      return;
    }

    if (food.con_egg && food.is_vegan) {
      setErrorMsg("Food cannot be marked vegan if it contains egg.");
      return;
    }

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
      errorMsg={errorMsg}
    />
  );
};

export default CreateFood;

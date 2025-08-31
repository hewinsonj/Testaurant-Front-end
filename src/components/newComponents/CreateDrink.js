import React, { useState } from "react";
import { createDrink } from "../../api/drink";
import AddDrinkForm from "./AddDrinkForm";

const CreateDrink = (props) => {
  const { user, msgAlert, setOpen, onCreated, getAllRestaurants } = props;

  const [errorMsg, setErrorMsg] = useState("");

  const defaultDrink = {
    name: "",
    ingredients: "",
    prep_instructs: "",
    garnishes: "",
    glassware: "",
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
  const [drink, setDrink] = useState(defaultDrink);

  const handleChange = (e, { name, value, checked, type }) => {
    setDrink((prevDrink) => {
      const updatedState = {
        ...prevDrink,
        [name]: type === "checkbox" ? checked : value,
      };



      return updatedState;
    });
  };
  const handleCreateDrink = (e) => {
    e.preventDefault();

    if (drink.con_dairy && (drink.is_vegan || drink.is_vegetarian)) {
      setErrorMsg("Drink cannot be marked vegan or vegetarian if it contains dairy.");
      return;
    }

    if (drink.con_egg && drink.is_vegan) {
      setErrorMsg("Drink cannot be marked vegan if it contains egg.");
      return;
    }

    createDrink(user, drink)
      .then((res) => {
        const newDrink = (res && res.data && (res.data.drink || res.data)) || null;
        msgAlert({
          heading: "Success",
          message: "Created Drink Item",
          variant: "success",
        });
        if (typeof onCreated === 'function' && newDrink) {
          onCreated(newDrink);
        }
        setOpen(false);
      })
      .catch((error) => {
        msgAlert({
          heading: "Failure",
          message: "Create Drink Item Failure: " + error,
          variant: "danger",
        });
      });
  };

  return (
    <AddDrinkForm
      drink={drink}
      handleChange={handleChange}
      heading="Create a new Drink Item!"
      handleSubmit={handleCreateDrink}
      errorMsg={errorMsg}
      getAllRestaurants={getAllRestaurants}
      user={user}
    />
  );
};

export default CreateDrink;

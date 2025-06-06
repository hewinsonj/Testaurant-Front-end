import React, { useState } from "react";
import { Modal, Button } from "semantic-ui-react";
import { updateFood } from "../../api/food";
import AddFoodForm from "./AddFoodForm";

const FoodUpdateModal = (props) => {
  const { user, msgAlert } = props;

  const [food, setFood] = useState(props.food);
  const [open, setOpen] = useState(false);

  const handleChange = (e, target) => {
    setFood((prevFood) => {
      const { name, value } = target;
      const updatedName = name;
      let updatedValue = value;
      // handle number type
      if (target.type === "number") {
        // change from string to actual number
        updatedValue = parseInt(e.target.value);
      }

      //handle the checkbox
      if (updatedName === "con_peanut" && target.checked) {
        updatedValue = true;
      } else if (updatedName === "con_peanut" && !target.checked) {
        updatedValue = false;
      }
      if (updatedName === "con_egg" && target.checked) {
        updatedValue = true;
      } else if (updatedName === "con_egg" && !target.checked) {
        updatedValue = false;
      }
      if (updatedName === "con_tree_nut" && target.checked) {
        updatedValue = true;
      } else if (updatedName === "con_tree_nut" && !target.checked) {
        updatedValue = false;
      }
      if (updatedName === "con_shellfish" && target.checked) {
        updatedValue = true;
      } else if (updatedName === "con_shellfish" && !target.checked) {
        updatedValue = false;
      }
      if (updatedName === "con_soy" && target.checked) {
        updatedValue = true;
      } else if (updatedName === "con_soy" && !target.checked) {
        updatedValue = false;
      }
      if (updatedName === "con_fish" && target.checked) {
        updatedValue = true;
      } else if (updatedName === "con_fish" && !target.checked) {
        updatedValue = false;
      }
      if (updatedName === "con_wheat" && target.checked) {
        updatedValue = true;
      } else if (updatedName === "con_wheat" && !target.checked) {
        updatedValue = false;
      }
      if (updatedName === "con_sesame" && target.checked) {
        updatedValue = true;
      } else if (updatedName === "con_sesame" && !target.checked) {
        updatedValue = false;
      }
      if (updatedName === "con_gluten" && target.checked) {
        updatedValue = true;
      } else if (updatedName === "con_gluten" && !target.checked) {
        updatedValue = false;
      }
      if (updatedName === "con_dairy" && target.checked) {
        updatedValue = true;
      } else if (updatedName === "con_dairy" && !target.checked) {
        updatedValue = false;
      }
      if (updatedName === "is_vegan") {
        updatedValue = target.checked;
      }
      if (updatedName === "is_vegetarian") {
        updatedValue = target.checked;
      }

      const updatedFood = { [updatedName]: updatedValue };

      return { ...prevFood, ...updatedFood };
    });
  };

  const handleUpdateFood = (e) => {
    e.preventDefault();

    if (food.con_dairy && (food.is_vegan || food.is_vegetarian)) {
      msgAlert({
        heading: "Invalid Entry",
        message: "Food cannot be marked vegan or vegetarian if it contains dairy.",
        variant: "danger",
      });
      return;
    }

    if (food.con_egg && food.is_vegan) {
      msgAlert({
        heading: "Invalid Entry",
        message: "Food cannot be marked vegan if it contains egg.",
        variant: "danger",
      });
      return;
    }

    //close form if no change was made
    if (food == props.food) {
      setOpen(false);
    } else {
      updateFood(user, food, props.food.id)
        .then(() => {
          setOpen(false);
          msgAlert({
            heading: "Success",
            message: "Updated Food",
            variant: "success",
          });
        })
        .catch((error) => {
          setOpen(false);
          msgAlert({
            heading: "Failure",
            message: "Update Food Failure" + error,
            variant: "danger",
          });
        });
    }
  };

  return (
    <Modal
      onClose={() => {
        setOpen(false);
        setFood(props.food);
      }}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button color="black" fluid onClick={() => setFood(props.food)}>
          Update Food
        </Button>
      }
    >
      <Modal.Content>
        <AddFoodForm
          user={user}
          msgAlert={msgAlert}
          food={food}
          handleChange={handleChange}
          handleSubmit={handleUpdateFood}
          heading="Update Your Food"
        />
      </Modal.Content>
    </Modal>
  );
};

export default FoodUpdateModal;

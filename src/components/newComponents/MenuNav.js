import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import FoodIndexPage from "./FoodIndexPage";
import DrinkIndexPage from "./DrinkIndexPage";
import { getAllEmployees } from "../../api/user";
import { getAllRestaurants } from "../../api/restaurant";

export default class MenuNav extends Component {
  state = { activeItem: "foods", setNewFood: false, setNewDrink: false, employees: [] };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  loadEmployees = () => {
    const { user } = this.props;
    if (user && ["Manager", "GeneralManager", "Admin"].includes(user.role)) {
      getAllEmployees(user)
        .then((res) => {
          const list =
            res?.data?.employees ??
            res?.data?.users ??
            (Array.isArray(res?.data) ? res.data : []) ??
            [];
          this.setState({ employees: Array.isArray(list) ? list : [] });
          if (process.env.NODE_ENV !== 'production') {
            console.log('[MenuNav employees sample]', (Array.isArray(list) && list.length > 0) ? list[0] : list);
          }
        })
        .catch((err) => {
          console.warn(
            "[TestNav] getAllEmployees failed",
            err?.response?.status,
            err?.response?.data
          );
          this.setState({ employees: [] });
        });
    } else {
      this.setState({ employees: [] });
    }
  };

  componentDidMount() {
    this.loadEmployees();
  }

  componentDidUpdate(prevProps) {
    const prevRole = prevProps.user?.role;
    const currRole = this.props.user?.role;
    if (prevRole !== currRole) {
      this.loadEmployees();
    }
  }

  render() {
    const { activeItem } = this.state;
    const activitiesJSX =
      activeItem === "foods" ? (
        <FoodIndexPage
          user={this.props.user}
          setNewFood={this.props.setNewFood}
          msgAlert={this.props.msgAlert}
          employees={this.state.employees}
          getAllRestaurants={getAllRestaurants}
        />
      ) : (
        <DrinkIndexPage
          user={this.props.user}
          setNewDrink={this.props.setNewDrink}
          msgAlert={this.props.msgAlert}
          employees={this.state.employees}
          getAllRestaurants={getAllRestaurants}
        />
      );
    return (
      <>
        <Menu tabular>
          <Menu.Item
            name="foods"
            active={activeItem === "foods"}
            onClick={this.handleItemClick}
          ></Menu.Item>
          <Menu.Item
            name="drinks"
            active={activeItem === "drinks"}
            onClick={this.handleItemClick}
          ></Menu.Item>
        </Menu>
        {activitiesJSX}
      </>
    );
  }
}

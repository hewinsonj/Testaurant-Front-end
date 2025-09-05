import React, { useState } from "react";
import { Menu, Sticky } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import { signIn, changePassword } from "../../api/auth";

const NewLandingPage = ({ user, setUser, msgAlert }) => {
  const [activeItem, setActiveItem] = useState("results");
  const navigate = useNavigate();

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    navigate(`/${name}`);
  };

  const guestLogin = () => {
    const guestCredentials = {
      email: "guestemployee@gmail.com",
      password: "guestemployee",
    };

    signIn(guestCredentials)
      .then((res) => setUser(res.data.user))
      .then(() => navigate("/results"))
      .catch((error) => {
        msgAlert({
          heading: "Guest Sign In Failed",
          message: "Could not log in as guest: " + error.message,
          variant: "danger",
        });
      });
  };
  const guestMLogin = () => {
    const guestCredentials = {
      email: "guestmanager@gmail.com",
      password: "guestmanager",
    };

    signIn(guestCredentials)
      .then((res) => setUser(res.data.user))
      .then(() => navigate("/results"))
      .catch((error) => {
        msgAlert({
          heading: "Guest Sign In Failed",
          message: "Could not log in as guest: " + error.message,
          variant: "danger",
        });
      });
  };
  return (
    <Sticky floated="right">
      <Menu tabular inverted id="header" size="massive">
        {!user ? (
          <Menu.Menu position="right">
            <Menu.Item
              name="sign-in"
              active={activeItem === "sign-in"}
              onClick={handleItemClick}
              as={Link}
              to="/sign-in"
            >
              Sign In
            </Menu.Item>
            <Menu.Item
              name="sign-up"
              active={activeItem === "sign-up"}
              onClick={handleItemClick}
              as={Link}
              to="/sign-up"
            >
              Create Account
            </Menu.Item>

            <Menu.Item
              name="guestEmployee"
              active={activeItem === "guestEmployee"}
              onClick={guestLogin}
            >
              Guest Employee Sign In
            </Menu.Item>
            <Menu.Item
              name="guestManager"
              active={activeItem === "guestManager"}
              onClick={guestMLogin}
            >
              Guest Manager Sign In
            </Menu.Item>
          </Menu.Menu>
        ) : (
          <Menu.Menu floated="right">
            <Menu.Item
              name=""
              active={activeItem === ""}
              onClick={handleItemClick}
            >
              <h1>Testaurant</h1>
            </Menu.Item>
            {/* {user?.role === "manager" && ( */}
              <Menu.Item
                name="test-nav"
                active={activeItem === "test-nav"}
                onClick={handleItemClick}
              >
                Tests
              </Menu.Item>
            {/* )} */}
            <Menu.Item
              name="menu-nav"
              active={activeItem === "menu-nav"}
              onClick={handleItemClick}
            >
              Menu
            </Menu.Item>
            {user && ["Manager", "GeneralManager", "Admin"].includes(user.role) && (
              <Menu.Item
                name="employees"
                active={activeItem === "employees"}
                onClick={handleItemClick}
              >
                Management
              </Menu.Item>
            )}
            <Menu.Item
              name="results"
              active={activeItem === "results"}
              onClick={handleItemClick}
            >
              Results
            </Menu.Item>
            <Menu.Item
              name="sign-out"
              active={activeItem === "sign-out"}
              onClick={handleItemClick}
            >
              Sign Out
            </Menu.Item>
            {user && ["Manager", "GeneralManager", "Admin"].includes(user.role) && (
              <Menu.Item
                name="change-password"
                active={activeItem === "change-password"}
                onClick={handleItemClick}
              >
                Change Password
              </Menu.Item>
            )}
          </Menu.Menu>
        )}{" "}
        {user?.first_name && (
          <Menu.Item
            position="right"
            as="div"
            fitted="horizontally"
            tabIndex={-1}
            style={{ pointerEvents: 'none', cursor: 'default', margin: '10px'}}
          >
            Welcome, {user.first_name}!
          </Menu.Item>
        )}
      </Menu>
    </Sticky>
  );
};

export default NewLandingPage;

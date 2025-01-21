// // import React, { Component } from "react";
// // import { Grid, Menu, Segment, Label, Input } from "semantic-ui-react";
// // import LoadingScreen from "../shared/LoadingPage";
// // import { Link, useNavigate } from "react-router-dom";

// // export default class NewLandingPage extends Component {
// //   state = { activeItem: "home" };

// //   handleItemClick = (e, { name }) => this.setState({ activeItem: name });
// //   render() {
// //     const { activeItem } = this.state;
  

// //     return (
// //       <>
// //         <Menu tabular inverted id="header" size="massive" position="right">
// //           {!this.props.user ? (
// //             <Menu.Menu floated="right">
// //               <Menu.Item
// //                 name="sign-up"
// //                 active={activeItem === "sign-up"}
// //                 onClick={this.handleItemClick}
// //               >
// //                 <Link to="sign-up">Create Account</Link>
// //               </Menu.Item>
// //               <Menu.Item
// //                 name="sign-in"
// //                 active={activeItem === "sign-in"}
// //                 onClick={this.handleItemClick}
// //               >
// //                 <Link to="sign-in">Sign in</Link>
// //               </Menu.Item>
// //             </Menu.Menu>
// //           ) : (
// //             <Menu.Menu>
// //               <Menu.Item
// //                 name="testaurant"
// //                 active={activeItem === "testaurant"}
// //                 onClick={this.handleItemClick}
// //               >
// //                 <Link to="my-profile">
// //                   <h1>Testaurant</h1>
// //                 </Link>
// //               </Menu.Item>

// //               <Menu.Item
// //                 name="tests"
// //                 active={activeItem === "tests"}
// //                 onClick={this.handleItemClick}
// //               >
// //                 <Link to="test-nav">Tests</Link>
// //               </Menu.Item>

// //               <Menu.Item
// //                 name="menu"
// //                 active={activeItem === "menu"}
// //                 as
// //                 onClick={this.handleItemClick}
// //               >
// //                 <Link to="menu-nav">Menu</Link>
// //               </Menu.Item>

// //               <Menu.Item
// //                 name="employees"
// //                 active={activeItem === "employees"}
// //                 onClick={this.handleItemClick}
// //               >
// //                 <Link to="employees">Employees</Link>
// //               </Menu.Item>

// //               <Menu.Item
// //                 name="results"
// //                 active={activeItem === "results"}
// //                 onClick={this.handleItemClick}
// //               >
// //                 <Link to="results">Results</Link>
// //               </Menu.Item>
// //               <Menu.Item
// //                 name="sign-out"
// //                 active={activeItem === "sign-out"}
// //                 // onClick={this.handleItemClick, navigate(`/sign-out`)}
// //               >
// //                   <Link to="sign-out">Sign out</Link>
// //                   {/* <Navigate to="/sign-out">Sign Out</Navigate> */}
// //               </Menu.Item>
// //             </Menu.Menu>
// //           )}
// //         </Menu>
// //       </>
// //     );
// //   }
// // }


// import React, { useState } from "react";
// import { Grid, Menu, Segment, Label, Input } from "semantic-ui-react";
// import { Link, useNavigate } from "react-router-dom";

// const NewLandingPage = ({ user }) => {
//   const [activeItem, setActiveItem] = useState("home");
//   const navigate = useNavigate();

//   const handleItemClick = (e, { name }) => {
//     setActiveItem(name);
//   };

//   return (
//     <>
//       <Menu tabular inverted id="header" size="massive" position="right">
//         {!user ? (
//           <Menu.Menu floated="right">
//             <Menu.Item
//               name="sign-up"
//               active={activeItem === "sign-up"}
//               onClick={handleItemClick}
//             >
//               <Link to="sign-up">Create Account</Link>
//             </Menu.Item>
//             <Menu.Item
//               name="sign-in"
//               active={activeItem === "sign-in"}
//               onClick={handleItemClick}
//             >
//               <Link to="sign-in">Sign in</Link>
//             </Menu.Item>
//           </Menu.Menu>
//         ) : (
//           <Menu.Menu>
//             <Menu.Item
//               name="testaurant"
//               active={activeItem === "testaurant"}
//               onClick={handleItemClick}
//             >
//               <Link to="my-profile">
//                 <h1>Testaurant</h1>
//               </Link>
//             </Menu.Item>

//             <Menu.Item
//               name="tests"
//               active={activeItem === "tests"}
//               onClick={handleItemClick}
//             >
//               <Link to="test-nav">Tests</Link>
//             </Menu.Item>

//             <Menu.Item
//               name="menu"
//               active={activeItem === "menu"}
//               onClick={handleItemClick}
//             >
//               <Link to="menu-nav">Menu</Link>
//             </Menu.Item>

//             <Menu.Item
//               name="employees"
//               active={activeItem === "employees"}
//               onClick={handleItemClick}
//             >
//               <Link to="employees">Employees</Link>
//             </Menu.Item>

//             <Menu.Item
//               name="results"
//               active={activeItem === "results"}
//               onClick={handleItemClick}
//             >
//               <Link to="results">Results</Link>
//             </Menu.Item>

//             <Menu.Item
//               name="sign-out"
//               active={activeItem === "sign-out"}
//               onClick={handleItemClick}
//             >
//               <Link to="sign-out">Sign out</Link>
//             </Menu.Item>
//           </Menu.Menu>
//         )}
//       </Menu>
//     </>
//   );
// };

// export default NewLandingPage;


import React, { useState } from "react";
import { Menu, Icon, Sticky, Modal, Button, Form } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";

const NewLandingPage = ({ user }) => {
  const [activeItem, setActiveItem] = useState("home");
  const navigate = useNavigate();

  // Function to handle menu clicks
  const handleItemClick = (e, { name }) => {
    setActiveItem(name);

    // Programmatic navigation based on the name
    switch (name) {
      case "home":
        navigate("/");
        break;
      case "tests":
        navigate("/test-nav");
        break;
      case "menu":
        navigate("/menu-nav");
        break;
      case "employees":
        navigate("/employees");
        break;
      case "results":
        navigate("/results");
        break;
      case "sign-out":
        navigate("/sign-out");
        break;
      case "sign-in":
        navigate("/sign-in");
        break;
      case "sign-up":
        navigate("/sign-up");
        break;
      default:
        break;
    }
  };

  return (
    <Sticky>
      <Menu tabular inverted id="header" size="massive">
        {!user ? (
          <Menu.Menu position="right">
            <Menu.Item
              name="sign-up"
              active={activeItem === "sign-up"}
              onClick={handleItemClick}
            >
              <Link to="sign-up">Create Account</Link>
            </Menu.Item>
            <Menu.Item
              name="sign-in"
              active={activeItem === "sign-in"}
              onClick={handleItemClick}
            >
              <Link to="sign-in">Sign In</Link>
            </Menu.Item>
          </Menu.Menu>
        ) : (
          <Menu.Menu>
            <Menu.Item
              name="home"
              active={activeItem === "home"}
              onClick={handleItemClick}
            >
              <h1>Testaurant</h1>
            </Menu.Item>
            <Menu.Item
              name="tests"
              active={activeItem === "tests"}
              onClick={handleItemClick}
            >
              Tests
            </Menu.Item>
            <Menu.Item
              name="menu"
              active={activeItem === "menu"}
              onClick={handleItemClick}
            >
              Menu
            </Menu.Item>
            <Menu.Item
              name="employees"
              active={activeItem === "employees"}
              onClick={handleItemClick}
            >
              Employees
            </Menu.Item>
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
          </Menu.Menu>
        )}
      </Menu>
    </Sticky>
  );
};

export default NewLandingPage;
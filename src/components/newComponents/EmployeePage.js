// import React, { useEffect, useState } from "react";
// import { Icon, Button, Grid, Form, Segment, Select } from "semantic-ui-react";
// import { Link } from "react-router-dom";
// import { getAllEmployees } from "../../api/user";
// import { getAllTests } from "../../api/test";

// const EmployeePage = ({ user, msgAlert }) => {
//   const [allEmployees, setAllEmployees] = useState([]);
//   const [filterEmployees, setFilterEmployees] = useState([]);
//   const [allTests, setAllTests] = useState(null);

//   const options = [
//     { key: "m", text: "Big Test", value: "big_test" },
//     { key: "f", text: "You Better Not FAIL This One", value: "you_better" },
//     { key: "o", text: "Dont Even Worry About This Little Thing", value: "dont_worry",
//     },
//   ];

//   const handleChange = (e) => {
//     const value = e.target.value.toLowerCase(); // Convert the input value to lowercase
//     let employees = allEmployees;
//     setFilterEmployees(
//       employees.filter(
//         (a) =>
//           a.email.toLowerCase().includes(value)
//         // ||
//         //   a.type.toLowerCase().includes(value)
//       )
//     );
//   };

//   useEffect(() => {
//     getAllTests(user)
//       .then((res) => {
//         setAllTests(res.data.test_thiss);
//         console.log(res.data.test_thiss, "ALL TESTS")
//       })
//       .catch((error) => {
//         msgAlert({
//           heading: "Error",
//           message: "Could not get tests",
//           variant: "danger",
//         });
//       });
//   }, []);

//   useEffect(() => {
//     getAllEmployees(user)
//       .then((res) => {
//         console.log(res.data.users, "USERS")
//         setAllEmployees(res.data.users);
//         setFilterEmployees(res.data.users);
//       })
//       .catch((error) => {
//         msgAlert({
//           heading: "Failure",
//           message: "Index Employees failed" + error,
//           variant: "danger",
//         });
//       });
//   }, []);

//   const Index = filterEmployees.map((employee) => (
//     <Grid centered stretched>
//       <div id="empContainer">
//         <Grid.Row padded>
//           <Segment fluid key={employee.id}>
//             <Grid columns={4} verticalAlign="middle">
//               <Grid.Column>
//                 <Link to="sign-out">
//                   <h3>{employee.email}</h3>
//                 </Link>
//               </Grid.Column>
//               <Grid.Column>
//                 <h3>Assign a Test: </h3>
//                 <Form>
//                   <Form.Field
//                     control={Select}
//                     options={options}
//                     placeholder="select a test"
//                     search
//                     searchInput={{ id: "form-select-control-gender" }}
//                   />
//                   <Button type="submit">Send Test</Button>
//                 </Form>
//               </Grid.Column>
//               <Grid.Column centered>
//                 <h3>
//                   Taken Tests:{" "}
//                   <Icon name="file alternate outline" size="big" link />
//                 </h3>
//               </Grid.Column>
//               <Grid.Column>
//                 {/* <h3>Hire Date: </h3>
//                 <h3>10/10/10</h3> */}
//               </Grid.Column>
//             </Grid>
//           </Segment>
//         </Grid.Row>
//       </div>
//     </Grid>
//   ));

//   return (
//     <>
//       <Grid centered>
//         <div id="empContainer">
//           <Grid.Row padded fluid>
//             <Segment raised fluid>
//               <h1>All Employees</h1>
//               <div className="headerSearch">
//                 <Form>
//                   <Form.Input
//                     placeholder="Type  here  to  filter  results  by  employee  name "
//                     onChange={handleChange}
//                   ></Form.Input>
//                 </Form>
//               </div>
//             </Segment>
//           </Grid.Row>
//         </div>
//       </Grid>
//       {Index}
//     </>
//   );
// };

// export default EmployeePage;

import React, { useEffect, useState } from "react";
import { Grid, Segment, List, Button, Form, Modal } from "semantic-ui-react";
import { getAllEmployees } from "../../api/user";
import { getAllTests } from "../../api/test";
import AssignTestModal from "./AssignTestModal";
import UpdateEmployeeModal from "../auth/UpdateEmployeeModal";
import DeleteEmployeeButton from "../auth/DeleteEmployeeButton";

const EmployeePage = ({ user, msgAlert }) => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [allTests, setAllTests] = useState([]);

  useEffect(() => {
    getAllEmployees(user)
      .then((res) => {
        setAllEmployees(res.data.users);
        setFilteredEmployees(res.data.users);
      })
      .catch((error) => {
        msgAlert({
          heading: "Failure",
          message: "Could not fetch employees: " + error,
          variant: "danger",
        });
      });

    getAllTests(user)
      .then((res) => {
        setAllTests(res.data.test_thiss);
      })
      .catch((error) => {
        msgAlert({
          heading: "Error",
          message: "Could not get tests",
          variant: "danger",
        });
      });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = allEmployees.filter((emp) =>
      emp.email.toLowerCase().includes(value)
    );
    setFilteredEmployees(filtered);
  };

  return (
    <Segment raised>
      <Grid columns={3} divided padded>
        {/* Column 1: Employee list + search */}
        <Grid.Column width={5}>
          <h3>All Employees</h3>
          <Form>
            <Form.Input placeholder="Search by email" onChange={handleChange} />
          </Form>
          <List divided selection>
            {filteredEmployees
              .slice()
              .reverse()
              .map((emp) => (
                <List.Item
                  key={emp.id}
                  onClick={() => setSelectedEmployee(emp)}
                >
                  <List.Content>
                    <List.Header>
                      {emp.email ? emp.email.slice(0, 100) : "Unnamed User"}
                    </List.Header>
                  </List.Content>
                </List.Item>
              ))}
          </List>
        </Grid.Column>

        {/* Column 2: Selected employee details */}
{/* Column 2: Selected employee details */}
<Grid.Column width={7}>
  {selectedEmployee ? (
    <Segment>
      <h2>Employee Info</h2>
      <p><strong>Email:</strong> {selectedEmployee.email}</p>
      <p><strong>First Name:</strong> {selectedEmployee.first_name || <i>(none)</i>}</p>
      <p><strong>Last Name:</strong> {selectedEmployee.last_name || <i>(none)</i>}</p>
      <p><strong>Role:</strong> {selectedEmployee.role || <i>(none)</i>}</p>
      <p><strong>Hire Date:</strong> {selectedEmployee.hire_date ? new Date(selectedEmployee.hire_date).toLocaleDateString() : <i>(none)</i>}</p>
      <p><strong>Assigned Tests:</strong> {selectedEmployee.assigned_tests?.length || 0}</p>
    </Segment>
  ) : (
    <p>Select an employee to view details</p>
  )}
</Grid.Column>

        {/* Column 3: Action buttons */}
        <Grid.Column width={4}>
          <Segment>
            {selectedEmployee && (
              <>
                <UpdateEmployeeModal
                  user={user}
                  employee={selectedEmployee}
                  msgAlert={msgAlert}
                />

                <AssignTestModal
                  user={user}
                  employee={selectedEmployee}
                  tests={allTests}
                  msgAlert={msgAlert}
                />
                <DeleteEmployeeButton
                  user={user}
                  employee={selectedEmployee}
                  msgAlert={msgAlert}
                  onDelete={() => setSelectedEmployee(null)}
                />
              </>
            )}
          </Segment>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default EmployeePage;

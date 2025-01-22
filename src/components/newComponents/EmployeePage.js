import React, { useEffect, useState } from "react";
import { Icon, Button, Grid, Form, Segment, Select } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getAllEmployees } from "../../api/user";
import { getAllTests } from "../../api/test";

const EmployeePage = ({ user, msgAlert }) => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [filterEmployees, setFilterEmployees] = useState([]);
  const [allTests, setAllTests] = useState(null);

  const options = [
    { key: "m", text: "Big Test", value: "big_test" },
    { key: "f", text: "You Better Not FAIL This One", value: "you_better" },
    { key: "o", text: "Dont Even Worry About This Little Thing", value: "dont_worry",
    },
  ];

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase(); // Convert the input value to lowercase
    let employees = allEmployees;
    setFilterEmployees(
      employees.filter(
        (a) =>
          a.email.toLowerCase().includes(value) 
        // ||
        //   a.type.toLowerCase().includes(value)
      )
    );
  };

  useEffect(() => {
    getAllTests(user)
      .then((res) => {
        setAllTests(res.data.test_thiss);
        console.log(res.data.test_thiss, "ALL TESTS")
      })
      .catch((error) => {
        msgAlert({
          heading: "Error",
          message: "Could not get tests",
          variant: "danger",
        });
      });
  }, []);

  useEffect(() => {
    getAllEmployees(user)
      .then((res) => {
        console.log(res.data.users, "USERS")
        setAllEmployees(res.data.users);
        setFilterEmployees(res.data.users);
      })
      .catch((error) => {
        msgAlert({
          heading: "Failure",
          message: "Index Employees failed" + error,
          variant: "danger",
        });
      });
  }, []);

  const Index = filterEmployees.map((employee) => (
    <Grid centered stretched>
      <div id="empContainer">
        <Grid.Row padded>
          <Segment fluid key={employee.id}>
            <Grid columns={4} verticalAlign="middle">
              <Grid.Column>
                <Link to="sign-out">
                  <h3>{employee.email}</h3>
                </Link>
              </Grid.Column>
              <Grid.Column>
                <h3>Assign a Test: </h3>
                <Form>
                  <Form.Field
                    control={Select}
                    options={options}
                    placeholder="select a test"
                    search
                    searchInput={{ id: "form-select-control-gender" }}
                  />
                  <Button type="submit">Send Test</Button>
                </Form>
              </Grid.Column>
              <Grid.Column centered>
                <h3>
                  Taken Tests:{" "}
                  <Icon name="file alternate outline" size="big" link />
                </h3>
              </Grid.Column>
              <Grid.Column>
                {/* <h3>Hire Date: </h3>
                <h3>10/10/10</h3> */}
              </Grid.Column>
            </Grid>
          </Segment>
        </Grid.Row>
      </div>
    </Grid>
  ));

  return (
    <>
      <Grid centered>
        <div id="empContainer">
          <Grid.Row padded fluid>
            <Segment raised fluid>
              <h1>All Employees</h1>
              <div className="headerSearch">
                <Form>
                  <Form.Input
                    placeholder="Type  here  to  filter  results  by  employee  name "
                    onChange={handleChange}
                  ></Form.Input>
                </Form>
              </div>
            </Segment>
          </Grid.Row>
        </div>
      </Grid>
      {Index}
    </>
  );
};

export default EmployeePage;

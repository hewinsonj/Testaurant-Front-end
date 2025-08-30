import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import QuestionIndex from './QuestionIndex'
import TestIndex from './TestIndex'
import TestAssignIndex from './TestAssignIndex'
import { getAllTests } from '../../api/test'
import { getAllQuestions } from '../../api/question'
import { Link } from 'react-router-dom'
import { getAllEmployees } from '../../api/user'

export default class TestNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: (props.user && ["Manager", "GeneralManager", "Admin"].includes(props.user.role)) ? "Tests" : "Assigned Tests",
      setNewQuestion: false,
      setNewTest: false,
      employees: []
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  // Component lifecycle method
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
        })
        .catch((err) => {
          console.warn('[TestNav] getAllEmployees failed', err?.response?.status, err?.response?.data);
          this.setState({ employees: [] });
        });
    } else {
      this.setState({ employees: [] });
    }
  }
 
  render() {
    const { activeItem } = this.state;
    const { user } = this.props;
    const contentJSX =
      activeItem === "Questions" ? (
        <QuestionIndex
          user={this.props.user}
          setNewQuestion={this.props.setNewQuestion}
          msgAlert={this.props.msgAlert}
          employees={this.state.employees}
        />
      ) : activeItem === "Assigned Tests" ? (
        <TestAssignIndex
          user={this.props.user}
          msgAlert={this.props.msgAlert}
        />
      ) : (
        <TestIndex
          user={this.props.user}
          setNewQuestion={this.props.setNewQuestion}
          msgAlert={this.props.msgAlert}
          setNewTest={this.props.setNewTest}
          employees={this.state.employees}
        />
      );

    return (
      <>
        <Menu tabular>
          {user && ["Manager", "GeneralManager", "Admin"].includes(user.role) ? (
            <>
              <Menu.Item
                name="Tests"
                active={activeItem === "Tests"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="Questions"
                active={activeItem === "Questions"}
                onClick={this.handleItemClick}
              />
            </>
          ) : (
            <Menu.Item
              name="Assigned Tests"
              active={activeItem === "Assigned Tests"}
              onClick={this.handleItemClick}
            />
          )}
        </Menu>
        {contentJSX}
      </>
    );
  }
}
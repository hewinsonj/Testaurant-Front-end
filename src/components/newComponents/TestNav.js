import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import QuestionIndex from "./QuestionIndex";
import TestIndex from "./TestIndex";

export default class TestNav extends Component {
  state = { activeItem: "Tests", setNewQuestion: false, setNewTest: false };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const contentJSX =
      activeItem === "Questions" ? (
        <QuestionIndex
          user={this.props.user}
          setNewQuestion={this.props.setNewQuestion}
          msgAlert={this.props.msgAlert}
        />
      ) : (
        <TestIndex
          user={this.props.user}
          setNewQuestion={this.props.setNewQuestion}
          msgAlert={this.props.msgAlert}
          setNewTest={this.props.setNewTest}
        />
      );

    return (
      <>
        <Menu tabular>
          <Menu.Item
            name="Tests"
            active={activeItem === "Tests"}
            onClick={this.handleItemClick}
          ></Menu.Item>
          <Menu.Item
            name="Questions"
            active={activeItem === "Questions"}
            onClick={this.handleItemClick}
          ></Menu.Item>
        </Menu>
        {contentJSX}
      </>
    );
  }
}

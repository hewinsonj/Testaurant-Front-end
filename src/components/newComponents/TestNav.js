import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import QuestionIndex from './QuestionIndex'
import TestIndex from './TestIndex'
import TestAssignIndex from './TestAssignIndex'
import { getAllTests } from '../../api/test'
import { getAllQuestions } from '../../api/question'
import { Link } from 'react-router-dom'

export default class TestNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: props.user?.role === "manager" ? "Tests" : "Assigned Tests",
      setNewQuestion: false,
      setNewTest: false
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

// Component lifecycle method
componentDidMount() {
    const { user, msgAlert} = this.props;
    
    // getAllQuestions(user)
    //     .then(res => {
    //         // console.log(res.data); // Log to inspect the structure
    //         this.setState({ allQuestions: res.data.question_news}); // Ensure correct key
    //     })
    //     .catch(error => {
    //         msgAlert({
    //             heading: 'Error',
    //             message: 'Could not get questions',
    //             variant: 'danger'
    //         });
    //     }); 

    // getAllTests(user)
    //     .then(res => {
    //         // console.log(res.data); // Log to inspect the structure
    //         this.setState({ allTests: res.data.test_thiss }); // Ensure correct key
    //     })
    //     .catch(error => {
    //         msgAlert({
    //             heading: 'Error',
    //             message: 'Could not get tests',
    //             variant: 'danger'
    //         });
    //     });

    
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
        />
      );

    return (
      <>
        <Menu tabular>
          {user?.role === "manager" ? (
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
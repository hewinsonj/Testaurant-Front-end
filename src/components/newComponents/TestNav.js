import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import QuestionIndex from './QuestionIndex'
import TestIndex from './TestIndex'
<<<<<<< HEAD
import { getAllTests } from '../../api/test'
import { getAllQuestions } from '../../api/question'
import { Link } from 'react-router-dom'
=======
>>>>>>> 27bdab7 (cleaned up)

export default class TestNav extends Component {
  state = { activeItem: 'Tests', setNewQuestion: false, setNewTest: false }
  
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
<<<<<<< HEAD
  



  constructor(props) {
    super(props);
    // Initialize state
    // this.state = {
    //     allTests: [], // Initialize as an empty array
    //     allQuestions: [],
    // };
}

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




=======
>>>>>>> 27bdab7 (cleaned up)
 
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

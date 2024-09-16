import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import QuestionIndex from './QuestionIndex'
import AddItem from './AddItem'
import AddTest from './AddTest'
import AddQuestionModal from './AddQuestionModal'
import TestIndex from './TestIndex'
import { getAllTests } from '../../api/test'
import { getAllQuestions } from '../../api/question'
import { Link } from 'react-router-dom'

export default class TestNav extends Component {
  state = { activeItem: 'Tests', setNewQuestion: false, setNewTest: false }
  
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  



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




 
  render() {
    const { activeItem, allTests, allQuestions } = this.state
    const contentJSX = activeItem === 'Questions' ? 
        <QuestionIndex  user={this.props.user} setNewQuestion={this.props.setNewQuestion} msgAlert={this.props.msgAlert} allQuestions={this.props.allQuestions}/>
        :
        <TestIndex  user={this.props.user} setNewQuestion={this.props.setNewQuestion} msgAlert={this.props.msgAlert} setNewTest={this.props.setNewTest} allTests={this.props.allTests} allQuestions={this.props.allQuestions}/>

    const testJSX = activeItem === 'Tests' ? 

        null
        :
        // <DrinksPage />
        <AddItem user={this.props.user} setNewQuestion={this.props.setNewQuestion} msgAlert={this.props.msgAlert} activeItem={this.props.activeItem}/>

    const createQJSX =  activeItem === 'Create Question' ? 
        null
        :
        // <DrinksPage />
        <AddItem user={this.props.user} setNewQuestion={this.props.setNewQuestion} msgAlert={this.props.msgAlert} activeItem={this.props.activeItem}/>

    const createTJSX = activeItem === 'Create Test' ? 
        null
        :
        // <DrinksPage />
        <AddTest user={this.props.user} setNewQuestion={this.props.setNewQuestion} msgAlert={this.props.msgAlert} activeItem={this.props.activeItem}/>
    return (
        <>
      <Menu tabular>
        <Menu.Item
          name='Tests'
          active={activeItem === 'Tests'}
          onClick={this.handleItemClick}
        >
        </Menu.Item>
        <Menu.Item
          name='Questions'
          active={activeItem === 'Questions'}
          onClick={this.handleItemClick}
        >
            
        </Menu.Item>  
        {/* <Menu.Item
          name='create test'
          active={activeItem === 'create test'}
          onClick={this.handleItemClick}
        >
        </Menu.Item>    
        <Menu.Item
          name='create question'
          active={activeItem === 'create question'}
          onClick={this.handleItemClick}
        >
        </Menu.Item>   */}
        
      </Menu>
      {contentJSX}

      
      </>
    )
  }
}
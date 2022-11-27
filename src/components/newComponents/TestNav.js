import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import QuestionIndex from './QuestionIndex'
import AddItem from './AddItem'
import AddTest from './AddTest'
import AddQuestionModal from './AddQuestionModal'
import TestIndex from './TestIndex'
import { Link } from 'react-router-dom'

export default class TestNav extends Component {
  state = { activeItem: 'Tests', setNewQuestion: false, setNewTest: false }
  
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  

 
  render() {
    const { activeItem } = this.state
    const contentJSX = activeItem === 'Questions' ? 
        <QuestionIndex  user={this.props.user} setNewQuestion={this.props.setNewQuestion} msgAlert={this.props.msgAlert}/>
        :
        <TestIndex  user={this.props.user} setNewQuestion={this.props.setNewQuestion} msgAlert={this.props.msgAlert} setNewTest={this.props.setNewTest}/>

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
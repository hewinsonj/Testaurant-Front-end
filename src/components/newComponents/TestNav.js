import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import QuestionIndex from './QuestionIndex'
import AddItem from './AddItem'
import AddTest from './AddTest'
import { Link } from 'react-router-dom'

export default class TestNav extends Component {
  state = { activeItem: 'Tests' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })


 
  render() {
    const { activeItem } = this.state
    const questionJSX = activeItem === 'Questions' ? 
        <QuestionIndex  user={this.props.user} setNewQuestion={this.props.setNewQuestion} msgAlert={this.props.msgAlert}/>
        :
        
        null

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
        <Menu.Item
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
        </Menu.Item>  
        
      </Menu>
      {questionJSX}
      {/* {testJSX} */}
      {/* {createQJSX} */}
      {createTJSX}
      
      </>
    )
  }
}
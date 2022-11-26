import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import QuestionIndex from './QuestionIndex'
import AddItem from './AddItem'
import { Link } from 'react-router-dom'

export default class TestNav extends Component {
  state = { activeItem: 'food' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })


 
  render() {
    const { activeItem } = this.state
    const activitiesJSX = (activeItem === 'Questions') ? 
        <QuestionIndex  user={this.props.user} setNewQuestion={this.props.setNewQuestion} msgAlert={this.props.msgAlert}/>
        :
        // <DrinksPage />
        <AddItem user={this.props.user} setNewQuestion={this.props.setNewQuestion} msgAlert={this.props.msgAlert} activeItem={this.props.activeItem}/>
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
      {activeItem === 'add item' ? <AddItem/> : activitiesJSX}
      
      </>
    )
  }
}
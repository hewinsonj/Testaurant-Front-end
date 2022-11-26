import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import MenuPage from './MenuPage'
import DrinksPage from './DrinksPage'
import AddItem from './AddItem'
import { Link } from 'react-router-dom'

export default class MenuExampleTabular extends Component {
  state = { activeItem: 'food' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    const activitiesJSX = (activeItem === 'food') ? 
        <MenuPage/>
        :
        // <DrinksPage />
        <AddItem user={this.props.user} setNewQuestion={this.props.setNewQuestion} msgAlert={this.props.msgAlert}/>
    return (
        <>
      <Menu tabular>
        <Menu.Item
          name='food'
          active={activeItem === 'food'}
          onClick={this.handleItemClick}
        >
        </Menu.Item>
        <Menu.Item
          name='drinks'
          active={activeItem === 'drinks'}
          onClick={this.handleItemClick}
        >
            
        </Menu.Item>  
        <Menu.Item
          name='add item'
          active={activeItem === 'add item'}
          onClick={this.handleItemClick}
        >
        </Menu.Item>    
        
      </Menu>
      {/* {activeItem === 'add item' ? <AddItem/> : } */}
      {activitiesJSX}
      </>
    )
  }
}
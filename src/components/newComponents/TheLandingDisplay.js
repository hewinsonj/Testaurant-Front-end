import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import FoodIndexPage from './FoodIndexPage'
import DrinkIndexPage from './DrinkIndexPage'
import AddItem from './AddItem'
import { Link } from 'react-router-dom'

export default class MenuNav extends Component {
  state = { activeItem: 'food', setNewFood: false, setNewDrink: false }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    const activitiesJSX = (activeItem === 'food') ? 
        <FoodIndexPage user={this.props.user} setNewFood={this.props.setNewFood} msgAlert={this.props.msgAlert}/>
        :
        // <DrinksPage />
        <DrinkIndexPage user={this.props.user} setNewDrink={this.props.setNewDrink} msgAlert={this.props.msgAlert}/>
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
        
      </Menu>
      {/* {activeItem === 'add item' ? <AddItem/> : } */}
      {activitiesJSX}
      </>
    )
  }
}
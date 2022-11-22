import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import MenuPage from './MenuPage'
import DrinksPage from './DrinksPage'
import { Link } from 'react-router-dom'

export default class MenuExampleTabular extends Component {
  state = { activeItem: 'food' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    const activitiesJSX = (activeItem === 'food') ? 
        <MenuPage/>
        :
        <DrinksPage />
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
      {activitiesJSX}
      </>
    )
  }
}
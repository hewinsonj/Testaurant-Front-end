import React, { Component } from 'react'
import { Grid, Menu, Segment, Label, Input } from 'semantic-ui-react'
import LoadingScreen from '../shared/LoadingPage'
import { Link } from 'react-router-dom'


export default class NewLandingPage extends Component {
  state = { activeItem: 'home'}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const { activeItem } = this.state

    return (
        <>
            {/* <div id='long'> */}
                {/* <div id='stretch'>Something</div> */}
                <Menu tabular inverted  id='header'  size='massive' >
                    <Menu.Item
                    name='sign-up'
                    active={activeItem === 'sign-up'}
                    onClick={this.handleItemClick}
                    >
                        <Link to='sign-up'>
                            Create Account
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                    name='sign-in'
                    active={activeItem === 'sign-in'}
                    onClick={this.handleItemClick}
                    >
                        <Link to='sign-in'>
                            Sign in
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                    name='sign-out'
                    active={activeItem === 'sign-out'}
                    onClick={this.handleItemClick}
                    >
                        <Link to='sign-out'>
                            Sign out
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                    name='tests'
                    active={activeItem === 'tests'}
                    onClick={this.handleItemClick}
                    >
                        <Link to='test-nav'>
                            Tests
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                    name='lessons'
                    active={activeItem === 'lessons'}
                    onClick={this.handleItemClick}
                    >
                        <Link to='lessons'>
                            Lessons
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                    name='menu'
                    active={activeItem === 'menu'}
                    onClick={this.handleItemClick}
                    >
                        <Link to='menu-nav'>
                            Menu
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                    name='employees'
                    active={activeItem === 'employees'}
                    onClick={this.handleItemClick}
                    >
                        <Link to='employees'>
                            Employees
                        </Link>
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item
                        name='change-pw'
                        active={activeItem === 'change-pw'}
                        onClick={this.handleItemClick}
                        >
                            <Link to='change-password'>
                                Change-Password
                            </Link>
                        </Menu.Item>
                        <Menu.Item
                        name='testaurant'
                        active={activeItem === 'testaurant'}
                        onClick={this.handleItemClick}
                        >
                            <Link to='my-profile'>
                                <h1>Testaurant</h1>
                            </Link>
                        </Menu.Item>
                        

                    </Menu.Menu>
                </Menu>
        {/* </div> */}
    </>
    )
  }
}
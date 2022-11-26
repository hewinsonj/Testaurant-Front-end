// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import SignPage from './components/shared/SignPage'
import UserPage from './components/user/UserPage'
import UserPublicPage from './components/user/UserPublicPage'
import ChangePassword from './components/auth/ChangePassword'
import FeedPage from './components/activities/FeedPage'
import ShowActivity from './components/activities/ShowActivity'
import IndexActivity from './components/activities/IndexActivity'
import NewLandingPage from './components/newComponents/NewLandingPage'
import EmployeePage from './components/newComponents/EmployeePage'
import MenuPage from './components/newComponents/MenuPage'
import MenuNavPage from './components/newComponents/MenuNav'
import TestNav from './components/newComponents/TestNav'

// import CreateActivity from './components/activities/CreateActivity'
// import UpdateActivity from './components/activities/UpdateActivity'


const App = () => {

  const [user, setUser] = useState(null)
  const [viewedUser, setViewedUser] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])
  //trigger to help components update if there is a new activity created w/in the modal, which can be called from anywhere. This is purely a toggle and no meaning should be taken from whether it is true or false
  const [newActivity, setNewActivity] = useState(false)
  const [newQuestion, setNewQuestion] = useState(false)


  const clearUser = () => {
    setUser(null)
  }

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
      )
		})
	}

		return (
			<Fragment>
				{msgAlerts.map((msgAlert) => (
					<AutoDismissAlert
						key={msgAlert.id}
						heading={msgAlert.heading}
						variant={msgAlert.variant}
						message={msgAlert.message}
						id={msgAlert.id}
						deleteAlert={deleteAlert}
					/>
				))}
				{/* <Header user={user} msgAlert={msgAlert} setNewActivity={setNewActivity} /> */}
				<NewLandingPage user={user} msgAlert={msgAlert} setNewQuestion={setNewQuestion} />
				<Routes>
					<Route path='/' element={<Home user={user} msgAlert={msgAlert} setUser={setUser} />} />
					<Route
						path='/sign-up'
						element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route path='/my-profile/' element={<UserPage msgAlert={msgAlert} user={user} newQuestion={newQuestion} />} />
					
					<Route path='/user-public-page/:otherUserId' element={<UserPublicPage msgAlert={msgAlert} currentUser={user} viewedUser={viewedUser}/>} />
					<Route
						path='/sign-in'
						element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/sign-out'
						element={
						<RequireAuth user={user}>
							<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
						</RequireAuth> 
						}
					/>
					<Route
						path='/sign-page'
						element={<SignPage msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/change-password'
						element={
						<RequireAuth user={user}>
							<ChangePassword msgAlert={msgAlert} user={user} />
						</RequireAuth>
					}
					/>
					<Route
						path='/feed-page/:otherUserId'
						element={
							<FeedPage msgAlert={msgAlert} currentUser={user}  />
					}
					/>
					<Route
						path='/show-page/:activityId'
						element={
							<ShowActivity msgAlert={msgAlert} user={user} />
					}
					/>
					<Route
						path='/new-landing-page'
						element={
							<NewLandingPage msgAlert={msgAlert} user={user} newQuestion={newQuestion}/>
					}
					/>
					<Route
						path='/activities'
						element={
							<IndexActivity msgAlert={msgAlert} user={user} />
					}
					/>
					<Route
						path='/menu'
						element={
							<MenuPage msgAlert={msgAlert} user={user} />
					}
					/>
					<Route
						path='/menu-nav'
						element={
							<MenuNavPage msgAlert={msgAlert} user={user} setNewQuestion={setNewQuestion} />
					}
					/>
					<Route
						path='/test-nav'
						element={
							<TestNav msgAlert={msgAlert} user={user} setNewQuestion={setNewQuestion} />
					}
					/>
					<Route
						path='/employees'
						element={
							<EmployeePage msgAlert={msgAlert} user={user} />
					}
					/>
					{/* <Route
						path='/user-page'
						element={
						<RequireAuth user={user}>
							<CreateActivity msgAlert={msgAlert} user={user} />
						</RequireAuth>
					}
					/> */}
				</Routes>
				
			</Fragment>
		)
}

export default App

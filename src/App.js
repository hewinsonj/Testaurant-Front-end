// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { v4 as uuid } from "uuid";

import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import RequireAuth from './components/shared/RequireAuth'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import SignPage from './components/shared/SignPage'
import UserPage from './components/newComponents/UserPage'
import ChangePassword from './components/auth/ChangePassword'
import NewLandingPage from './components/newComponents/NewLandingPage'
import FoodIndexPage from './components/newComponents/FoodIndexPage'
import MenuNav from './components/newComponents/MenuNav'
import TestNav from './components/newComponents/TestNav'
import AddTest from './components/newComponents/AddTest'
import AddQuestionModal from './components/newComponents/AddQuestionModal'
import QuestionShow from './components/newComponents/QuestionShow'
import TestTakePage from './components/newComponents/TestTakePage'
import ResultsPage from './components/newComponents/ResultsPage'
import TheLandingDisplay from './components/newComponents/TheLandingDisplay'
import EmployeePage from './components/newComponents/EmployeePage'
// import { getAllTests } from './api/test'
// import { getAllQuestions } from './api/question'

const App = () => {
  const [user, setUser] = useState(null);
  //   const [viewedUser, setViewedUser] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([]);
  const [newQuestion, setNewQuestion] = useState(false);
  const [newTest, setNewTest] = useState(false);
  const [newFood, setNewFood] = useState(false);
  const [activeItem, setActiveItem] = useState("testaurant");

  const clearUser = () => {
    setUser(null);
  };

  const deleteAlert = (id) => {
    setMsgAlerts((prevState) => {
      return prevState.filter((msg) => msg.id !== id);
    });
  };

  const msgAlert = ({ heading, message, variant }) => {
    const id = uuid();
    setMsgAlerts(() => {
      return [{ heading, message, variant, id }];
    });
  };

  return (
    <>
      <NewLandingPage
        user={user}
        msgAlert={msgAlert}
        setNewQuestion={setNewQuestion}
        setNewTest={setNewTest}
        setUser={setUser}

      />

      <Routes>
        <Route
          path="/"
          element={
            <TheLandingDisplay
              user={user}
              msgAlert={msgAlert}
              setUser={setUser}
            />
          }
        />
        <Route
          path="/sign-up"
          element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
        />
        <Route
          path="/my-profile/"
          element={
            <UserPage
              msgAlert={msgAlert}
              user={user}
              newQuestion={newQuestion}
            />
          }
        />

        <Route
          path="/sign-in"
          element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
        />
        <Route
          path="/sign-out"
          element={
            <RequireAuth user={user}>
              <SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
            </RequireAuth>
          }
        />
        <Route
          path="/sign-page"
          element={<SignPage msgAlert={msgAlert} setUser={setUser} />}
        />
        <Route
          path="/change-password"
          element={
            <RequireAuth user={user}>
              <ChangePassword msgAlert={msgAlert} user={user} />
            </RequireAuth>
          }
        />
        <Route
          path="/new-landing-page"
          element={
            <NewLandingPage
              msgAlert={msgAlert}
              user={user}
              newQuestion={newQuestion}
              activeItem={activeItem}
            />
          }
        />
        <Route
          path="/food-index"
          element={<FoodIndexPage msgAlert={msgAlert} user={user} />}
        />
        <Route
          path="/menu-nav"
          element={
            <MenuNav msgAlert={msgAlert} user={user} setNewFood={setNewFood} />
          }
        />
        <Route
          path="/test-nav"
          element={
            <TestNav
              msgAlert={msgAlert}
              user={user}
              setNewQuestion={setNewQuestion}
              setNewTest={setNewTest}
            />
          }
        />
        <Route
          path="/test-add"
          element={
            <AddTest
              msgAlert={msgAlert}
              user={user}
              setNewQuestion={setNewQuestion}
              setNewTest={setNewTest}
            />
          }
        />
        <Route
          path="/question-modal"
          element={
            <AddQuestionModal
              msgAlert={msgAlert}
              user={user}
              setNewQuestion={setNewQuestion}
            />
          }
        />
        <Route
          path="/question-show/:questionId/"
          element={<QuestionShow msgAlert={msgAlert} user={user} />}
        />
        <Route
          path="/test-take-page/:testId/"
          element={<TestTakePage msgAlert={msgAlert} user={user} />}
        />
        <Route
          path="/results/"
          element={<ResultsPage msgAlert={msgAlert} user={user} setUset={setUser}/>}
        />
        <Route
          path="/employees/"
          element={<EmployeePage msgAlert={msgAlert} user={user} />}
        />
      </Routes>
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
    </>
  );
};

export default App;

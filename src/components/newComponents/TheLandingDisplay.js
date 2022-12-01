import React, { useEffect, useState } from "react"
import { Label, Icon, Item, Button, Segment, Grid, Comment, Form, Modal, Progress, Divider } from 'semantic-ui-react'
import { useNavigate, useParams} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getTest, updateTest, deleteTest } from '../../api/test'
import { getQuestion, getAllQuestions } from "../../api/question"
import TestUpdateModal from "./TestUpdateModal"
import LoadingScreen from "../shared/LoadingPage"



const TheLandingDisplay = ({ user, msgAlert, test}) => {


  return(
    <>  
      <h1>Testaurant</h1>
      <h2>Know What You're Serving!</h2>
    </>
  )
}


export default TheLandingDisplay
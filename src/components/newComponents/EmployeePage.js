import React, { useEffect, useState } from "react";
import { Icon, Item, Button, Grid, Comment, Form, Modal, Search, Header, Segment, Select, Input} from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getAllEmployees } from '../../api/user'
import { getAllTests } from '../../api/test'
// import { act } from "react-dom/test-utils";
// import SearchBar from "../SearchBar/Search";




const EmployeePage = ({ user, msgAlert }) => {
    //set state for all public activities, filtered activities based on search
    const [allEmployees, setAllEmployees] = useState([])
    const [allTests, setAllTests] = useState(null)
    // const [filterActivities, setFilterActivities] = useState([])
    // const [searchText, setSearchText] = useState([])

    //function for filtering as user types in activity name
    // const handleChange = (e) => {
    //     let activities = allActivities
    //     setFilterActivities(activities.filter(
    //     a => a.activity.includes(e.target.value) || a.type.includes(e.target.value))
    //     )
    // }

    // const genderOptions = () => {
    // for (let i = 0; i < allTests.length; i++) {
    //     { {key}: 'm', text: 'Male', value: 'male' },
    //     { key: 'f', text: 'Female', value: 'female' },
    //     { key: 'o', text: 'Other', value: 'other' },
    //   } return 
    // }


    useEffect(() => {
        
        getAllTests(user)
            .then(res => {
                setAllTests(res.data.test_thiss)
            })
            .catch(error => {
                msgAlert({
                    'heading': 'Error',
                    'message': 'Could not get tests',
                    'variant': 'danger'
                })
            })
    },[])

    useEffect(() => {
        getAllEmployees(user)
        .then(res => {
            setAllEmployees(res.data.users)
            // setFilterActivities(res.data.activities)
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Index Employees failed' + error,
                variant: 'danger'
            })
        })
    },[])

    // const allActivitiesJSX = allActivities.map(activity => {
    //     return (
    //         <Link to={`/activities/${activity._id}`} key={activity._id}>
    //             <li>
    //             activity: {activity.name} accessibility: {activity.accessibility} 
    //             type: {activity.type} participants: {activity.participants} 
    //             price: {activity.price} progress: {activity.progress} 
    //             </li>
    //         </Link>
    //     )
    // })

    const Index = allEmployees.map(employee => (
            <Grid centered stretched >
                <div id='empContainer'>
                <Grid.Row padded>
                    <Segment fluid key={ employee.id }>
                        <Grid columns={5} verticalAlign='middle'>
                            <Grid.Column >
                                {/* <h3>{activities.owner.email}</h3> */}
                                <h3>{employee.email}</h3>
                                
                               
                            </Grid.Column>
                            <Grid.Column>
                                <h3>Assign a Test: </h3>
                                <Form>
                                    <Form.Field
                                        control={Select}
                                        // options={genderOptions}
                                        placeholder='select a test'
                                        search
                                        searchInput={{ id: 'form-select-control-gender' }}
                                    />
                                    
                                </Form>
                            </Grid.Column>
                            <Grid.Column>
                                <h3>Untaken Tests: </h3>
                                <h3>yearight</h3>
                            </Grid.Column>
                            <Grid.Column>
                                <h3>Taken Tests: </h3>
                                <h3>yea right</h3>
                            </Grid.Column>
                            <Grid.Column>
                                <h3>Hire Date: </h3>
                                <h3>10/10/10</h3>
                            </Grid.Column>

                        </Grid>
                        
                    </Segment>
                </Grid.Row>
                </div>
            </Grid>
    ))

    

return (
    <>
        <Grid centered>
            <div id='empContainer'>
            <Grid.Row padded fluid>
                    <Segment raised fluid >
                    <h1>All Employees</h1>
                    <div className="headerSearch">
                <Form >
                    <Form.Input
                        placeholder='Type  here  to  filter  results  by  activity  name  or  type'
                    >
                    </Form.Input>
                </Form>
                    </div>
                    </Segment>
            </Grid.Row>
            </div>
        </Grid>
        {Index}
    </>
)


}

export default EmployeePage
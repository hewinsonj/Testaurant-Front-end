import React, { useEffect, useState } from "react";
import { Icon, Item, Button, Grid, Comment, Form, Modal, Search, Header, Segment, Select, Input} from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getAllActivities } from '../../api/activity'
// import { act } from "react-dom/test-utils";
// import SearchBar from "../SearchBar/Search";

const genderOptions = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ]


const EmployeePage = ({ user, msgAlert }) => {
    //set state for all public activities, filtered activities based on search
    const [allActivities, setAllActivities] = useState([])
    const [filterActivities, setFilterActivities] = useState([])
    const [searchText, setSearchText] = useState([])

    //function for filtering as user types in activity name
    const handleChange = (e) => {
        let activities = allActivities
        setFilterActivities(activities.filter(
        a => a.activity.includes(e.target.value) || a.type.includes(e.target.value))
        )
    }
    
    useEffect(() => {
        getAllActivities(user)
        .then(res => {
            setAllActivities(res.data.activities)
            setFilterActivities(res.data.activities)
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Index Activities failed' + error,
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

    const Index = filterActivities.map(activities => (
            <Grid centered stretched >
                <div id='empContainer'>
                <Grid.Row padded>
                    <Segment fluid key={ activities.id }>
                        <Grid columns={5} verticalAlign='middle'>
                            <Grid.Column >
                                {/* <h3>{activities.owner.email}</h3> */}
                                <h3>(Employee Name)</h3>
                                
                               
                            </Grid.Column>
                            <Grid.Column>
                                <h3>Assign a Test: </h3>
                                <Form>
                                    <Form.Field
                                        control={Select}
                                        options={genderOptions}
                                        placeholder='select a test'
                                        search
                                        searchInput={{ id: 'form-select-control-gender' }}
                                    />
                                    
                                </Form>
                            </Grid.Column>
                            <Grid.Column>
                                <h3>Untaken Tests: </h3>
                                <h3>{activities.participants}</h3>
                            </Grid.Column>
                            <Grid.Column>
                                <h3>Taken Tests: </h3>
                                <h3>{activities.price}</h3>
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
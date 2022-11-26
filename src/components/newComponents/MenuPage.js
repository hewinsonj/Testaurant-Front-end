import React, { useEffect, useState } from "react";
import { Icon, Item, Button, Grid, Comment, Form, Modal, Search, Header, Segment, Card} from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getAllActivities } from '../../api/activity'
// import { act } from "react-dom/test-utils";
// import SearchBar from "../SearchBar/Search";




const MenuPage = ({ user, msgAlert }) => {
    //set state for all public activities, filtered activities based on search
    const [allActivities, setAllActivities] = useState([])
    const [filterActivities, setFilterActivities] = useState([])
    const [searchText, setSearchText] = useState([])

    //function for filtering as user types in activity name
    // const handleChange = (e) => {
    //     let activities = allActivities
    //     setFilterActivities(activities.filter(
    //     a => a.activity.includes(e.target.value) || a.type.includes(e.target.value))
    //     )
    // }
    
    // useEffect(() => {
    //     getAllActivities(user)
    //     .then(res => {
    //         setAllActivities(res.data.activities)
    //         setFilterActivities(res.data.activities)
    //     })
    //     .catch((error) => {
    //         msgAlert({
    //             heading: 'Failure',
    //             message: 'Index Activities failed' + error,
    //             variant: 'danger'
    //         })
    //     })
    // },[])

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

    // const Index = filterActivities.map(activities => (
    //     <div id='menuItemBox'>
    //     <Grid  centered >
    //         <Grid.Column verticalAlign='middle' textAlign="center" >
                
    //             <Card
    //                 href='#card-example-link-card'
    //                 header='VLT'
    //                 meta='Friend'
    //                 description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
    //             />
    //         </Grid.Column>
    //     </Grid>
    //     </div>
    // ))

    

return (
    <>
        <Segment inverted color='yellow' class="capitalize-me">
            <Grid centered stretched>
                <Grid.Row padded>
                        <Segment raised >
                        <h1>Food</h1>
                        <div className="headerSearch">
                    {/* <form className="searchForm" >
                        <input className="headerSearchInput" type="text" onChange={handleChange} />
                        <input type="submit" value="Search"></input>
                    </form> */}

                    <Form >
                        <Form.Input
                            placeholder='Type  here  to  filter  results  by  activity  name  or  type'
                            // onChange={handleChange}
                            >
                            
                        </Form.Input>
                    </Form>
                    </div>
                        </Segment>
                </Grid.Row>
            </Grid>
        </Segment>
        <Segment centered>
        <div id='menuItems'>
        {/* {Index} */}
        </div>
        </Segment>
    </>
)


}

export default MenuPage
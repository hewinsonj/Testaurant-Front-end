import apiUrl from '../apiConfig'
import axios from 'axios'



// USING API FOR HOME PAGE FEED!
// export const HomeFeed = (user) => {
// 	return axios({
// 		method: 'GET',
// 		url: apiUrl + '/'
// 	})
// }

//get all activities (unless marked private)
//data returned: res.data.activities will have all public activities 
export const getAllDrinks = (user) => {
    return axios({
        method: 'GET',
        url: apiUrl + '/drinks/',
        headers: {
            Authorization: `Token ${user.token}`,
        }
    })
}

// For Search Bar to filter all Activities
export const searchDrinks = (searchText) => { 
    return axios({ 
        method: 'POST', 
        url: `${apiUrl}/drinks/`, 
        data: searchText 
        })
    }

//get the logged-in user's activities
//data returned: res.data.activities has all of the user's activities
//res.data.completedCounts is an object w/ the number of completed activities per category (ex: res.data.completedCounts.eduction will be 2 if the user has completed 2 activities)
// export const getMyActivities = (user) => {
//     return axios({
//         method: 'GET',
//         headers: {
//             Authorization: `Token token=${user.token}`
//         },
//         url: `${apiUrl}/activities/mine`
//     })
// }

//get a user's public activities
//data returned: res.data.activities has all of the requested user's public activities
//res.data.completedCounts is an object w/ the number of completed activities per category (ex: res.data.completedCounts.eduction will be 2 if the user has completed 2 activities)
// export const getTheirActivities = (currentUser, requestedUserId) => {
//     return axios({
//         method: 'GET',
//         headers: {
//             Authorization: `Token token=${currentUser.token}`
//         },
//         url: `${apiUrl}/activities/user/${requestedUserId}`
//     })
// }

//get a single activity 
//data returned: res.data.activity is the activity object itself (including all notes as res.data.notes)
//res.data.publicNotes has all notes associated with the activity which have been marked a private by their authors 
//res.data.privateViewableNotes has all notes in the activity which have been marked private BUT which were authored by the current user making the request
export const getDrink = (user, drinkId) => {
    return axios({
        method: 'GET',
        headers: {
            Authorization: `Token ${user.token}`
        },
        url: `${apiUrl}/drinks/${drinkId}`
    })
}
//create an activity 
//data returned: res.data.activity will be the new activity 
export const createDrink = (user, drink) => {
    return axios({
        method: 'POST',
        headers: {
            Authorization: `Token ${user.token}`
        },
        url: apiUrl + '/drinks/',
        data: {
            "drink": {
                "name": drink.name,
                "ingredients": drink.ingredients,
                "garnishes": drink.garnishes,
                "glassware": drink.glassware,
                "prep_instructs": drink.prep_instructs,
                "con_egg": drink.con_egg,
                "con_tree_nut": drink.con_tree_nut,
                "con_peanut": drink.con_peanut,
                "con_shellfish": drink.con_shellfish,
                "con_soy": drink.con_soy,
                "con_fish": drink.con_fish,
                "con_wheat": drink.con_wheat,
                "con_sesame": drink.con_sesame,
                "con_gluten":  drink.con_gluten,
            }
        }
    })
}

// GET a single random activity
// export const randomActivity = (user) => {
//     return axios({
//         method: 'GET',
//         headers: {
//             Authorization: `Token token=${user.token}`
//         },
//         url: apiUrl + '/random'
//     })
// }

//update an activity
//nothing returned
export const updateDrink = (user, updatesToDrink, drinkId) => {
	return axios({
		method: 'PATCH',
        headers: {
			Authorization: `Token ${user.token}`,
		},
		url: `${apiUrl}/drinks/${drinkId}`,
		data: {
			drink: updatesToDrink
		}
	})
}

//delete an activity
//nothing returned 
export const deleteDrink= (user, drinkId) => {
	return axios({
		method: 'DELETE',
        headers: {
			Authorization: `Token ${user.token}`,
		},
		url: `${apiUrl}/drinks/${drinkId}`
	})
}

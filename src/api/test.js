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
export const getAllTests = (user) => {
    return axios({
        method: 'GET',
        url: apiUrl + '/test_thiss/',
        headers: {
            Authorization: `Token ${user.token}`,
        }
    })
}

// For Search Bar to filter all Activities
export const searchTests = (searchText) => { 
    return axios({ 
        method: 'POST', 
        url: `${apiUrl}/test_thiss/`, 
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
export const getTest = (user, testId) => {
    return axios({
        method: 'GET',
        headers: {
            Authorization: `Token ${user.token}`
        },
        url: `${apiUrl}/test_thiss/${testId}`
    })
}
//create an activity 
//data returned: res.data.activity will be the new activity 
export const createTest = (user, test) => {
    return axios({
        method: 'POST',
        headers: {
            Authorization: `Token ${user.token}`
        },
        url: apiUrl + '/test_thiss/',
        data: {
            "question_news_data": {
                "id": test.question_news_id
                
            },
            "test_this": {
                "name": test.name,
                "created_at": test.created_at,
                "updated_at": test.updated_at,
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
export const updateTest = (user, updatesToTest, testId) => {
	return axios({
		method: 'PATCH',
        headers: {
			Authorization: `Token ${user.token}`,
		},
		url: `${apiUrl}/test_thiss/${testId}`,
		data: {
			test_this: updatesToTest
		}
	})
}

//delete an activity
//nothing returned 
export const deleteTest= (user, testId) => {
	return axios({
		method: 'DELETE',
        headers: {
			Authorization: `Token ${user.token}`,
		},
		url: `${apiUrl}/test_thiss/${testId}`
	})
}

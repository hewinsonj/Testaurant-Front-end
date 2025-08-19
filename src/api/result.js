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
export const getAllResults = (user) => {
    return axios({
        method: 'GET',
        url: apiUrl + '/results/',
        headers: {
            Authorization: `Token ${user.token}`,
        }
    })
}
  
  export const getMyResults = (user) => {
    return axios({
      method: 'GET',
      url: apiUrl + '/results/mine/',
      headers: { Authorization: `Token ${user.token}` },
    })
  }

// For Search Bar to filter all Activities
export const searchResults = (searchText) => { 
    return axios({ 
        method: 'POST', 
        url: `${apiUrl}/results/`, 
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

//get a single result 
//data returned: res.data.result is the result object itself (including all notes as res.data.notes)
//res.data.publicNotes has all notes associated with the result which have been marked a private by their authors 
//res.data.privateViewableNotes has all notes in the result which have been marked private BUT which were authored by the current user making the request
export const getResult = (user, resultId) => {
    return axios({
        method: 'GET',
        headers: {
            Authorization: `Token ${user.token}`
        },
        url: `${apiUrl}/results/${resultId}`
    })
}
//create a result 
//data returned: res.data.result will be the new result 
export const createResult = (user, result) => {
    // console.log(result, 'this is result right before my api request')
    return axios({
        method: 'POST',
        headers: {
            Authorization: `Token ${user.token}`
        },
        url: apiUrl + '/results/',
        data: {
            "result": {
                "score": result.score,
                "correct": result.correct,
                "wrong": result.wrong,
                "total": result.total,
                "percent": result.percent,
                "time": result.time,
                "the_test": result.the_test
              }
        }
    })
}

//delete a result
//nothing returned 
export const deleteResult= (user, resultId) => {
	return axios({
		method: 'DELETE',
        headers: {
			Authorization: `Token ${user.token}`,
		},
		url: `${apiUrl}/results/${resultId}`
	})
}

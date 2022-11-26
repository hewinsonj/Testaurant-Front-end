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
export const getAllQuestions = (user) => {
    return axios({
        method: 'GET',
        url: apiUrl + '/question_news/',
        headers: {
            Authorization: `Token ${user.token}`,
        }
    })
}

// For Search Bar to filter all Activities
export const searchQuestions = (searchText) => { 
    return axios({ 
        method: 'POST', 
        url: `${apiUrl}/questions`, 
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
// export const getQuestion = (user, questionId) => {
//     return axios({
//         method: 'GET',
//         headers: {
//             Authorization: `Token token=${user.token}`
//         },
//         url: `${apiUrl}/questions/${questionId}`
//     })
// }
//create an activity 
//data returned: res.data.activity will be the new activity 
export const createQuestion = (user, question) => {
    return axios({
        method: 'POST',
        headers: {
            Authorization: `Token ${user.token}`
        },
        url: apiUrl + '/question_news/',
        data: {
            "question_new": {
                "question_str": question.question_str,
                "option1": question.option1,
                "option2": question.option2,
                "option3": question.option3,
                "option4": question.option4,
                "answer": question.answer,
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
export const updateQuestion = (user, updatesToQuestion, questionId) => {
	return axios({
		method: 'PATCH',
        headers: {
			Authorization: `Token token=${user.token}`,
		},
		url: `${apiUrl}/questions/${questionId}`,
		data: {
			question: updatesToQuestion
		}
	})
}

//delete an activity
//nothing returned 
export const deleteQuestion= (user, questionId) => {
	return axios({
		method: 'DELETE',
        headers: {
			Authorization: `Token token=${user.token}`,
		},
		url: `${apiUrl}/activities/${questionId}`
	})
}

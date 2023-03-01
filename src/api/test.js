import apiUrl from '../apiConfig'
import axios from 'axios'

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


//get a single test 

export const getTest = (user, testId) => {
    return axios({
        method: 'GET',
        headers: {
            Authorization: `Token ${user.token}`
        },
        url: `${apiUrl}/test_thiss/${testId}`
    })
}
//create a test
//data returned: res.data.test will be the new test 
export const createTest = (user, test) => {
    console.log(test, 'this be the test right before my api request')
    return axios({
        method: 'POST',
        headers: {
            Authorization: `Token ${user.token}`
        },
        url: apiUrl + '/test_thiss/',
        data: {
            "test_this": {
                "name": test.name,
                "question_new": test.question_new,
                "owner": user.id,
            },
        }
    })
}


//update a test
//nothing returned
export const updateTest = (user, updatesToTest, testId) => {
    // console.log(updatesToTest, 'test right before my update api request')
	return axios({
		method: 'PATCH',
        headers: {
			Authorization: `Token ${user.token}`,
		},
		url: `${apiUrl}/test_thiss/${testId}/`,
		data: {
			test_this: updatesToTest
            // "test_this": {
            //     "name": test.name,
            //     "question_new": test.question_new,
            // },
		}
	})
}

//delete a test
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

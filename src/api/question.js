import apiUrl from '../apiConfig'
import axios from 'axios'

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

//get a single question 

export const getQuestion = (user, questionId) => {
    return axios({
        method: 'GET',
        headers: {
            Authorization: `Token ${user.token}`
        },
        url: `${apiUrl}/question_news/${questionId}`
    })
}
//create a question 
//data returned: res.data.question will be the new question 
export const createQuestion = (user, question) => {
    // Normalize restaurant to an id or null
    const r = question?.restaurant;
    let restaurantId = null;
    if (r !== undefined && r !== null && r !== '') {
        if (typeof r === 'object') {
            restaurantId = r.id ?? r.pk ?? null;
        } else {
            const n = Number(r);
            restaurantId = Number.isFinite(n) ? n : null;
        }
    }

    return axios({
        method: 'POST',
        headers: {
            Authorization: `Token ${user.token}`
        },
        url: apiUrl + '/question_news/',
        data: {
            question_new: {
                question_str: question.question_str,
                option1: question.option1,
                option2: question.option2,
                option3: question.option3,
                option4: question.option4,
                answer: question.answer,
                restaurant: restaurantId,
            }
        }
    })
}

//update a question
//nothing returned
export const updateQuestion = (user, updatesToQuestion, questionId) => {
    const next = { ...updatesToQuestion };
    if (Object.prototype.hasOwnProperty.call(next, 'restaurant')) {
        const r = next.restaurant;
        if (r === '' || r === undefined) {
            next.restaurant = null;
        } else if (typeof r === 'object') {
            next.restaurant = r?.id ?? r?.pk ?? null;
        } else {
            const n = Number(r);
            next.restaurant = Number.isFinite(n) ? n : null;
        }
    }
    return axios({
        method: 'PATCH',
        headers: {
            Authorization: `Token ${user.token}`,
        },
        url: `${apiUrl}/question_news/${questionId}/`,
        data: {
            question_new: next,
        }
    })
}

//delete a question
//nothing returned 
export const deleteQuestion= (user, questionId) => {
	return axios({
		method: 'DELETE',
        headers: {
			Authorization: `Token ${user.token}`,
		},
		url: `${apiUrl}/question_news/${questionId}`
	})
}

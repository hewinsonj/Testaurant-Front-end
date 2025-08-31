import apiUrl from '../apiConfig'
import axios from 'axios'

//get all activities (unless marked private)
//data returned: res.data.activities will have all public activities 
export const getAllFoods = (user) => {
    return axios({
        method: 'GET',
        url: apiUrl + '/foods/',
        headers: {
            Authorization: `Token ${user.token}`,
        }
    })
}

// For Search Bar to filter all Activities
export const searchFoods = (searchText) => { 
    return axios({ 
        method: 'POST', 
        url: `${apiUrl}/foods/`, 
        data: searchText 
        })
    }

//get a single food 
export const getFood = (user, foodId) => {
    return axios({
        method: 'GET',
        headers: {
            Authorization: `Token ${user.token}`
        },
        url: `${apiUrl}/foods/${foodId}`
    })
}
//create an food 
//data returned: res.data.food will be the new food 
export const createFood = (user, food) => {
    return axios({
        method: 'POST',
        headers: {
            Authorization: `Token ${user.token}`
        },
        url: apiUrl + '/foods/',
        data: {
            "food": {
                "name": food.name,
                "ingredients": food.ingredients,
                "con_egg": food.con_egg,
                "con_tree_nut": food.con_tree_nut,
                "con_peanut": food.con_peanut,
                "con_shellfish": food.con_shellfish,
                "con_soy": food.con_soy,
                "con_fish": food.con_fish,
                "con_wheat": food.con_wheat,
                "con_sesame": food.con_sesame,
                "con_gluten": food.con_gluten,
                "con_dairy": food.con_dairy,
                "is_vegan": food.is_vegan,
                "is_vegetarian": food.is_vegetarian,
                "restaurant": food.restaurant,

            }
        }
    })
}

//update an food
//nothing returned
export const updateFood = (user, updatesToFood, foodId) => {
	return axios({
		method: 'PATCH',
        headers: {
			Authorization: `Token ${user.token}`,
		},
		url: `${apiUrl}/foods/${foodId}/`,
		data: {
			food: updatesToFood
		}
	})
}

//delete an food
//nothing returned 
export const deleteFood = (user, foodId) => {
	return axios({
		method: 'DELETE',
        headers: {
			Authorization: `Token ${user.token}`,
		},
		url: `${apiUrl}/foods/${foodId}`
	})
}

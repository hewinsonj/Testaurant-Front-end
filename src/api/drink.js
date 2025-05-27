import apiUrl from '../apiConfig'
import axios from 'axios'

//get all drinks (unless marked private)
//data returned: res.data.drinks will have all drinks 
export const getAllDrinks = (user) => {
    return axios({
        method: 'GET',
        url: apiUrl + '/drinks/',
        headers: {
            Authorization: `Token ${user.token}`,
        }
    })
}

// For Search Bar to filter all drinks
export const searchDrinks = (searchText) => { 
    return axios({ 
        method: 'POST', 
        url: `${apiUrl}/drinks/`, 
        data: searchText 
        })
    }

//get a single drink

export const getDrink = (user, drinkId) => {
    return axios({
        method: 'GET',
        headers: {
            Authorization: `Token ${user.token}`
        },
        url: `${apiUrl}/drinks/${drinkId}`
    })
}
//create an drink
//data returned: res.data.drink will be the new drink
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
                "con_dairy": drink.con_dairy,
                "is_vegan": drink.is_vegan,
                "is_vegetarian": drink.is_vegetarian,
            }
        }
    })
}

//update a Drink
//nothing returned
export const updateDrink = (user, updatesToDrink, drinkId) => {
	return axios({
		method: 'PATCH',
        headers: {
			Authorization: `Token ${user.token}`,
		},
		url: `${apiUrl}/drinks/${drinkId}/`,
		data: {
			drink: updatesToDrink
		}
	})
}

//delete a drink
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

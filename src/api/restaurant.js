import apiUrl from '../apiConfig'
import axios from 'axios'

// get all restaurants
// data returned: res.data.restaurants will have all restaurants
export const getAllRestaurants = (user) => {
    const headers = user?.token ? { Authorization: `Token ${user.token}` } : {}
    return axios({
        method: 'GET',
        url: apiUrl + '/restaurants/',
        headers,
    })
}

// get a single restaurant
export const getRestaurant = (user, restaurantId) => {
    return axios({
        method: 'GET',
        headers: {
            Authorization: `Token ${user.token}`
        },
        url: `${apiUrl}/restaurants/${restaurantId}`
    })
}

// create a restaurant
// data returned: res.data.restaurant will be the new restaurant
export const createRestaurant = (user, restaurant) => {
    const payload = {
        "restaurant": {
            "name": restaurant.name,
            "city": restaurant.city,
            "state": restaurant.state,
            "address": restaurant.address,
            "zip_code": restaurant.zip_code,
        }
    }
    console.log('[Restaurant API] creating with payload:', payload, 'token?', Boolean(user?.token))
    return axios({
        method: 'POST',
        headers: {
            Authorization: `Token ${user.token}`
        },
        url: apiUrl + '/restaurants/',
        data: payload
    }).catch(error => {
        console.error('[Restaurant API] create failed', {
            status: error?.response?.status,
            data: error?.response?.data,
            msg: error?.message,
        })
        throw error
    })
}

// update a restaurant
// nothing returned
export const updateRestaurant = (user, updatesToRestaurant, restaurantId) => {
    return axios({
        method: 'PATCH',
        headers: {
            Authorization: `Token ${user.token}`,
        },
        url: `${apiUrl}/restaurants/${restaurantId}/`,
        data: {
            restaurant: updatesToRestaurant
        }
    })
}

// delete a restaurant
// nothing returned
export const deleteRestaurant = (user, restaurantId) => {
    return axios({
        method: 'DELETE',
        headers: {
            Authorization: `Token ${user.token}`,
        },
        url: `${apiUrl}/restaurants/${restaurantId}`
    })
}
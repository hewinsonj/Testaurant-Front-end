import apiUrl from '../apiConfig'
import axios from 'axios'

export const signUp = (credentials) => {
	return axios({
		method: 'POST',
		url: apiUrl + '/sign-up/',
		data: {
				"email": credentials.email,
				"password": credentials.password,
				"password_confirmation": credentials.password_confirmation,
		},
	})
}

export const signIn = (credentials) => {
	return axios({
		url: apiUrl + '/sign-in/',
		method: 'POST',
		data: {
				"email": credentials.email,
				"password": credentials.password,
		},
	})
}


export const signOut = (user) => {
	return axios({
		url: apiUrl + '/sign-out/',
		method: 'DELETE',
		headers: {
			Authorization: `Token ${user.token}`,
		},
	})
}

export const changePassword = (passwords, user) => {
	return axios({
		url: apiUrl + '/change-pw/',
		method: 'PATCH',
		headers: {
			Authorization: `Token ${user.token}`,
		},
		data: {
			"passwords": {
				"old": passwords.oldPassword,
				"new": passwords.newPassword,
				"password_confirmation": passwords.password_confirmation,
			},
		},
	})
}
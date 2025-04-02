import apiUrl from '../apiConfig'
import axios from 'axios'

export const signUp = (credentials) => {
	return axios({
		method: 'POST',
		url: apiUrl + '/sign-up/',
		data: {
			email: credentials.email,
			password: credentials.password,
			password_confirmation: credentials.password_confirmation,
			first_name: credentials.first_name,
			last_name: credentials.last_name,
			role: credentials.role,
			hire_date: credentials.hire_date || null,
			is_superuser: credentials.is_superuser || false,
			is_active: credentials.is_active !== undefined ? credentials.is_active : true,
			is_staff: credentials.is_staff || false,
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
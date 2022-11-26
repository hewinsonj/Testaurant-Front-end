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

// export const signOut = (user) => {
// 	return axios({
// 		url: apiUrl + '/sign-out/',
// 		method: 'DELETE',
// 		data: {
// 			user: user,
// 			token: user.token,
// 		},
// 	})
// }

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




// user = authenticate(request, email=creds['email'], password=creds['password'])

// [26/Nov/2022 00:33:28] "POST /sign-in/ HTTP/1.1" 500 87583
// {'credentials': {'email': ['j@gmail.com'], 'password': ['poopingguy']}}
// Internal Server Error: /sign-in/

// [26/Nov/2022 00:32:44] "POST /sign-in/ HTTP/1.1" 200 7597
// KeyError: 'email'{'credentials': {'email': 'j@gmail.com', 'password': 'poopingguy'}}
// Internal Server Error: /sign-in/


// <QueryDict: {'csrfmiddlewaretoken': ['I3NvqSVFBtRpWppwrnvv4hhWxOVsdCILVmBMnhPXtS8iVSk8Alp3FCNF5GnIGRjE'], 'email': ['j@gmail.com'], 'password': ['poopingguy']}>
// [26/Nov/2022 00:50:27] "POST /sign-in/ HTTP/1.1" 200 7597
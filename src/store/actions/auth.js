import * as actions from './actionTypes';
import axios from 'axios';

export const authStart = () => {
	return {
		type: actions.AUTH_START,
	}
};

export const authSuccess = (idToken, userId) => {
	return {
		type: actions.AUTH_SUCCESS,
		idToken: idToken,
		userId: userId,
	}
};

export const authFail = (error) => {
	return {
		type: actions.AUTH_FAIL,
		error: error,
	}
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationTime');
	localStorage.removeItem('userId');
	return {
		type: actions.AUTH_LOGOUT,
	}
};

export const checkAuthTimeout = (expirationTime) => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	}
}

export const auth = (email, password, isSignup) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};
		let url = 'https://identitytoolkit.googleapis.com/v1/' +
				'accounts:signUp?key=AIzaSyBwKW5KaN0EExzEwhioDKUtmr4qRUzLc_U';
		if (!isSignup) {
			url = 'https://identitytoolkit.googleapis.com/v1/' +
					'accounts:signInWithPassword?key=AIzaSyBwKW5KaN0EExzEwhioDKUtmr4qRUzLc_U';
		}
		axios.post(url, authData)
				.then(response => {
					const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
					localStorage.setItem('token', response.data.idToken);
					localStorage.setItem('expirationTime', expirationTime);
					localStorage.setItem('userId', response.data.localId);
					dispatch(authSuccess(response.data.idToken, response.data.localId));
					dispatch(checkAuthTimeout(response.data.expiresIn));
				})
				.catch(err => {
					// данная форма записи характерна только для объекта ошибки
					// в firebase
					dispatch(authFail(err.response.data.error));
				})
	}
}

export const setAuthRedirectPath = (path) => {
	return {
		type: actions.SET_AUTH_REDIRECT_PATH,
		path: path
	}
}

export const authCheckState = () => {
	// мы создаем thunk не для асинхронности в данном случае,
	// а чтобы сделать dispatch нескольких actions
	return dispatch => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(logout());
		} else {
			const expirationTime = new Date(localStorage.getItem('expirationTime'));
			if (expirationTime > new Date()) {
				// Можно сделать post запрос get user data в firebase,
				// но проще использовать уже ранее использованный localStorage
				// axios.post('https://identitytoolkit.googleapis.com/v1/' +
				// 		'accounts:lookup?key=[AIzaSyBwKW5KaN0EExzEwhioDKUtmr4qRUzLc_U]', {
				// 	idToken: token
				// })
				// 		.then(response => {
				// 			dispatch(authSuccess(token, response.users.localId));
				// 		})
				const userId = localStorage.getItem('userId');
				dispatch(authSuccess(token, userId));
				dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime()) / 1000));
			} else {
				dispatch(logout());
			}

		}
	}
}


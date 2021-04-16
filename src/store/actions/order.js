import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	}
};

export const purchaseBurgerFail = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: error
	}
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	}
};

export const purchaseBurger = (orderData, token) => {
	return dispatch => {
		dispatch(purchaseBurgerStart());

		axios.post('/orders.json?auth=' + token, orderData)
				.then(response => {
					console.log(response.data);
					dispatch(purchaseBurgerSuccess(response.data.name, orderData));

				})
				.catch(error => {
					dispatch(purchaseBurgerFail(error));
				})
	};
};

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	}
};

export const fetchOrdersSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders
	}
};

export const fetchOrdersFail = (error) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error: error
	}
};

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START,
	}
};

export const fetchOrders = (token, userId) => {
	return dispatch => {
		dispatch(fetchOrdersStart());

		// Передаем параметры пользователя, чтобы в ответ firebase прислал
		// в последствии только его orders
		const queryParams = '?auth=' + token + `&orderBy="userId"&equalTo="${userId}"`;

		// мы можем использовать второй параметр getState в return
		// вместо получения параметра token, но лучше не ввязывать
		// действия над состоянием в action creators

		axios.get('/orders.json' + queryParams)
				.then(response => {
					const fetchedOrders = [];
					for (let key in response.data) {
						if (response.data.hasOwnProperty(key)) {
							fetchedOrders.push({
								...response.data[key],
								id: key
							});
						}
					}
					dispatch(fetchOrdersSuccess(fetchedOrders));
				})
				.catch(err => {
					dispatch(fetchOrdersFail(err));
				})
	}
};
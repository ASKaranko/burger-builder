import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from "../../store/actions/index";
import {connect} from "react-redux";
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
	// state = {
	// 	orders: [],
	// 	loading: true,
	// }
	componentDidMount() {
		// Мы заменяем вызов axios здесь на action creators, в котором есть
		// axios, и добавляем dispatch ниже
		// axios.get('/orders.json')
		// 		.then(response => {
		// 			const fetchedOrders = [];
		// 			for (let key in response.data) {
		// 				if (response.data.hasOwnProperty(key)) {
		// 					fetchedOrders.push({
		// 						...response.data[key],
		// 						id: key
		// 					});
		// 				}
		// 			}
		// 			this.setState({loading: false, orders: fetchedOrders});
		// 		})
		// 		.catch(err => {
		// 			this.setState({loading: false});
		// 		}

		this.props.onFetchOrders(this.props.token, this.props.userId);
	}

	render() {
		let orders = <Spinner />;
		if (!this.props.loading) {
			orders = this.props.orders.map(order => (
								<Order
										key={order.id}
										ingredients={order.ingredients}
										price={order.price}
								/>
						));
		}
		return (
			<div>
				{orders}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
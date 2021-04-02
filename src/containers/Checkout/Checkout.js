import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "./ContactData/ContactData";
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

class Checkout extends Component {
	// State удален, заменен state в reducer Redux

	// state = {
	// 	ingredients: null,
	// 	totalPrice: 0,
	// }

	//Извелечение игредиентов и их параметров с помощью location
	// Метод componentWillMount удален, так как используется reducer
	// и параметры игредиентов не передаются более через queryParams

	// componentWillMount() {
	// 	const query = new URLSearchParams(this.props.location.search);
	// 	const ingredients = {};
	// 	let price = 0;
	// 	for (let param of query.entries()) {
	// 		if (param[0] === 'price') {
	// 			price = param[1];
	// 		} else {
	// 			ingredients[param[0]] = +param[1];
	// 		}
	// 	}
	// 	this.setState({ingredients: ingredients, totalPrice: price});
	// }
	//
	// checkoutCancelledHandler = () => {
	// 	this.props.history.goBack();
	// }

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	}

	render() {
		return (
				<div>
					<CheckoutSummary
							ingredients={this.props.ings}
							checkoutCancelled={this.checkoutCancelledHandler}
							checkoutContinued={this.checkoutContinuedHandler}
					/>
					<Route
							path={this.props.match.path + '/contact-data'}
							// используем не component props, а render, чтобы
							// добавить в ContactData компонент props ингредиентов и цены
							// Данный способ имеет особенность: МЫ НЕ ПЕРЕДАЕМ this.props.history, как
							// в случае с component - решение передать это отдельным props в render методе
							// или обернуть ContactData с использованием withRouter
							// render={(props) => (<ContactData
							// 		ingredients={this.props.ings}
							// 		price={this.state.totalPrice} {...props}/>)}

							// Render не нужен, так как используем глобальный Redux state далее
							component={ContactData}
					/>
				</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.ingredients
	}
}

// mapDispatchToProps тут не нужен, так как мы не добавляем никакие actions
// в этом компоненте, если же не нужно было бы состояние, то в connect первым
// параметром нужно было бы указать null

export default connect(mapStateToProps)(Checkout);
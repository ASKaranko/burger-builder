import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "./ContactData/ContactData";
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
// import * as actionTypes from '../../store/actions/index';

class Checkout extends Component {
	// State удален, заменен state в burgerBuilder Redux

	// state = {
	// 	ingredients: null,
	// 	totalPrice: 0,
	// }

	//Извелечение игредиентов и их параметров с помощью location
	// Метод componentWillMount удален, так как используется burgerBuilder
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

	// componentWillMount() {
	// 	// на самом деле подписки в WillMount не вызывают изменение state, поэтому
	// 	// при повторном render мы будет иметь старое значение purchased и оно будет true
	// 	this.props.onInitPurchase();
	// }

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	}

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	}

	render() {
		let summary = <Redirect to="/" />;
		if (this.props.ings) {
			const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
					summary = (
					<div>
						{purchasedRedirect}
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
		return summary;
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchased: state.order.purchased,
	}
}

// const mapDispatchToProps = dispatch => {
// 	return {
// 		onInitPurchase: () => dispatch(actionTypes.purchaseInit())
// 	};
// }

// если же не нужно указывать mapStateToProps, то в connect первым
// параметром нужно было бы указать null

export default connect(mapStateToProps)(Checkout);
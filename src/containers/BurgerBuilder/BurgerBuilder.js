import React, {Component} from "react";
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from '../../axios-orders';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {...}
	// }

	state = {
		purchasing: false,
		// loading: false,
		// error: false
	}

	componentDidMount() {
		// axios.get('/ingredients.json')
		// 		.then(response => {
		// 			console.log(response);
		// 			this.setState({ingredients: response.data});
		// 		})
		// 		.catch(error => {
		// 			this.setState({error: true});
		// 		})

		// Обращение через axios перенесен в BurgerBuilderActions
		this.props.onInitIngredients();
	}

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients).reduce((sum, igKey) => {
			return sum + ingredients[igKey];
		}, 0);
		return sum > 0;
	}

	purchaseHandler = () => {
		if (this.props.isAuthenticated) {
		this.setState({purchasing: true});
		} else {
			this.props.onSetAuthRedirectPath('/checkout');
			this.props.history.push('/auth');
		}
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	}

	purchaseContinueHandler = () => {
		// alert('You continue!');

		// Код ниже - это размещение заказа на firebase немедленно
		// без роутинга с применением состояния для контроля загрузки и закрытия модалки
		// this.setState({loading: true});
		// const order = {
		// 	ingredients: this.state.ingredients,
		// 	price: this.state.totalPrice,
		// 	customer: {
		// 		name: 'Andrei Karanko',
		// 		address: {
		// 			street: 'Politechnichna 31b',
		// 			zipCode: '03056',
		// 			country: 'Ukraine'
		// 		},
		// 		email: 'test@test.com'
		// 	},
		// 	deliveryMethod: 'fastest',
		// }
		// axios.post('/orders.json', order)
		// 		.then(response => {
		// 			this.setState({
		// 				loading: false,
		// 				purchasing: false // закрываем модалку
		// 			});
		// 			console.log(response);
		// 		})
		// 		.catch(error => {
		// 			this.setState({
		// 				loading: false,
		// 				purchasing: false
		// 			});
		// 			console.log('Huston, we have an error', error);
		// 		})

		// Использование queryParams для передачи ингредиентов и их количества
		// Используется для перехода на следующую страницу checkout
		// Заменено burgerBuilder в Redux, оставлен только переход

		// const queryParams = [];
		// for (let i in this.state.ingredients) {
		// 	// encodeURIComponent - это JS метод для конвертации элемента,
		// 	// чтобы он был в формате URI
		// 	if (this.state.ingredients.hasOwnProperty(i)) {
		// 		queryParams.push(encodeURIComponent(i) + '=' +
		// 				encodeURIComponent(this.state.ingredients[i]));
		// 	}
		// }
		// queryParams.push('price=' + this.props.price);
		// const queryString = queryParams.join('&');

		// Добавлен как замена WillMount в Checkout, так как
		// он нужен тут, раньше checkout
		this.props.onInitPurchase();

		this.props.history.push({
			pathname: '/checkout',
			// search: '?' + queryString
		});
	}

	// Эти методы заменены логикой burgerBuilder в Redux

	// addIngredientHandler = (type) => {
	// 	const oldCount = this.state.ingredients[type];
	// 	const updatedCount = oldCount + 1;
	// 	const updatedIngredients = {...this.state.ingredients};
	//
	// 	updatedIngredients[type] = updatedCount;
	// 	const priceAddition = INGREDIENT_PRICES[type];
	// 	const oldPrice = this.state.totalPrice;
	// 	const newPrice = oldPrice + priceAddition;
	// 	this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
	// 	this.updatePurchaseState(updatedIngredients);
	// }
	//
	// removeIngredientHandler = (type) => {
	// 	const oldCount = this.state.ingredients[type];
	// 	if (oldCount <= 0) {
	// 		return;
	// 	}
	// 	const updatedCount = oldCount - 1;
	// 	const updatedIngredients = {...this.state.ingredients};
	//
	// 	updatedIngredients[type] = updatedCount;
	// 	const priceDeduction = INGREDIENT_PRICES[type];
	// 	const oldPrice = this.state.totalPrice;
	// 	const newPrice = oldPrice - priceDeduction;
	// 	this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
	// 	this.updatePurchaseState(updatedIngredients);
	// }


	render() {
		const disabledInfo = {
			...this.props.ings
		};
		for (let key in disabledInfo) {
			if (disabledInfo.hasOwnProperty(key)) {
				disabledInfo[key] = disabledInfo[key] <= 0;
			}
		}
		// получаем такой объект {salad: true, bacon: false, ...}
		let orderSummary = null;
		let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

		if (this.props.ings) {
			burger = (
					<Aux>
						<Burger ingredients={this.props.ings} />
						<BuildControls
								ingredientAdded={this.props.onIngredientAdded}
								ingredientRemoved={this.props.onIngredientRemoved}
								disabled={disabledInfo}
								purchasable={this.updatePurchaseState(this.props.ings)}
								ordered={this.purchaseHandler}
								price={this.props.price}
								isAuth={this.props.isAuthenticated}
						/>
					</Aux>
			);
			orderSummary = <OrderSummary
					ingredients={this.props.ings}
					price={this.props.price}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
			/>;
		}
		// loading перемещен в redux
		// if (this.state.loading) {
		// 	orderSummary = <Spinner />;
		// }

		return (
				<Aux>
					<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
						{orderSummary}
					</Modal>
					{burger}
				</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null,

	}
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) =>
				dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) =>
				dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () =>
				dispatch(actions.initIngredients()),
		onInitPurchase: () =>
				dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: (path) =>
				dispatch(actions.setAuthRedirectPath(path)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
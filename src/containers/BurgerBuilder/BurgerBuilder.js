import React, {Component} from "react";
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {...}
	// }

	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	}

	componentDidMount() {
		console.log(this.props);
		axios.get('/ingredients.json')
				.then(response => {
					console.log(response);
					this.setState({ingredients: response.data});
				})
				.catch(error => {
					this.setState({error: true});
				})
	}

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients).reduce((sum, igKey) => {
			return sum + ingredients[igKey];
		}, 0);
		this.setState({purchasable: sum > 0})
	}

	purchaseHandler = () => {
		this.setState({purchasing: true});
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
		const queryParams = [];
		for (let i in this.state.ingredients) {
			// encodeURIComponent - это JS метод для конвертации элемента,
			// чтобы он был в формате URI
			if (this.state.ingredients.hasOwnProperty(i)) {
				queryParams.push(encodeURIComponent(i) + '=' +
						encodeURIComponent(this.state.ingredients[i]));
			}
		}
		queryParams.push('price=' + this.state.totalPrice);
		const queryString = queryParams.join('&');

		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		});
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {...this.state.ingredients};

		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {...this.state.ingredients};

		updatedIngredients[type] = updatedCount;
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
		this.updatePurchaseState(updatedIngredients);
	}


	render() {
		const disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		// получаем такой объект {salad: true, bacon: false, ...}
		let orderSummary = null;
		let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

		if (this.state.ingredients) {
			burger = (
					<Aux>
						<Burger ingredients={this.state.ingredients} />
						<BuildControls
								ingredientAdded={this.addIngredientHandler}
								ingredientRemoved={this.removeIngredientHandler}
								disabled={disabledInfo}
								purchasable={this.state.purchasable}
								ordered={this.purchaseHandler}
								price={this.state.totalPrice}
						/>
					</Aux>
			);
			orderSummary = <OrderSummary
					ingredients={this.state.ingredients}
					price={this.state.totalPrice}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
			/>;
		}

		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

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

export default withErrorHandler(BurgerBuilder, axios);
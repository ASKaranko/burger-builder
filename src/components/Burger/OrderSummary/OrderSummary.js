import React, {Component} from "react";
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
	// Это может быть функциональным компонентом
	// Переделан в класс только с целью реализации методов жизненного цикла
	// OrderSummary обновляется, только если модалка меняет свой props.show

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log('[OrderSummary] DidUpdate');
	}

	render() {

		const ingredientSummary = Object.keys(this.props.ingredients)
				.map(igKey => {
					return (
							<li key={igKey}>
								<span style={{textTransform: "capitalize"}}>{igKey}</span>
								: {this.props.ingredients[igKey]}
							</li>
					)});

		return (
				<Aux>
					<h3>Your Order</h3>
					<p>A delicious burger with the following ingredients:</p>
					<ul>
						{ingredientSummary}
					</ul>
					<p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
					<p>Continue to Checkout?</p>
					<Button btnType='Danger' clicked={this.props.purchaseCancelled}>CANCEL</Button>
					<Button btnType='Success' clicked={this.props.purchaseContinued}>Continue</Button>
				</Aux>
		);
	}
}

export default OrderSummary;
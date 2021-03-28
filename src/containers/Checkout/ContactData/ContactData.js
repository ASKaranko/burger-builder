import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: '',
		},
		loading: false,
	}

	orderHandler = (e) => {
		e.preventDefault();
		this.setState({loading: true});
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Andrei Karanko',
				address: {
					street: 'Politechnichna 31b',
					zipCode: '03056',
					country: 'Ukraine'
				},
				email: 'test@test.com'
			},
			deliveryMethod: 'fastest',
		}
		axios.post('/orders.json', order)
				.then(response => {
					this.setState({
						loading: false,
					});
					this.props.history.push('/');
				})
				.catch(error => {
					this.setState({
						loading: false,
					});
					console.log('Huston, we have an error', error);
				})
	}

	render() {
		let form = (
				<form action="">
					<input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
					<input className={classes.Input} type="email" name="email" placeholder="Your Mail"/>
					<input className={classes.Input} type="text" name="street" placeholder="Street"/>
					<input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
					<Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
				</form>
		);
		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
				<div className={classes.ContactData}>
					<h4>Enter your Contact Data</h4>
					{form}
				</div>
		);
	}
}

export default ContactData;
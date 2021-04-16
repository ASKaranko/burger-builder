import React from "react";
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
	{
		label: 'Salad',
		type: 'salad'
	},
	{
		label: 'Bacon',
		type: 'bacon'
	},
	{
		label: 'Cheese',
		type: 'cheese'
	},
	{
		label: 'Meat',
		type: 'meat'
	}
];

const buildControls = (props) => (
	<div className={classes.BuildControls}>
		<p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
		{controls.map((el) => (
			<BuildControl
			label={el.label}
			key={el.label}
			added={() => props.ingredientAdded(el.type)}
			removed={() => props.ingredientRemoved(el.type)}
			disabled={props.disabled[el.type]}
			/>
		))}
		<button
				className={classes.OrderButton}
				disabled={!props.purchasable}
				onClick={props.ordered}
		>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
	</div>
);

export default buildControls;
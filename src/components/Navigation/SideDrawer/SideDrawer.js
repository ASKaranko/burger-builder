import React from 'react'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = (props) => {
	let AttachedClasses = [classes.SideDrawer, classes.Close];
	if (props.open) {
		AttachedClasses = [classes.SideDrawer, classes.Open];
	}
	return (
			<Aux>
				<Backdrop show={props.open} clicked={props.closed} />
				<div className={AttachedClasses.join(' ')} onClick={props.closed}>
					<div className={classes.Logo}>
						<Logo />
					</div>
					<nav>
						<NavigationItems isAuthenticated={props.isAuth} />
					</nav>
				</div>
			</Aux>
	);
};

export default sideDrawer;
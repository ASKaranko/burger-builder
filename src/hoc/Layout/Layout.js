import React, {Component} from "react";
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component {
	state = {
		showSideDrawer: false
	}

	sideDrawerClosedHandler = () => {
		this.setState({showSideDrawer: false});
	}

	// Название метода подразумевает его использование в других частях app
	sideDrawerToggleHandler = () => {
		// Так как setState асинхронный, то пишем не this.setState({showSideDrawer: ...}),
		// а используем callback с передачей в него prevState по умолчанию
		// вторым параметром в callback передаются props (см. документацию)
		this.setState((prevState) => {
			return {showSideDrawer: !prevState.showSideDrawer};
		});
	}

	render () {
		return (
				<Aux>
					<Toolbar
							drawerToggleClicked={this.sideDrawerToggleHandler}
							isAuth={this.props.isAuthenticated} />
					<SideDrawer
							open={this.state.showSideDrawer}
							closed={this.sideDrawerClosedHandler}
							isAuth={this.props.isAuthenticated}
					/>
					<main className={classes.Content}>
						{this.props.children}
					</main>
				</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
	}
}

export default connect(mapStateToProps)(Layout);
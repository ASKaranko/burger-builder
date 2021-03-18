import React, {Component} from "react";
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

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
					<Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
					<SideDrawer
							open={this.state.showSideDrawer}
							closed={this.sideDrawerClosedHandler}
					/>
					<main className={classes.Content}>
						{this.props.children}
					</main>
				</Aux>
		);
	}
}

export default Layout;
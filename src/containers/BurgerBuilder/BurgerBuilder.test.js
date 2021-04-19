import React from "react";
import {configure, shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {BurgerBuilder} from "./BurgerBuilder";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
	let wrapper;

	beforeEach(() => {
		// Мы добавляем сразу здесь функцию props onInitIngredients,
		// так как она идет первоначально в ComponentDidMount методе
		wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
	});

	test('should render <BuildControls /> when receiving ingredients', () => {
		wrapper.setProps({ings: {salad: 0}});
		expect(wrapper.find(BuildControls)).toHaveLength(1);
	});
});
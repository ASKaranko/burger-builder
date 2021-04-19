// enzyme помогает создавать отдельные компоненты нашего приложения
// и запускать их проверку по отдельности от всего приложения
import React from "react";
import {configure, shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

// подключениe enzyme
configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
	let wrapper;
	beforeEach(() => {
		// shallow создает поверхностную оболочку компонент React
		// без их внутренних компонент, входящих в них
		// если props в shallow не указаны, то они имеют значение false
		wrapper = shallow(<NavigationItems />);
	});

	test('should render two <NavigationItem /> elements if not authenticated', () => {
	// find() - метод enzyme
	// компонент внутри find уже добавляем не как JSX
	expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});

	test('should render three <NavigationItem /> elements if authenticated', () => {
	 // const wrapper = shallow(<NavigationItems isAuthenticated />);
		wrapper.setProps({isAuthenticated: true});
 		expect(wrapper.find(NavigationItem)).toHaveLength(3);
	});

	test('should an exact logout button if authenticated', () => {
		wrapper.setProps({isAuthenticated: true});
		// contains принимает node с props, find же принимает только selector
		expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
	});
});
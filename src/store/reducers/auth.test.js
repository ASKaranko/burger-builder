import reducer from './auth';
import * as actions from '../actions/actionTypes';

// import enzyme не нужен, так как мы не используем в reducer компоненты,
// мы работает с функциями
describe('auth reducer', () => {
	test('should return initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			token: null,
			userId: null,
			error: null,
			loading: false,
			authRedirectPath: '/',
		});
	});

	test('it should store the token upon login', () => {
		expect(reducer({
			token: null,
			userId: null,
			error: null,
			loading: false,
			authRedirectPath: '/',
		}, {
			type: actions.AUTH_SUCCESS,
			idToken: 'sa',
			userId: 'sasa1'
		})).toEqual({
			token: 'sa',
			userId: 'sasa1',
			error: null,
			loading: false,
			authRedirectPath: '/',
		});
	});
});
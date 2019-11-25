import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { HeaderTest, mapStateToProps } from './Header';

describe('Header renders', () => {
	it('correctly without loading', () => {
		const tree = shallow(<HeaderTest loading={false} authenticated={false} />);
		expect(toJson(tree)).toMatchSnapshot();
	});

	it('correctly when authenticated', () => {
		const tree = shallow(<HeaderTest loading={false} authenticated />);
		expect(toJson(tree)).toMatchSnapshot();
	});

	it('correctly while loading', () => {
		const tree = shallow(<HeaderTest loading authenticated={false} />);
		expect(toJson(tree)).toMatchSnapshot();
	});
});

describe('Header mapStateToProps runs', () => {
	const state = {
		numAjaxCallsInProgress: 0,
		user: { authenticated: false },
	};

	expect(mapStateToProps(state)).toStrictEqual({
		loading: false,
		authenticated: false,
	});
});

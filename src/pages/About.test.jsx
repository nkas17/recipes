import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import About from './About';

describe('About', () => {
  it('should render correctly', () => {
    const tree = shallow(<About />);
    expect(toJSON(tree)).toMatchSnapshot();
  });
});

import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import AboutPage from '../AboutPage';

describe('AboutPage', () => {
  it('should render correctly', () => {
    const tree = shallow(<AboutPage />);
    expect(toJSON(tree)).toMatchSnapshot();
  });
});

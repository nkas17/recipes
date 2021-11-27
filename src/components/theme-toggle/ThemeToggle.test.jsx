import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import ThemeToggle from './ThemeToggle';

describe('ThemeToggle', () => {
  it('renders correctly', () => {
    const tree = shallow(<ThemeToggle />);
    expect(toJSON(tree)).toMatchSnapshot();
  });

  it('runs toggleTheme correctly when theme is light', () => {
    const themeToggle = new ThemeToggle();
    themeToggle.setState = jest.fn();
    const app = {};
    document.getElementById = jest.fn().mockReturnValue(app);
    themeToggle.toggleTheme();
    expect(themeToggle.setState).toHaveBeenCalledWith({ theme: 'dark' });
    expect(document.getElementById).toHaveBeenCalledWith('app');
    expect(app.className).toBe('dark');
  });

  it('runs toggleTheme correctly when theme is dark', () => {
    const themeToggle = new ThemeToggle();
    themeToggle.state = { theme: 'dark' };
    themeToggle.setState = jest.fn();
    const app = {};
    document.getElementById = jest.fn().mockReturnValue(app);
    themeToggle.toggleTheme();
    expect(themeToggle.setState).toHaveBeenCalledWith({ theme: 'light' });
    expect(document.getElementById).toHaveBeenCalledWith('app');
    expect(app.className).toBe('light');
  });
});

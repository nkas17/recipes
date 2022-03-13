/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { render, screen, fireEvent } from '../utils/testUtils';
import '@testing-library/jest-dom/extend-expect';
import RecipePage, { RecipePageTest } from './RecipeList';

const recipes = [
  {
    id: 'tacos',
    title: 'tacos',
    category: 'beef',
    description: 'Tasty homemade tacos - hard or soft',
    ingredients: ['cheese', 'ground beef', 'tortilla'],
  },
  {
    id: 'quiche',
    title: 'quiche',
    category: 'other',
    description: 'Delicious Spinach Quiche and Ham & Cauliflower quiche',
    ingredients: ['cheese', 'pie-crust', 'egg'],
  },
];

describe('RecipesPage', () => {
  it('should render correctly', () => {
    const tree = shallow(
      <RecipePageTest
        history={{}}
        recipes={recipes}
        authenticated
        isLoadingRecipes={false}
        token="tokenValue"
        actions={{}}
      />,
    );
    expect(toJSON(tree)).toMatchSnapshot();
  });

  it('should render correctly while loading', () => {
    const tree = shallow(
      <RecipePageTest
        history={{}}
        recipes={recipes}
        authenticated
        isLoadingRecipes
        token="tokenValue"
        actions={{}}
      />,
    );
    expect(toJSON(tree)).toMatchSnapshot();
  });

  it('should render correctly while unauthenticated', () => {
    const tree = shallow(
      <RecipePageTest
        history={{}}
        recipes={recipes}
        authenticated={false}
        isLoadingRecipes={false}
        token=""
        actions={{}}
      />,
    );
    expect(toJSON(tree)).toMatchSnapshot();
  });
});

const defaultProps = {
  history: {},
};
const defaultState = {
  categories: ['other', 'poultry'],
  numAjaxCallsInProgress: 0,
  user: {
    authenticated: false,
    token: '',
  },
  recipeStore: {
    recipes,
    isLoading: false,
  },
};

describe('RecipePage as a User', () => {
  it('should render page', () => {
    const props = {
      ...defaultProps,
    };
    const state = {
      ...defaultState,
    };
    render(<RecipePage {...props} />, { initialState: state });

    expect(screen.getAllByRole('heading')[0]).toHaveTextContent('lets eat!');

    expect(screen.getAllByRole('link')[0]).toHaveTextContent('recipes');
    expect(screen.getAllByRole('link')[1]).toHaveTextContent('about');
    expect(screen.getAllByRole('link')[2]).toHaveTextContent('log in');

    expect(screen.getAllByRole('heading')[1]).toHaveTextContent('recipes');

    expect(screen.getAllByRole('link')[3]).toHaveTextContent('quiche');
    expect(screen.getAllByRole('link')[4]).toHaveTextContent('tacos');
  });

  it('should search and display filtered recipes', () => {
    const props = {
      ...defaultProps,
    };
    const state = {
      ...defaultState,
    };

    render(<RecipePage {...props} />, { initialState: state });

    // user hasn't searched yet
    expect(screen.getAllByRole('row').length).toBe(2);

    // user searches by title
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Qui' },
    });
    expect(screen.getAllByRole('row').length).toBe(1);

    // user clears search box
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '' },
    });
    expect(screen.getAllByRole('row').length).toBe(2);

    // user searches by category
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'beeF' },
    });
    expect(screen.getAllByRole('row').length).toBe(1);

    // user clears search box
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '' },
    });
    expect(screen.getAllByRole('row').length).toBe(2);

    // user searches by description
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'ham' },
    });
    expect(screen.getAllByRole('row').length).toBe(1);
  });
});

import { Store } from '../types/store';

const initialState: Store = {
  recipeStore: { recipes: [] },
  categories: [],
  numAjaxCallsInProgress: 0,
  user: {
    token: null,
    authenticated: false,
    authenticating: false,
  },
};

export default initialState;

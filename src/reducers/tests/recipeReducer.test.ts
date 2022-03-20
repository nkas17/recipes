import recipes from '../recipeReducer';
import {
  CREATE_RECIPE_SUCCESS,
  DELETE_RECIPE_SUCCESS,
  LOAD_RECIPES_SUCCESS,
  UPDATE_RECIPE_SUCCESS,
  LOAD_RECIPES,
} from '../../actions/actionTypes';

describe('Recipe Reducer', () => {
  describe('MISSING_ACTION', () => {
    it('should return existing state', () => {
      expect(
        // @ts-ignore
        recipes([{ title: 'recipe' }], {
          type: 'MISSING_ACTION',
          payload: { recipe: { title: 'newRecipe' } },
        }),
      ).toEqual([{ title: 'recipe' }]);
    });
  });
  describe('CREATE_RECIPE_SUCCESS', () => {
    it('should add a new recipe', () => {
      expect(
        recipes(
          // @ts-ignore
          { recipes: [{ title: 'recipe' }] },
          {
            type: CREATE_RECIPE_SUCCESS,
            payload: { recipe: { title: 'newRecipe' } },
          },
        ),
      ).toEqual({ recipes: [{ title: 'recipe' }, { title: 'newRecipe' }] });
    });
  });
  describe('UPDATE_RECIPE_SUCCESS', () => {
    it('should update an existing recipe', () => {
      expect(
        recipes(
          {
            recipes: [
              // @ts-ignore
              { id: '1', title: 'recipe' },
              // @ts-ignore
              { id: '2', title: 'oldRecipe' },
            ],
          },
          {
            type: UPDATE_RECIPE_SUCCESS,
            payload: { recipe: { id: '1', title: 'newRecipe' } },
          },
        ),
      ).toEqual({
        recipes: [
          { id: '2', title: 'oldRecipe' },
          { id: '1', title: 'newRecipe' },
        ],
      });
    });
  });
  describe('DELETE_RECIPE_SUCCESS', () => {
    it('should delete an existing recipe', () => {
      expect(
        recipes(
          {
            recipes: [
              // @ts-ignore
              { _id: 1, title: 'recipe' },
              // @ts-ignore
              { _id: 2, title: 'oldRecipe' },
            ],
          },
          {
            type: DELETE_RECIPE_SUCCESS,
            payload: { recipe: { _id: 2, title: 'oldRecipe' } },
          },
        ),
      ).toEqual({ recipes: [{ _id: 1, title: 'recipe' }] });
    });
  });
  describe('LOAD_RECIPES', () => {
    it('should start loading recipes', () => {
      expect(
        recipes(undefined, {
          type: LOAD_RECIPES,
        }),
      ).toEqual({
        recipes: [],
        isLoading: true,
      });
    });
  });
  describe('LOAD_RECIPE_SUCCESS', () => {
    it('should load recipes', () => {
      expect(
        recipes(undefined, {
          type: LOAD_RECIPES_SUCCESS,
          payload: {
            recipes: [
              // @ts-ignore
              { id: '1', title: 'recipe' },
              // @ts-ignore
              { id: '2', title: 'oldRecipe' },
            ],
          },
        }),
      ).toEqual({
        recipes: [
          { id: '1', title: 'recipe' },
          { id: '2', title: 'oldRecipe' },
        ],
        isLoading: false,
      });
    });
  });
});

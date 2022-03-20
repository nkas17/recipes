import { Category } from './category';
import { Recipe } from './recipe';
import { User } from './user';

interface Store {
  recipeStore: { recipes: Recipe[] };
  categories: Category[];
  numAjaxCallsInProgress: number;
  user: User;
}

export { Store };

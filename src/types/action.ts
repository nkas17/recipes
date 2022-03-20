import { User } from './user';
import { Recipe } from './recipe';
import { Category } from './category';

interface Action {
  type: string;
  payload?: {
    user?: User;
    recipe?: Recipe;
    recipes?: Recipe[];
    categories?: Category[];
    description?: string;
  };
  error?: any;
}

export { Action };

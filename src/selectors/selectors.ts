import { Category } from '../types/category';
import { Store } from '../types/store';

function categoriesFormattedForSelectInput(categories: Category[]) {
  return categories.map((category) => ({
    value: category.id,
    text: category.name,
  }));
}

function getUser(store: Store) {
  return store.user;
}

export { categoriesFormattedForSelectInput, getUser };

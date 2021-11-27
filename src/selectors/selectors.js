function categoriesFormattedForSelectInput(categories) {
  return categories.map((category) => ({
    value: category.id,
    text: category.name,
  }));
}

function getUser(store) {
  return store.user;
}

export { categoriesFormattedForSelectInput, getUser };

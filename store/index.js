export const state = () => ({
  favorites: []
});

export const mutations = {
  favoriteIcon(state, payload) {
    state.favorites.push(payload);
  },
  unFavoriteIcon(state, payload) {
    let newFavorites = state.favorites.filter(
      item => item.componentName !== payload.componentName
    );
    state.favorites = newFavorites;
    newFavorites = [];
  }
};

export const getters = {
  favorites(state) {
    return state.favorites;
  }
};

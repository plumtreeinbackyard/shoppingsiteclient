import shop from "../../api/shop";

// initial state
const state = () => ({
  all: []
});

// getters
const getters = {
  getOneProduct: state => id => state.all.find(product => product.id === id)
};

// actions
const actions = {
  getAllProducts({ commit }) {
    shop.getProducts(products => {
      commit("setProducts", products);
    });
  }
};

// mutations
const mutations = {
  setProducts(state, products) {
    state.all = products;
  }
  // ,

  // decrementProductInventory(state, { id, quantity }) {
  //   const product = state.all.find(product => product.id === id);
  //   product.inventory = parseInt(product.inventory, 10) - parseInt(quantity, 10);
  // }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

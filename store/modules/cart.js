import shop from "../../api/shop";

// initial state
const state = () => ({
  items: [],
  checkoutStatus: null
});

// getters
const getters = {
  cartProducts: (state, getters, rootState) => state.items.map(({ id, quantity }) => {
    const product = rootState.products.all.find(product => product.id === id);
    return {
      id,
      price: product.price,
      quantity
    };
  }),
  cartTotalPrice: (state, getters) => {
    const number = getters.cartProducts.reduce((total, product) => total
      + product.price * product.quantity, 0);
    return Math.round(number * 100) / 100;
  },
  cartTotalItemNumber: state => {
    const itemQuantity = state.items.reduce((total, item) => total
      + parseInt(item.quantity, 10), 0);
    return Number.isNaN(itemQuantity) ? 0 : itemQuantity;
  }
};

// actions
const actions = {
  checkout({ commit }, products) {
    commit("setCheckoutStatus", null);
    // empty cart
    commit("setCartItems", { items: [] });
    shop.buyProducts(
      products,
      () => {
        commit("setCheckoutStatus", true);
        // update product inventory in database
        shop.updateInventoryInDB(products);
      }
    );
  },

  addProductToCart({ state, commit }, { id, quantity }) {
    commit("setCheckoutStatus", null);
    const cartItem = state.items.find(item => item.id === id);
    if (!cartItem) {
      commit("pushProductToCart", { id, quantity });
    } else {
      commit("incrementItemQuantity", { id, quantity });
    }
  },

  changeQuantity({ commit }, { id, quantity }) {
    commit("changeItemQuantity", { id, quantity });
  },

  removeItem({ commit }, { id }) {
    commit("removeCartItem", { id });
  }
};

// mutations
const mutations = {
  pushProductToCart(state, { id, quantity }) {
    state.items.push({ id, quantity });
  },

  incrementItemQuantity(state, { id, quantity }) {
    const cartItem = state.items.find(item => item.id === id);
    cartItem.quantity = parseInt(cartItem.quantity, 10) + parseInt(quantity, 10);
  },

  changeItemQuantity(state, { id, quantity }) {
    const cartItem = state.items.find(item => item.id === id);
    cartItem.quantity = parseInt(quantity, 10);
  },

  removeCartItem(state, { id }) {
    state.items = state.items.filter(item => item.id !== id);
  },

  setCartItems(state, { items }) {
    state.items = items;
  },

  setCheckoutStatus(state, status) {
    state.checkoutStatus = status;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

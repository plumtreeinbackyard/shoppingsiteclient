import cart from "../../store/modules/cart";

// Mutation testing
describe("CART_STORE_MUTATIONS", () => {
  it("push a product to cart", () => {
    const id = 1;
    const quantity = 2;
    const state = {
      items: []
    };

    cart.mutations.pushProductToCart(state, { id, quantity });

    expect(state.items).toEqual([{ id: 1, quantity: 2 }]);
  });

  it("increase item's quantity", () => {
    const id = 2;
    const quantity = 1;
    const state = {
      items: [{ id: 2, quantity: 2 }]
    };

    cart.mutations.incrementItemQuantity(state, { id, quantity });

    expect(state.items).toEqual([{ id: 2, quantity: 3 }]);
  });

  it("change item's quantity", () => {
    const id = 3;
    const quantity = 4;
    const state = {
      items: [{ id: 3, quantity: 1 }]
    };

    cart.mutations.changeItemQuantity(state, { id, quantity });

    expect(state.items).toEqual([{ id: 3, quantity: 4 }]);
  });

  it("remove an item from cart", () => {
    const id = 4;
    const state = {
      items: [{ id: 4, quantity: 1 }]
    };

    cart.mutations.removeCartItem(state, { id });

    expect(state.items).toEqual([]);
  });

  it("reset cart", () => {
    const items = [];
    const state = {
      items: [{ id: 5, quantity: 1 }]
    };

    cart.mutations.setCartItems(state, { items });

    expect(state.items).toEqual([]);
  });

  it("set checkout status to true", () => {
    const status = true;
    const state = {
      checkoutStatus: null
    };

    cart.mutations.setCheckoutStatus(state, status);

    expect(state.checkoutStatus).toEqual(true);
  });
});

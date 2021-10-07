<template>
  <div class="main">
    <h1>Your Cart</h1>
    <p v-show="!products.length">
      Your cart is empty, add some products to cart.
    </p>
    <form @submit.prevent="checkout()">
      <div v-show="products.length && !checkoutStatus">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-4"></div>
            <div class="col-5"></div>
            <div class="col-3">
              Price
            </div>
          </div>
        </div>
        <hr />
        <li v-for="(product, index) in products" :key="index">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-4">
                <img src="@/assets/img/300x200.jpg" class="img-fluid" />
              </div>
              <div class="col-5 text-left">
                <p>{{ product.title }} <br />Inventory: {{ product.inventory }}</p>
                <div class="form-group">
                  <input
                    v-model="quantities[index]"
                    type="number"
                    min="1"
                    class="form-control"
                    style="width:80px;"
                    @input="changeQuantity(index, product.inventory, product.id, quantities[index])"
                  />
                  <span
                    v-if="parseInt(product.inventory, 10) < quantities[index]"
                    style="color:red;"
                  >
                    Low inventory
                  </span>
                </div>
                <p>
                  <a
                    href="javascript:void(0)"
                    @click="removeItem(product.id)"
                    style="color: blue; cursor: pointer;"
                    >Remove</a
                  >
                </p>
              </div>
              <div class="col-3">${{ product.price }}</div>
            </div>
          </div>
        </li>
        <hr />
        <div class="container">
          <div class="row">
            <div class="col-9 text-right">Subtotal:</div>
            <div class="col-3">${{ total }}</div>
          </div>
        </div>
      </div>

      <p class="mt-5 mb-5">
        <button :disabled="!products.length || flag" type="submit" class="btn btn-dark">
          Checkout
        </button>
      </p>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Cart",
  data: () => ({
    quantities: [],
    inventoryFlag: [],
    flag: false
  }),
  computed: {
    ...mapState({
      checkoutStatus: state => state.cart.checkoutStatus
    }),
    ...mapGetters("cart", {
      products: "cartProducts",
      total: "cartTotalPrice"
    })
  },
  methods: {
    changeQuantity(index, inventory, id, quantity) {
      this.$store.dispatch("cart/changeQuantity", { id, quantity });
      this.checkFlag(index, inventory, quantity);
    },
    checkout() {
      this.$store
        .dispatch("cart/checkout", this.products)
        .then(() => setTimeout(() => alert("Checkout successful."), 500)); // eslint-disable-line no-alert
    },
    removeItem(id) {
      this.$store.dispatch("cart/removeItem", { id });
      // reload page to refresh products quantity
      window.location.reload();
    },
    checkFlag(index, inventory, quantity) {
      // if item inventory is lower than required item quantity then flag 1 for item inventory state
      this.inventoryFlag[index] = parseInt(inventory, 10) < quantity ? 1 : 0;
      this.flag = this.inventoryFlag.reduce((total, flag) => total + flag, 0) > 0;
    }
  },
  created() {
    this.products.forEach((product, index) => {
      this.quantities.push(product.quantity);
      this.checkFlag(index, product.inventory, this.quantities[index]);
    });
  }
};
</script>

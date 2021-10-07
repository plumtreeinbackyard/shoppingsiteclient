<template>
  <div class="main">
    <h1>Product detail</h1>
    <div class="container">
      <div class="row no-gutters">
        <div class="col-12 col-sm-5 col-lg-4">
          <img src="@/assets/img/300x200.jpg" class="card-img img-fluid" />
        </div>
        <div class="col-12 col-sm-7 col-lg-8 text-left">
          <div class="card-body">
            <p class="card-text">{{ product.title }}</p>
            <p class="card-text">${{ product.price }}</p>
            <p class="card-text">Inventory: {{ product.inventory }}</p>
            <form @submit.prevent="addToCart()">
              <div class="container pl-0">
                <div class="row">
                  <div class="col-6 col-lg-3">
                    <div class="form-group">
                      <input
                        v-model="quantity"
                        type="number"
                        min="0"
                        class="form-control"
                        id="quantity"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-6 col-lg-4 text-left">
                    <button :disabled="!isInventoryGood" type="submit" class="btn btn-dark">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <p v-if="!isInventoryGood" class="card-text" sytle="color:red;">
              This product's inventory is lower than the quantity you required.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Product",
  data: () => ({
    id: "",
    quantity: 0,
    product: {}
  }),
  computed: {
    isInventoryGood() {
      return parseInt(this.product.inventory, 10) >= this.quantity;
    }
  },
  methods: {
    ...mapActions("cart", ["addProductToCart"]),
    addToCart() {
      if (this.quantity) {
        this.addProductToCart({ id: this.id, quantity: this.quantity })
          .then(() => setTimeout(() => alert("Added to cart."), 500)); // eslint-disable-line no-alert
        this.quantity = 0;
      } else {
        alert("Quantity should be greater than 0."); // eslint-disable-line no-alert
      }
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.product = this.$store.getters["products/getOneProduct"](this.id);
  }
};
</script>

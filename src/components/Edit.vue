<template>
  <div class="main">
    <h1>Edit product</h1>
    <form @submit.prevent="editProduct">
      <div v-if="error" class="alert alert-dismissible alert-warning">
        <button type="button" class="close" data-dismiss="alert">
          &times;
        </button>
        <h4 class="alert-heading">Error!</h4>
        <p class="mb-0">{{ error }}</p>
      </div>
      <div class="container">
        <div class="row align-items-center">
          <div class="col-4">
            <div class="form-group">
              <label for="title">Title</label>
              <input
                v-model="product.title"
                disabled
                type="text"
                class="form-control"
                id="title"
              />
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label for="price">Price</label>
              <input
                v-model="product.price"
                type="number"
                min="0"
                step="0.01"
                class="form-control"
                id="price"
                required
              />
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label for="inventory">Inventory</label>
              <input
                v-model="product.inventory"
                type="number"
                class="form-control"
                id="inventory"
                required
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <button type="submit" class="btn btn-dark mt-3">Save</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

const url = process.env.VUE_APP_API_URL;

export default {
  name: "Edit",
  data: () => ({
    error: "",
    id: "",
    product: {}
  }),
  methods: {
    editProduct() {
      const EDIT_PRODUCT_API_URL = `${url}/api/products/${this.id}`;

      axios
        .put(EDIT_PRODUCT_API_URL, this.product)
        .then(
          () => setTimeout(() => {
            this.error = "";
            alert("The product has been updated in database!"); // eslint-disable-line no-alert
            window.location.href = `${url}/#/admin`;
          }, 500)
        )
        .catch(error => {
          this.error = `Something went wrong with editing product! ${error}`;
        });
    }
  },
  created() {
    this.id = this.$route.params.id;
    const GET_PRODUCT_API_URL = `${url}/api/products/${this.id}`;
    axios
      .get(GET_PRODUCT_API_URL)
      .then(response => {
        this.product = response.data;
      })
      .catch(() => {
        this.error = "Something went wrong with getting product data from database!";
      });
  }
};
</script>

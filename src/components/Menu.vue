<template>
  <div class="bg-dark">
    <div class="container">
      <div class="row justify-content-between">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="width: 100%">
          <router-link to="/" class="navbar-brand">Shopping Site Demo</router-link>
          <div class="show-on-small-screen">
            <router-link to="/cart" class="nav-link">
              <div
                class="cart-icon"
                :style="{
                  backgroundImage: 'url(' + require('@/assets/img/shopping-cart.png') + ')'
                }"
              >
                <span class="cart-number" style="color: white;">{{ cartNumber }}</span>
              </div></router-link
            >
          </div>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse"
            id="navbarTogglerDemo01"
            data-toggle="collapse"
            data-target=".navbar-collapse"
          >
            <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
              <li class="nav-item">
                <router-link to="/" class="nav-link">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/admin" class="nav-link">Admin</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/cart" class="nav-link"
                  >Cart
                  <div
                    class="cart-icon"
                    :style="{
                      backgroundImage: 'url(' + require('@/assets/img/shopping-cart.png') + ')'
                    }"
                  >
                    <span class="cart-number" style="color: white;">{{ cartNumber }}</span>
                  </div></router-link
                >
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Menu",
  computed: {
    ...mapGetters("cart", {
      cartNumber: "cartTotalItemNumber"
    })
  }
};
</script>

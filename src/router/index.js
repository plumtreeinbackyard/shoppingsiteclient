import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Admin from "../components/Admin.vue";
import Product from "../components/Product.vue";
import Cart from "../components/Cart.vue";
import Edit from "../components/Edit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin
  },
  {
    path: "/product/:id",
    name: "Product",
    component: Product
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: Edit
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart
  }
];

const router = new VueRouter({
  routes
});

export default router;

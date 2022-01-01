/**
 * Mocking client-server processing
 */
import axios from "axios";

const url = process.env.VUE_APP_API_URL;
const GET_PRODUCTS_API_URL = `${url}/products`;
const UPDATE_INVENTORY_API_URL = `${url}/products/updateinventory`;
let products = [];

export default {
  getProducts(cb) {
    // Get products from database
    axios
      .get(GET_PRODUCTS_API_URL)
      .then(response => {
        products = response.data;
        cb(products);
      })
      .catch(error => {
        console.log(error);
      });
  },

  buyProducts(products, cb) {
    setTimeout(() => {
      cb();
    }, 100);
  },

  // update inventory in database after successful checkout,
  // cartProducts contains two properties: id and quantity.
  updateInventoryInDB(cartProducts) {
    axios.put(UPDATE_INVENTORY_API_URL, cartProducts).catch(error => {
      console.log(error);
    });
  }
};

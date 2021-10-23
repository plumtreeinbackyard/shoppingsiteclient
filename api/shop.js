/**
 * Mocking client-server processing
 */
import axios from "axios";

const url = process.env.VUE_APP_API_URL;
const GET_PRODUCTS_API_URL = `${url}/api/products`;
const UPDATE_INVENTORY_API_URL = `${url}/api/products/updateinventory`;
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
    // setTimeout(() => cb(products), 100);
  },

  buyProducts(products, cb) {
    setTimeout(() => {
      cb();
    }, 100);
  },
  // for simulate random checkout failure.
  // buyProducts(products, cb, errorCb) {
  //   setTimeout(() => {
  //     simulate random checkout failure.
  //     if (Math.random() > 0.5 || navigator.webdriver) {
  //       cb();
  //     } else {
  //       errorCb();
  //     }
  //   }, 100);
  // },

  // update inventory in database after successful checkout,
  // cartProducts contains two properties: id and quantity.
  updateInventoryInDB(cartProducts) {
    axios.put(UPDATE_INVENTORY_API_URL, cartProducts).catch(error => {
      console.log(error);
    });
  }
};

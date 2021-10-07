import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Home from "@/components/Home.vue";
import products from "../../store/modules/products";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Home.vue", () => {
  let state;
  let actions;
  let store;

  beforeEach(() => {
    state = {
      all: [
        {
          created: "2021-01-02T19:23:47.770Z",
          inventory: "100",
          price: "80",
          title: "T shirt",
          _id: "5ff0c843f918c142aceef62b"
        },
        {
          created: "2021-01-02T19:24:03.055Z",
          inventory: "200",
          price: "50",
          title: "shoes",
          _id: "5ff0c853f918c142aceef62c"
        }
      ]
    };

    actions = {
      getAllProducts: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        products: {
          state,
          actions,
          getters: products.getters,
          namespaced: true
        }
      }
    });
  });

  const wrapper = shallowMount(Home, { store, localVue });

  it("hide alert when products array is not empty", () => {
    const div = wrapper.find(".alert-warning");
    expect(div.exists()).toBe(false);
  });

  it("fill products array with state data ", () => {
    const products = wrapper.products;
    expect(products).toBe(state.all);
  });
});

<template>
  <div id="app">
    <title>Products page</title>
      <h3 v-if="Category != 'All'">
        Products for category:
        <strong>
          {{Category}}
        </strong>
      </h3>
      <h3 v-else>
          All products
      </h3>
    <div v-if="loading" class="loadingDiv">
      <img src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif">
      <p>Loading...</p>
    </div>
    <div v-else> 
      <table v-if="products.length" class="productsTable">
          <tr v-for="product in products" :key="product.id">
            <ProductComp :Product='product'></ProductComp>
          </tr>
      </table>
      <h4 v-else>
        No products found for this category 
      </h4>
      <div class="toTopBtn">
        <button v-on:click="scrollToTop()">Scroll to top</button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

import Product from '../../models/Product';
import ProductComp from '../../components/Product/Product.vue';

import CategoryLogic from '../../logic/CategoryLogic.js';

export default {

  props: {
    category: String,
  },
  components: {
    ProductComp
  },
  data() {
    return {
      products: Array,
      Category: String,
      loading: true
    };
  },
  mounted() {

    this.Category = CategoryLogic.urlToCategory(this.category);
       
    CategoryLogic.getByCategory(this.Category)
      .then((response) => {
        this.products = response;
        this.loading = false;
    });
  },
  watch: {
    '$route.query.category'(newCategory, oldCategory) {

      newCategory = CategoryLogic.urlToCategory(newCategory);
      this.Category = newCategory;
      this.products = CategoryLogic.getByCategory(newCategory)
        .then((response) => {
          this.products = response;
          this.loading = false;
        });
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    }
  }
};
</script>

<style src="./Products.css"></style>
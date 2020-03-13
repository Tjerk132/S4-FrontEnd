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
    <div v-if="products.length">

      <Pagination :Products=products :PageSize=pageSize></Pagination>

    </div>
      <h4 v-else>
        No products found for this category 
      </h4>
      <div v-if="products.length > pageSize" class="toTopBtn">
        <button v-on:click="scrollToTop()">Scroll to top</button>
      </div>
    </div>
</template>

<script>

import Product from '../../models/Product.js';

import CategoryLogic from '../../logic/CategoryLogic.js';
import Pagination from '../../components/Pagination/Pagination.vue';

export default {

  props: {
    category: String,
  },
  components: {
    Pagination,
  },
  data() {
     return {
        pageSize: 4,
        //must be [] for navigation
        products: [],
        Category: String,
        loading: true,
      }
  },
  mounted() {

    this.Category = this.category;
       
    CategoryLogic.getByCategory(this.Category)
      .then((response) => {
        this.products = response;
        this.loading = false;
    });


  },
  watch: {
    '$route.query.category'(newCategory, oldCategory) {
      this.Category = newCategory;
      this.products = CategoryLogic.getByCategory(newCategory)
        .then((response) => {
          this.products = response;
          this.loading = false;

          this.$root.$refs.Pagination.updatePages(response);
        });
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
  }
};
</script>

<style src="./Products.css"></style>
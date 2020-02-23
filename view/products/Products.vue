<template>
  <div id="app">
    <title>Products page</title>

    <v-btn @click="goHome">Home</v-btn>

    <div v-if="loading" class="loadingDiv">
      <img src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif">
      <p>Loading...</p>
    </div>
    <div v-else> 
      <table class="productsTable">
          <tr v-for="product in products" :key="product.id">
            <ProductComp :Product='product'></ProductComp>
          </tr>
      </table>
      <div class="toTopBtn">
        <button @click="scrollToTop">Scroll to top</button>
      </div>
    </div>
  </div>
</template>

<script>

import ProductDao from  '../../daos/productdao';
import Product from '../../models/Product';
import ProductComp from '../../components/Product.vue';

export default {
  components: {
    ProductComp
  },
  data() {
    return {
      products: [],
      loading: false
    };
  },
  mounted() {
    console.log('in mounted products');
    this.loading = true;
    ProductDao.getAllProducts()
    .then((response) => {
        //retrieve products from rest-service
        //0.1sec delay for loading test
        setTimeout(() => {   
          this.products = response;
          this.loading = false; 
        },
        50);
    });
  },
  methods: {
    goHome() {
      this.$router.push('/');
    },
    scrollToTop() {
      window.scrollTo(0,0);
    }
  }
};
</script>

<style src="./Products.css"></style>
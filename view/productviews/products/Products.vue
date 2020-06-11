<template>
  <div id="app">
    <title v-text="$ml.get('productPage')"></title>

      <h3 v-if="Category != 'All'">
        <h3 v-text="$ml.get('Category')" />
      </h3>
      <h3 v-else v-text="$ml.get('productsAll')"></h3>

    <div v-if="loading" class="loadingDiv">
      <img :src="'./images/loading.gif'">
      <p>Loading...</p>
    </div>
    <button v-on:click="goToAddProduct()" v-if="role == 'ADMIN'">Add product</button>
    <div v-if="products.length">
      <Pagination :Products=products :PageSize=pageSize></Pagination>
    </div>
      <h4 v-else-if="!loading" v-text="$ml.get('NoProductsFound')">
      </h4>
      <div v-if="products.length > pageSize" class="toTopBtn">
        <button v-on:click="scrollToTop()" v-text="$ml.get('scrollToTop')"/>
      </div>
    </div>
</template>

<script>

import Product from '@/models/Product.js';

import CategoryLogic from '@/logic/CategoryLogic.js';
import Pagination from '@/components/Pagination/Pagination.vue';
import CryptoJS from 'crypto-js';
import jwtDao from '@/data/jwtdao.js';

import { MLBuilder } from 'vue-multilanguage';

export default {

  props: {
    category: String,
  },
  components: {
    Pagination,
  },
  data() {
     return {
        pageSize: 6,
        //must be [] for navigation
        products: [],
        Category: String,
        loading: true,
        role: 'USER',
        key: String
        
      }
  },
  mounted() {

    this.Category = this.category;

    this.key = jwtDao.getKey(CryptoJS); 
     
    if(this.$session.get('user') != undefined) {  
      let decryptedBytes = CryptoJS.AES.decrypt(this.$session.get('user').role, this.key);
      this.role = decryptedBytes.toString(CryptoJS.enc.Utf8);
    }
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
    goToAddProduct() {
      this.$router.push('add');
    },
    scrollToTop() {
      window.scrollTo(0,0);
    },
  },
  computed: {
    mlCategory() {      
      return new MLBuilder('productCategory').with('c', this.category)
    }
  }
};
</script>

<style src="./Products.css" scoped></style>
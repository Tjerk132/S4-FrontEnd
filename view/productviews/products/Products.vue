<template>
  <div id="app">
    <title v-text="$ml.get('productPage')"></title>
      <button v-on:click='goToAddProduct()' v-text="$ml.get('addProduct')" v-if="role == 'ADMIN'" />

      <p v-text="$ml.get('filterOnPrice')" class="price-filter-header"/>
      <range-slider
          class="slider"
          min="0"
          max="200"
          step="1"
          v-model='priceFilterValue'
          v-on:change='adjustPriceFilter()'>
      </range-slider>

    <h3 v-if="Category != 'All'" v-text="$ml.get('Category')"></h3>
    <h3 v-else v-text="$ml.get('productsAll')"></h3>

    <div v-if='loading' class="loading-div">
      <img :src="'../images/loading.gif'">
      <p>Loading...</p>
    </div>
    <div v-if="products.length">
      <Pagination :key=updateKey :Products=filterOnPrice :PageSize=pageSize></Pagination>
    </div>
      <h4 v-else-if='!loading' v-text="$ml.get('NoProductsFound')"/>
      <div v-if='products.length > pageSize' class="to-top-btn">
        <button v-on:click='scrollToTop()' v-text="$ml.get('scrollToTop')"/>
      </div>
    </div>
</template>

<script>

import Product from '@/models/Product.js';

import CategoryLogic from '@/logic/CategoryLogic.js';
import JwtLogic from '@/logic/JwtLogic.js';

// import built-in style for slider
import 'vue-range-slider/dist/vue-range-slider.css'
import './products.css'
import RangeSlider from 'vue-range-slider'; 

import Pagination from '@/components/Pagination/Pagination.vue';
import CryptoJS from 'crypto-js';

import { MLBuilder } from 'vue-multilanguage';

export default {

  props: {
    category: String,
  },
  components: {
    Pagination,
    RangeSlider
  },
  data() {
     return {
        jwtLogic: new JwtLogic(),
        categoryLogic: new CategoryLogic(),
        pageSize: 6,
        //must be [] for navigation
        products: [],
        Category: String,
        loading: true,
        role: {
          type: String,
          default: 'USER'
        },
        key: String,
        priceFilterValue: 0,
        updateKey: 0 
      }
  },
  mounted() {

    this.Category = this.category;

    this.key = this.jwtLogic.getKey(CryptoJS); 

    let user = this.$session.get('user');
    if(user != undefined) {  
      let decryptedBytes = CryptoJS.AES.decrypt(user.role, this.key);
      this.role = decryptedBytes.toString(CryptoJS.enc.Utf8);
    }

    this.categoryLogic.getByCategory(this.category)
      .then((response) => {
      
        this.products = response;
        this.loading = false;
    });

    this.$root.$on('loggedInStatus', (loggedIn) => {
      if(!loggedIn) {
        this.role = 'USER';
      }
    });
  },
  watch: {
    '$route.query.category'(newCategory, oldCategory) {
      this.Category = newCategory;
      this.products = this.categoryLogic.getByCategory(newCategory)
        .then((response) => {
          this.products = response;
          this.loading = false;
          //pagination is not created when less then (pageSize) products are loaded
          if(this.products.length > this.pageSize) {
            this.$root.$refs.Pagination.updatePages(response);
          }
        });
    }
  },
  methods: {
    adjustPriceFilter() {
      //update pagination to refresh computed products
      this.updateKey++;
    },

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
    },

    filterOnPrice() {
      if(this.priceFilterValue == 0) {
        return this.products;
      }
      else return this.products.filter(x => x.price >= this.priceFilterValue);
    }
  }
};
</script>

<style src="./products.css" scoped></style>
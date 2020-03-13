

<template>
    <div>
        <div class="appPage">
            
            <div class="navbar">

                <button v-on:click="goRoute('/')">Home</button>
                <button v-on:click="goToAllProducts()">Products</button>

                <categoriesNav />

                <searchNav />

                <accountNav />

                <shoppingCartNav />
 
            </div>

            <h3 class="appTitle">
                Product Store
            </h3>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import CategoriesNav from '../components/CategoriesNav/CategoriesNav.vue';
import SearchNav from '../components/SearchNav/SearchNav.vue';
import AccountNav from '../components/AccountNav/AccountNav.vue';
import ShoppingCartNav from '../components/ShoppingCartNav/ShoppingCartNav.vue';

import ProductLogic from '../logic/ProductLogic.js';

export default {
    components: {
        categoriesNav: CategoriesNav,
        searchNav: SearchNav,
        accountNav: AccountNav,
        shoppingCartNav: ShoppingCartNav,
    },
    data() {    
        return {
            categories: [],
        }
    },
    mounted() {
         
        let products = JSON.parse(
                this.$cookies.get('shopping_cart'));

        // avoid null when clearing cookies
        products = ProductLogic.checkExistingBasket(products);

        this.$root.$emit('updateCount', products.length);

    },
    methods: {
        goRoute(route) {
            //can't navigate to same page
            if(window.location.pathname != route) {
                this.$router.push(route);
            }
        },
        goToAllProducts() {
            if(this.$route.query.category != 'All') {
                this.$router.push({
                    name: 'products',
                    query: { category: 'All' }
                });
            }
        }
    }
}
</script>

<style src='./app.css'></style>
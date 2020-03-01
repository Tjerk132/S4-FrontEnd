<template>
    <div>
        <div class="appPage">
            
            <div class="navbar">

                <button v-on:click="goRoute('/')">Home</button>
                <button v-on:click="goRoute('/products')">Products</button>

                <categoriesNav />
              
                <div class="search_input-container">

                    <input placeholder="Search for..">

                </div>

                <accountNav />

                <button v-on:click="goRoute('/shoppingcart')">
                    <div class="shoppingBasketBtn">
                        {{shoppingCartCount}}
                    </div>
                </button>   
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
import AccountNav from '../components/AccountNav/AccountNav.vue';

import ProductLogic from '../logic/ProductLogic.js';

export default {
    components: {
        categoriesNav: CategoriesNav,
        accountNav: AccountNav,
    },
    data() {    
        return {
            shoppingCartCount: 0,
            categories: [],
        }
    },
    mounted() {
         
        let products = JSON.parse(
                this.$cookies.get('shopping_cart'));

        // avoid null when clearing cookies
        products = ProductLogic.checkExistingBasket(products);

        this.shoppingCartCount = products.length;

        //receive update to change 
        this.$root.$on('updateCount', (count) => {
            this.shoppingCartCount = count;
        })

    },
    methods: {
        goRoute(route) {
            //can't navigate to same page
            if(window.location.pathname != route) {
                this.$router.push(route);
            }
        }
    }
}
</script>

<style src='./app.css'></style>
<template>
    <div>
        <div class="appPage">
            
            <navBar />

            <h3 class="appTitle">
                Product Store
            </h3>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar/NavBar.vue';

import ProductLogic from '@/logic/ProductLogic.js';
import JwtLogic from '@/logic/JwtLogic.js';

export default {
    components: {
        navBar: NavBar,
    },
    data() {
        return {
            jwtLogic: new JwtLogic(),
            productLogic: new ProductLogic(),
        }
    },
    mounted() {
         
        let products = JSON.parse(
                this.$cookies.get('shopping_cart'));

        // avoid null when clearing cookies
        products = this.productLogic.checkExistingBasket(products);

        this.$root.$emit('updateCount', products.length);
    },
}
</script>

<style src='./app.css'></style>
<style src='./navigation.css'></style>
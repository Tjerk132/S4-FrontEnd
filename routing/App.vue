<template>
    <div>
        <div class="appPage">
            <h3 class="appTitle">
                Product Store
            </h3>
            <h3 class="shoppingBasket">
                {{shoppingCartCount}}
                <button @click="toShoppingCart()" class="shoppingBasketBtn"></button>
            </h3>
        </div>
    
        <router-view></router-view>
    </div>
</template>

<script>
import ProductLogic from '../logic/ProductLogic'

export default {
    data() {    
        return {
            shoppingCartCount: 0
        }
    },
    mounted() {
        console.log('in app mounted');
 
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
        toShoppingCart() {
            this.$router.push('/shoppingcart');
        }
    }
}
</script>

<style src='./app.css'></style>
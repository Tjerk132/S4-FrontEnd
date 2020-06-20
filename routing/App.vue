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

import JwtLogic from '@/logic/JwtLogic.js';
import ProductLogic from '@/logic/ProductLogic.js';

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

        this.$root.$on('check-jwt', (user) => {
            //retrieve jwt header
            if(!localStorage.getItem('jwt-token')) {

                this.jwtLogic.setJwtHeader(user.username, user.password)
                .then((res) => {  

                    if(Number(res)) {
                        this.$alert(`Unable to retrieve authorization (${res})`);
                        return;
                    }  
                });
            }
            this.$root.$emit('jwt-retrieved');
        });
    },
}
</script>

<style src='./app.css'></style>
<style src='./navigation.css'></style>
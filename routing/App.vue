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

import jwtDao from '@/data/jwtdao.js';

export default {
    components: {
        navBar: NavBar
    },
    mounted() {
         
        let products = JSON.parse(
                this.$cookies.get('shopping_cart'));

        // avoid null when clearing cookies
        products = ProductLogic.checkExistingBasket(products);

        this.$root.$emit('updateCount', products.length);

        if(!localStorage.getItem('jwt-token')) {
            jwtDao.setJwtHeader()
                .then((header) => {
                    localStorage.setItem('jwt-token', header);
                });
        }

    },
    watch:{
        $route(to, from){
            if(!localStorage.getItem('jwt-token')) {
                 this.$alert(
                    'Your token has expired',
                    'Vue Store',
                    'info',
                    {
                        confirmButtonText: "Refresh page"
                    }
                )
                .then(() => {
                    location.reload();
                })
            }
            
        }
    },
}
</script>

<style src='./app.css'></style>
<style src='./navigation.css'></style>
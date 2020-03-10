<template>
    <div>    
        <button v-on:click="goRoute('/shoppingcart')">
            <div class="shoppingBasketBtn">
                <span v-if="shoppingCartCount > 99">
                    99+
                </span>
                <span v-else>
                {{shoppingCartCount}}
                </span>
                <img :src="'./images/shoppingcart.png'">
            </div>
        </button>  
    </div>
</template>

<script>
export default {

    data() {
        return {
            shoppingCartCount: 0,
        }
    },
    mounted() {
        //receive update to change 
        this.$root.$on('updateCount', (count) => {
            this.shoppingCartCount = count;
        });
    },      
    methods: {
        goRoute(route) {
            //can't navigate to same page
            if(window.location.pathname != route) {
                this.$router.push(route);
            }
        },
    }
}
</script>

<style src="./shoppingcartnav.css"></style>
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
        <notifications group="shopping-cart-group"
            position="bottom right"
            animation-type="velocity"
            :speed="500" />
    </div>
</template>

<script>
export default {

    data() {
        return {
            shoppingCartCount: 0,
            notificationCount: 0,
            maxNotificationCount: 5,
        }
    },
    mounted() {
        //receive update to change 
        this.$root.$on('updateCount', (count) => {

            if(this.notificationCount > this.maxNotificationCount) {
                this.$notify({
                    group: 'shopping-cart-group',
                    clean: true
                })
                this.notificationCount = 0;
            }
            this.shoppingCartCount = count;
            const notificationText = (count < this.shoppingCartCount) ;
            this.show('shopping-cart-group', 'success', count);  
            this.notificationCount++;
        });
    },      
    methods: {
        goRoute(route) {
            //can't navigate to same page
            if(window.location.pathname != route) {
                this.$router.push(route);
            }
        },
        show (group, type = '', count) {
        
            const text = this.$ml.with('p', count)
                .get('shoppingCartCountAdjusted') + ` <br><strong>Vue product store</strong>`;

            this.$notify({
                group,
                title: this.$ml.get('shoppingCartAdjusted'),
                text: text,
                type,
            })
        },
    }
}
</script>

<style src="./shoppingcartnav.css"></style>
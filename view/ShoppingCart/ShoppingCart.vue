<template>
    <div>
        <title v-text="$ml.get('shoppingcart')"/>
        <h3 v-if="!cartItems.length" v-text="$ml.get('noItemsInCart')"/>
        <div v-else>
            <h3 v-text="$ml.get('CartItems')"/>

             <table class="shoppingcartTable">
                <thead>
                    <td>
                        <strong v-text="$ml.get('quantity')"/>
                    </td>
                    <td>    
                    </td>
                    <td>
                        <strong v-text="$ml.get('name')"/>
                    </td>
                    <td>
                        <strong v-text="$ml.get('price')"/>
                    </td>
                </thead>
                <tr class="shoppingCartItems" v-for="item in cartItems" :key="item.item">
                    <td>
                        {{item.quantity}}
                    </td>
                    <td>
                        <img v-bind:src="item.product.imageUrl" class="shoppingcartImage" alt="product image">
                    </td>
                    <td class="shoppingcartName">
                        {{item.product.name}}
                    </td>

                    <td class="shoppingcartPrice">
                        {{item.product.price}}
                    </td>

                    <td class="shoppingCartOptions">
                        <button v-on:click="removeFromCart(item.product)" v-text="$ml.get('remove')" class="shoppingCartRemoveBtn"/>
                        <button v-on:click="addToCart(item.product)" :disabled="item.product.stockCount == 0" v-text="$ml.get('add')" class="shoppingCartAddBtn"/>
                        <button v-on:click="navigateToDetails(item.product.id)" v-text="$ml.get('details')" class="shoppingCartDetailsBtn"/>
                    </td>
                </tr>
            </table>

            <br/>
            <h3 v-text="$ml.get('TotalCosts')"/>

            <button v-on:click="buyProducts()" v-text="$ml.get('buyProducts')" class="buyProductsBtn"/>
        </div>
    </div>
</template>

<script>
import ProductLogic from '@/logic/ProductLogic.js';
import ProductDao from '@/data/productdao.js';
import ShopppingCartItem from '@/models/ShoppingCartitem.js';

import UserDao from '@/data/userdao.js';

import emailjs from 'emailjs-com';

import { MLBuilder } from 'vue-multilanguage';

export default {

    data() {
        return {
            cartItems: [],
            totalCosts: Number,
            totalQuantity: Number,
        }
    },
    mounted() {
        let productIds = JSON.parse( 
            this.$cookies.get('shopping_cart'));
        //shopping cart is not empty
        if(productIds != undefined && productIds.length) {

            productIds.forEach(id => {

                ProductDao.getProductById(id)
                .then((product) => {
                    
                    //filter duplicate products
                    this.cartItems = ProductLogic.existsInBasket(product, this.cartItems);

                    this.totalQuantity = ProductLogic.getTotalQuantity(this.cartItems);

                    this.totalCosts = ProductLogic.calculateBasketCosts(this.cartItems);
                });
            });
        }
    },
    methods: {

        removeFromCart(product) {

            this.cartItems = ProductLogic.removeFromShoppingCart(product, this.cartItems);

            this.totalQuantity -= 1;
            
            this.refreshComponents();  
        },
        addToCart(product) {

            this.cartItems.forEach(cartItem => {
                
                //check if user has more products in his shoppingcart then exist in the store
                if(cartItem.product.id == product.id) {
                    if(product.stockCount - cartItem.quantity > 0) {
                        
                        this.cartItems = ProductLogic.addToShoppingCart(product, this.cartItems);

                        this.totalQuantity += 1;

                        this.refreshComponents();
                    }
                    else this.$alert(this.$ml.get('notEnoughInStock'));
                }
            });         
        },
        refreshComponents() {

            let productIds = ProductLogic.getProductIds(this.cartItems);

            let cookie = !productIds.length ? [] : productIds;

            //update cookie
            this.$cookies.set('shopping_cart', JSON.stringify(
                cookie
            ));

            this.totalCosts = ProductLogic.calculateBasketCosts(this.cartItems);
            //update shopping cart count for App
            this.$root.$emit('updateCount', ProductLogic.getTotalQuantity(this.cartItems));
        },
        navigateToDetails(productId) {
            this.$router.push({
                name: 'details',
                query: { id: productId }
            });
        },
        buyProducts() {

            let user = this.$session.get('user');
            
            if(user == undefined) {
                this.$alert(this.$ml.get('notLoggedIn'));
                return;
            }

            let content = '';
            this.cartItems.forEach(cartItem => {
                content += cartItem.quantity 
                        + ' ' 
                        + cartItem.product.name;

                if(cartItem.quantity > 1) {
                    content += 's' ;
                }
                content += '<br>';
            });
    
            UserDao.getUserEmail(user.id)
                .then((response) => {
                    let userEmail = response;

                    const templateParams = {
                        userEmail: userEmail,
                        from_name: 'VUE product store',
                        to_name: user.username,
                        totalAmount: this.totalCosts,
                        content: content,
                    };    
                    
                    emailjs.send('gmail','template_yJSsptkS', templateParams, 'user_MLsO3wteUJABxjh2UIkQu')
                        .then((response) => {

                            //catch result with then(r) -> r.value
                            this.$fire({
                                title: "Vue Product Store",
                                text: this.$ml.get('successSendEmail'),
                                type: "success",
                                timer: 3000
                            });
                            ProductDao.removeBasketProductsFromStore(this.cartItems);
                            this.$cookies.set('shopping_cart', '');
                            this.cartItems = [];
                            this.$root.$emit('updateCount', 0);

                        }, (err) => {

                            this.$fire({
                                title: "Vue Product Store",
                                text: this.$ml.get('errorSendEmail'),
                                type: "error",
                                timer: 3000
                            });
                        }); 
                });
        }
    },
    computed: {
        mlCartItems() {      
            //user has 1 item in his shoppingcart with 1 quantity
            if(this.cartItems.length == 1 && this.cartItems[0].quantity == 1) {
                return new MLBuilder('itemInCart');
            }   
            else return new MLBuilder('itemsInCart').with('p', this.totalQuantity);
        },
        mlTotalCosts() {
            return new MLBuilder('totalCosts').with('c', this.totalCosts);
        }
    },
}
</script>

<style src="./ShoppingCart.css"></style>
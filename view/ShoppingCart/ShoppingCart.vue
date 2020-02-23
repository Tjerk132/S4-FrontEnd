<template>
    <div>
        <h3>
            Your shopping cart
        </h3>
        <h4 v-if="!cartItems.length">
            You have no items in your shopping cart
        </h4>
        <div v-else>
             <table class="shoppingcartTable">
                <thead>
                    <td>
                    </td>
                    <td>
                        <strong>
                            Name
                        </strong>
                    </td>
                    <td>
                        <strong>
                            Price
                        </strong>
                    </td>
                </thead>
                <tr class="shoppingCartItems" v-for="item in cartItems" :key="item.item">
                    <td>
                        <img v-bind:src="item.imageUrl" class="shoppingcartImage" alt="product image">
                    </td>
                    <td class="shoppingcartName">
                        {{item.name}}
                    </td>

                    <td class="shoppingcartPrice">
                        {{item.price}}
                    </td>

                    <td class="shoppingCartOptions">
                        <button v-on:click="removeFromCart(item)" class="shoppingCartRemoveBtn">Remove</button>
                        <div class="optionsDivider" />
                        <button v-on:click="navigateToDetails(item.id, item.name)" class="shoppingCartDetailsBtn">Details</button>
                    </td>
                </tr>
            </table>
            <h4>
              Total costs {{totalCosts}}
            </h4>
        </div>
        <button v-on:click="navigateToProducts()">Back to products</button>
    </div>
</template>

<script>
import ProductLogic from '../../logic/ProductLogic.js';
import ProductDao from '../../daos/productdao.js';
import Product from '../../models/Product.js';

export default {
    data() {
        return {
            cartItems: [],
            totalCosts: Number
        }
    },
    mounted() {
        console.log('in shoppingcart mounted');

        let productIds = JSON.parse( 
            this.$cookies.get('shopping_cart'));
        //shopping cart is not empty
        if(productIds.length) {

            productIds.forEach(id => {

                ProductDao.getProductById(id)
                .then((product) => {

                    this.cartItems.push(product);

                    //all items are retrieved
                    if(this.cartItems.length == productIds.length) {
                        console.log("done fetching basket: " + this.cartItems.length + " products");
                        this.totalCosts = ProductLogic.calculateBasketCosts(this.cartItems);
                    }
                });
            });
        }
    },
    methods: {

        removeFromCart(product) {

            let products = ProductLogic.removeFromShoppingCart(product, this.cartItems);
                
            let productIds = ProductLogic.getProductIds(products);

            let cookie = !productIds.length ? [] : productIds;

            //update cookie
            this.$cookies.set('shopping_cart', JSON.stringify(
                cookie
            ));

            this.cartItems = products;
            this.totalCosts = ProductLogic.calculateBasketCosts(products);
            //update shopping cart count for App
            this.$root.$emit('updateCount', products.length);
        },
        navigateToProducts() {
            this.$router.push('products');
        },
        navigateToDetails(productId, productName) {
             this.$router.push({
                name: 'productDetails',
                params: { id: productId }
            });
        },
    }
}
</script>

<style src="./ShoppingCart.css"></style>
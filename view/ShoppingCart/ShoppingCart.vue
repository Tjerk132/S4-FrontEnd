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
                        <strong>
                            Quantity
                        </strong>
                    </td>
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
                        <button v-on:click="removeFromCart(item.product)" class="shoppingCartRemoveBtn">Remove</button>
                        <button v-on:click="addToCart(item.product)" class="shoppingCartAddBtn">Add</button>
                        <button v-on:click="navigateToDetails(item.product.id)" class="shoppingCartDetailsBtn">Details</button>
                    </td>
                </tr>
            </table>
            <h3>
              Total costs {{totalCosts}}
            </h3>
        </div>
    </div>
</template>

<script>
import ProductLogic from '../../logic/ProductLogic.js';
import ProductDao from '../../data/productdao.js';
import ShopppingCartItem from '../../models/ShoppingCartitem.js';

export default {
    data() {
        return {
            cartItems: [],
            totalCosts: Number
        }
    },
    mounted() {

        let productIds = JSON.parse( 
            this.$cookies.get('shopping_cart'));
        //shopping cart is not empty
        if(productIds.length) {

            productIds.forEach(id => {

                ProductDao.getProductById(id)
                .then((product) => {
                    
                    //filter duplicate products
                    this.cartItems = ProductLogic.existsInBasket(product, this.cartItems);

                    //all items are retrieved
                    let totalQuantity = ProductLogic.getTotalQuantity(this.cartItems);
                    if(totalQuantity == productIds.length) {
                        console.log("done fetching basket: " + this.cartItems.length + " products");
                        this.totalCosts = ProductLogic.calculateBasketCosts(this.cartItems);
                    }
                });
            });
        }
    },
    methods: {

        removeFromCart(product) {

            this.cartItems = ProductLogic.removeFromShoppingCart(product, this.cartItems);
            
            this.refreshComponents();  
        },
        addToCart(product) {

            this.cartItems = ProductLogic.addToShoppingCart(product, this.cartItems);

            this.refreshComponents();
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
                name: 'productDetails',
                params: { id: productId }
            });
        },
    }
}
</script>

<style src="./ShoppingCart.css"></style>
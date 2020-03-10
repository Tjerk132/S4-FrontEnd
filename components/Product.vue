<template>
    <div>
         <td class="productInfo">

            <h3>
                {{product.name}}
                <img v-bind:src="product.imageUrl" class="productImage" alt="product image">
            </h3>
            <div class="productDescription">
                <strong>Description</strong>
                <p>{{product.description}}</p>
            </div>

        </td>

        <td class="productOptions">
            <button class="addToCartBtn" v-on:click="addToCart(product.id)">Add to cart</button>
            <div class="optionsDivider" />
            <button class="commentBtn" v-on:click="goToProductDetails(product.id, product.name)">Comments</button>
        </td>

        <td class="productDetails">

                <h4>Details</h4>
            <p>${{product.price}}</p>
            <p>{{product.stockCount}} in stock</p>
            <p>
                {{product.reviewCount}}
                <span v-if="product.reviewCount != 1">reviews</span>
                <span v-else>review</span>
            </p>

        </td>
    </div>
</template>

<script>
import Product from '../models/Product.js';
import ProductLogic from '../logic/ProductLogic.js'

export default {
     props: {    
      Product: Object
    },
    data() {
        return {
            product: Object
        }  
    },
    mounted() {
        console.log('in productmounted');
        this.product = this.Product;
    },
    methods: {
        goToProductDetails(productId, productName) {

            this.$router.push({
                name: 'productDetails',
                params: { id: productId }
            });
        },
        addToCart(productId) {

            //get products from cookie
            let productsIds = JSON.parse(
                this.$cookies.get('shopping_cart'));

            productsIds = ProductLogic.addToShoppingCart(productId, productsIds);

            this.$cookies.set('shopping_cart', JSON.stringify(productsIds));

            //update shopping cart count for App
            this.$root.$emit('updateCount', productsIds.length);
        }
    }
}
</script>
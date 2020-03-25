<template>
    <div>
         <td class="productInfo">

            <h3>
                {{product.name}}
                <img v-bind:src="product.imageUrl" class="productImage" alt="product image">
            </h3>
            <div class="productDescription">
                <strong v-text="$ml.get('description')"/>
                <p>{{product.description}}</p>
            </div>

        </td>

        <td class="productOptions">
            <button class="AddToCartBtn" v-on:click="addToCart(product.id)" v-text="$ml.get('addToCart')"/>
            <div class="optionsDivider" />
            <button class="DetailsBtn" v-on:click="goToProductDetails(product.id, product.name)" v-text="$ml.get('details')"/>
        </td>

        <td class="productDetails">
            <h4 v-text="$ml.get('details')"/>
            <p>{{product.price}},-</p>
            <p v-text="$ml.get('Stock')"/>
            <p v-text="$ml.get('Review')"/>
        </td>
    </div>
</template>

<script>
import Product from '../../models/Product.js';
import ProductLogic from '../../logic/ProductLogic.js';

import { MLBuilder } from 'vue-multilanguage';

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
        console.log('creating a product');
        this.product = this.Product;
    },
    methods: {
        goToProductDetails(productId, productName) {

            this.$router.push({
                name: 'details',
                query: { id: productId }
            });
        },
        addToCart(productId) {

            //get products from cookie
            let productIds = JSON.parse(
                this.$cookies.get('shopping_cart'));

            //shopping cart is empty
            if(productIds == null) {
                productIds = [];
            }

            productIds.push(productId);

            this.$cookies.set('shopping_cart', JSON.stringify(productIds));

            //update shopping cart count for App
            this.$root.$emit('updateCount', productIds.length);
        }
    },
    computed: {
        mlStock() {            
            return new MLBuilder('inStock').with('s', this.product.stockCount);
        },
        mlReview() {
            let reviewCount = this.product.reviewCount;
            if(reviewCount != 1) {
                return new MLBuilder('reviews').with('r', reviewCount);
            }
            else return new MLBuilder('review').with('r', reviewCount);
        }
  }
}
</script>

<style src='./Product.css'></style>
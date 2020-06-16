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
             <div class="optionsDivider" v-if="role === 'USER'"/>

            <button :class="product.stockCount == 0 ? 'addToCartBtnDisabled' : 'addToCartBtn'"  v-on:click="addToCart(product.id)">
               <span v-text="$ml.get('addToCart')"/>
            </button>

            <div class="optionsDivider" v-if="role === 'USER'"/>

            <button class="detailsBtn" v-on:click="goToProductDetails(product.id)">  
                <span v-text="$ml.get('details')"/>
            </button>   

            <button class="editBtn" v-on:click="modifyProduct(product.id)" v-if="role === 'ADMIN'">                        
                <span v-text="$ml.get('editProductBtn')"/>
            </button>
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
import Product from '@/models/Product.js';

import ProductLogic from '@/logic/ProductLogic.js';
import JwtLogic from '@/logic/JwtLogic.js';

import CryptoJS from 'crypto-js';

import { MLBuilder } from 'vue-multilanguage';

export default {
    props: {    
      Product: Object
    },
    data() {
        return {
            productLogic: new ProductLogic(),
            jwtLogic: new JwtLogic(),
            product: Object,
            role: {
                type: String,
                default: 'USER'
            },
            key: String
        }  
    },
    mounted() {
        console.log('creating a product');
        this.product = this.Product;
        this.key = this.jwtLogic.getKey(CryptoJS);         

        let user = this.$session.get('user');
        if(user != undefined) {
            let decryptedBytes = CryptoJS.AES.decrypt(user.role, this.key);
            this.role = decryptedBytes.toString(CryptoJS.enc.Utf8);    
        }      

        this.$root.$on('loggedInStatus', (loggedIn) => {
            if(!loggedIn) {
                this.role = 'USER';
            }
        });
    },
    methods: {
        goToProductDetails(productId) {

            if(this.$route.query.id != productId) {

                this.$router.push({
                    name: 'details',
                    query: { id: productId }
                });
            }
        },
        modifyProduct(id) {
           
            if(window.location.pathname != '/modify') {

                this.$router.push({
                    name: 'modify',
                    query: { id: id }
                });
            } 
        },
        addToCart(productId) {

            //get products from cookie
            let productIds = JSON.parse(
                this.$cookies.get('shopping_cart'));

            //shopping cart is empty
            if(productIds == null) {
                productIds = [];
            }

            let productCount = productIds.filter(x => x == productId).length;
            
            //check if user has more products in his shoppingcart then exist in the store
            if(this.product.stockCount - productCount > 0) {
                
                productIds.push(productId);

                this.$cookies.set('shopping_cart', JSON.stringify(productIds));

                //update shopping cart count for App
                this.$root.$emit('updateCount', productIds.length);
            }
            else this.$alert(this.$ml.get('notEnoughInStock'));
        }
    },
    computed: {
        mlStock() {  
            let stockCount = this.product.stockCount;         
            if(stockCount > 0) {
                return new MLBuilder('inStock').with('s', this.product.stockCount);
            }
            else return new MLBuilder('outOfStock');
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

<style src='./Product.css' scoped></style>
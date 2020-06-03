<template>
  <div>
      <ul>
        <li>
            <span v-text="$ml.get('name')"/>
            <input v-model="product.name" >
        </li>
        <li>
            <span v-text="$ml.get('category')"/>
            <select v-model="product.category">
                <option v-for="category in categories" :key="category.category" :selected="category == product.category">
                    {{category}}
                </option>
            </select>
        </li>
        <li>
            <span v-text="$ml.get('imageUrl')"/>
            <div class="imageUrlContainer">
                <img :src="product.imageUrl" v-if="product.imageUrl" v-on:error="imageLoadError($event)" class="productUrlImg">
                <input v-model="product.imageUrl"/>
                <span v-on:click="clearImageUrl()" class="removeUrlSpan"/>
            </div>
        </li>
        <li>
            <span v-text="$ml.get('description')"/>
            <textarea v-model="product.description" />
        </li>
        <li>
            <span v-text="$ml.get('price')"/>   
            <input type="number" step="0.01" min="0" v-model="product.price" />
        </li>
        <li>
            <span v-text="$ml.get('stockCount')"/>
            <input type="number" min="0" v-model="product.stockCount" />
        </li>
        <li>
            <button v-on:click="submit()" v-text="$ml.get('save')"/>
        </li>
      </ul>
    </div>
</template>

<script>
import Product from '@/models/Product.js';
import ProductDao from '@/data/productdao.js';

import CategoryLogic from '@/logic/CategoryLogic.js';
import ModifyProductLogic from '@/logic/ModifyProductLogic.js';

export default {
    props: {
        Product: Object
    },
    data() {
        return {
            product: Product,
            categories: Array
        }
    },
    mounted() {        
        this.product = this.Product;
        ProductDao.getProductCategories()
            .then((categories) => {
                this.categories = CategoryLogic.toReadableCategories(categories);
            });
    },
    methods: {
        clearImageUrl() {
            this.product.imageUrl = '';
        },
        imageLoadError(event) {
            event.target.src= './images/NotFoundImg.png';
        },
        submit() {
            let product = this.product;
            let error = ModifyProductLogic.validateProductAdjustments(product, this.categories);
            product.stockCount = Math.trunc(product.stockCount);

            if(error != undefined) {
                this.$alert(this.$ml.get(error));
                return;
            }        
            this.$emit("submit", product);            
        }
    }
    
}
</script>

<style src="./producttemplate.css" scoped>
</style>
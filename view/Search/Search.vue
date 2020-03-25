<template>
    <div>
        <title v-text="$ml.get('search')"/>
        <h3 v-text="$ml.get('ForQuery')"/>
        <div v-if="products.length">
            <ul>
                 <li v-for="product in products" :key="product.id">    
                    <ProductComp :Product='product'></ProductComp>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import ProductDao from '../../data/productdao.js';

import ProductComp from '../../components/Product/Product.vue';

import { MLBuilder } from 'vue-multilanguage';

export default {
    props: {
        query: String,
    },
    components: {
        ProductComp
    },
    data() {
        return {
            Query: String,
            products: Array,
        }
    },
    mounted() {

        this.Query = this.query;
        ProductDao.getProductsByName(this.query)
            .then((response) => {
                this.products = response;                
            });
    },
    watch: {
        '$route.query.query'(newQuery, oldQuery) {
            this.Query = newQuery;
            ProductDao.getProductsByName(newQuery)
                .then((response) => {
                    this.products = response;
                });
        }
    },
    computed: {
        mlForQuery() {
            let productsLength = this.products.length;
            if(productsLength == 1) {
                return new MLBuilder('result').with('q', this.query);
            }      
            else if(productsLength > 1) {
                return new MLBuilder('results').with('r', productsLength).with('q', this.query);
            }
            else return new MLBuilder('noResults').with('q', this.query);
        }
    }
}
</script>

<style src="./search.css"></style>
<template>
    <div>
        <div v-if="products.length">
            <h3>
                Results for {{Query}}
            </h3>
            <ul>
            <li v-for="product in products" :key="product.id">    
                <ProductComp :Product='product'></ProductComp>
            </li>
            </ul>
        </div>
        <h3 v-else>
            No results for '{{Query}}'
        </h3>
    </div>
</template>

<script>
import ProductDao from '../../data/productdao.js';

import ProductComp from '../../components/Product/Product.vue';

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
    }
}
</script>

<style src="./search.css"></style>
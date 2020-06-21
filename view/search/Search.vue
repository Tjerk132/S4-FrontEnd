<template>
    <div>
        <title v-text="$ml.get('search')"/>
        <h3 v-text="$ml.get('ForQuery')"/>
        <div v-if="products.length">
            <Pagination :key="paginationKey" :Products=products :PageSize=pageSize></Pagination>
        </div>
        <p v-else v-text="$ml.get('noResultsInfo')"/>
    </div>
</template> 

<script>
import ProductLogic from '@/logic/ProductLogic';

import Pagination from '@/components/Pagination/Pagination.vue';

import { MLBuilder } from 'vue-multilanguage';

export default {
    props: {
        query: String,
    },
    components: {
        Pagination,
    },
    data() {
        return {
            productLogic: new ProductLogic(),
            Query: String,
            products: [],
            pageSize: 6,
            paginationKey: 0
        }
    },
    mounted() {

        this.Query = this.query;
        this.fetchSearchResults(this.Query);
    },
    watch: {
        '$route.query.query'(newQuery, oldQuery) {
            this.Query = newQuery;
            this.fetchSearchResults(this.Query);
        }
    },
    methods: {
        fetchSearchResults(query) {
            this.productLogic.getProductsByName(query)
            .then((response) => {
                this.products = response;   
                this.paginationKey++;          
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
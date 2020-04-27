<template>
    <div>
        <span v-if="products.length > pageSize" v-text="$ml.get('Page')"/>
        <ul class="products">
            <li v-for="product in pageOfItems" :key="product.id" class="product">
                <ProductComp :Product='product'/>
            </li>
        </ul>    
        <div v-show="products.length > pageSize" class="navigation">
            <pagination :items="products" :pageSize="PageSize" :labels="customLabels" :disableDefaultStyles="true" @changePage="onChangePage"/>
        </div>
    </div>
</template>

<script>
import ProductComp from '../../components/Product/Product.vue';

import { MLBuilder } from 'vue-multilanguage';

const customLabels = {
    first: '<<',
    last: '>>',
    previous: '<',
    next: '>'
};

export default {
    components: {
        ProductComp
    },
    props: {
        Products: Array,
        PageSize: Number
    },
    data() {
        return {
            pageSize: Number,
            currentPage: Number,
            maxPages: Number,
            pageOfItems: [],
            products: [],
            customLabels
        }
    },
    mounted() {

        this.products = this.Products;
        this.pageSize = this.PageSize;

        //use math.ceil and not toFixed as the last page can have less than 50% of pageSize
        this.maxPages = Math.ceil((this.products.length / this.pageSize));

        // always first page on load
        this.currentPage = 1;
    },
    created() {
        this.$root.$refs.Pagination = this;
    },
    methods: {
        onChangePage(pageOfItems) {
      
            this.currentPage = (this.products.indexOf(pageOfItems[0]) / this.pageSize) + 1;

            this.pageOfItems = pageOfItems;              
        },
        updatePages(products) {
            
            this.maxPages = (products.length / this.pageSize).toFixed(0);
        }
    },
    computed: {
        mlPage() {            
            return new MLBuilder('onPage').with('p', this.currentPage).with('m', this.maxPages);
        }
    },
}
</script>

<style>

</style>
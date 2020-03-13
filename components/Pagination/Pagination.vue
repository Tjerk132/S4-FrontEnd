<template>
    <div>
        <span v-if="products.length > pageSize">
        Currently on page {{currentPage}} of {{maxPages}}
        </span>
        <table class="productsTable">
            <tr v-for="product in pageOfItems" :key="product.id">
                <ProductComp :Product='product'></ProductComp>
            </tr>
        </table>    
        <div v-show="products.length > pageSize" class="navigation">
            <pagination :items="products" :pageSize="PageSize" :labels="customLabels" :disableDefaultStyles="true" @changePage="onChangePage"></pagination>
        </div>
    </div>
</template>

<script>
import ProductComp from '../../components/Product/Product.vue';

const customLabels = {
    first: '<<',
    last: '>>',
    previous: '<',
    next: '>'
};

export default {
    props: {
        Products: Array,
        PageSize: Number
    },
    components: {
        ProductComp,
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

        this.maxPages = (this.products.length / this.pageSize).toFixed(0);

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
    }
}
</script>

<style>

</style>
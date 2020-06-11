<template>
  <div>
      <title v-text="$ml.get('modifyProductPage')"></title>
        <h4 v-text="$ml.get('EditProduct')" class="editPageTitle">
      </h4>
      <productTemplate v-if="loaded" v-on:submit="updateProduct($event)" :Product=product />
  </div>
</template>

<script>
import Product from '@/models/Product.js';
import ProductDao from '@/data/productdao.js';

import { MLBuilder } from 'vue-multilanguage';

import ProductTemplate from '@/components/Templates/ProductTemplate.vue';

export default {
    props: {    
      id: Number
    },
    components: {
        productTemplate: ProductTemplate
    },
    data() {
        return {
            product: Product,
            loaded: false
        }  
    },
    mounted() {
        ProductDao.getProductById(this.id)
            .then((product) => {
                this.product = product;  
                this.loaded = true;
            });
    },
    computed: {
        mlEditProduct() {
            return new MLBuilder('editProduct').with('p', this.product.name);
        },
    },
    methods: {
        updateProduct(product) {

            ProductDao.updateProduct(product)
                .then((res) => {
                    if(res.status = 200) {

                        this.$fire({
                            title: "Vue Product Store",
                            text: this.$ml.get('successEditProduct'),
                            type: "success",
                            timer: 3000
                        });
                    }
                    else {
                        this.$fire({
                            title: "Vue Product Store",
                            text: this.$ml.with('c', res.status).get('errorEditProduct'),
                            type: "error",
                            timer: 5000
                        });
                    }
                });        
        }
    }
}
</script>

<style src="./modify-product.css" scoped></style>
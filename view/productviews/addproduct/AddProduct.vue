<template>
  <div>
      <title v-text="$ml.get('addProductPage')"></title>
        <h4 v-text="$ml.get('addProduct')" class="addPageTitle">
      </h4>
      <productTemplate v-on:submit="addProduct($event)" :Product=product />
  </div>
</template>

<script>
import Product from '@/models/Product.js';
import ProductLogic from '@/logic/ProductLogic.js';

import ProductTemplate from '@/components/Templates/ProductTemplate.vue';

export default {

    components: {
        productTemplate: ProductTemplate
    },
    data() {
        return {
            productLogic: new ProductLogic(),
            product: new Product(),
        }  
    },
    methods: {
        addProduct(product) {
            
            this.productLogic.addProduct(product)
                .then((res) => {
                    if(res.status = 200) {

                        this.$fire({
                            title: "Vue Product Store",
                            text: this.$ml.get('successAddProduct'),
                            type: "success",
                            timer: 3000
                        });
                    }
                    else {
                        this.$fire({
                            title: "Vue Product Store",
                            text: this.$ml.with('c', res.status).get('errorAddProduct'),
                            type: "error",
                            timer: 5000
                        });
                    }
                });        
        }
    }
}
</script>

<style src="./add-product.css" scoped>
</style>
<template>
    <div>
        <div v-if="suggestions.length" class="categorySuggestions">
            <h3 v-text="$ml.get('Suggestions')" class="categorySuggestionsTitle"/>
            <Pagination v-if="!loadingResources" :Products=suggestions  :PageSize=pageSize />
        </div>
  </div>
</template>

<script>
import ProductLogic from '@/logic/ProductLogic.js';

import Pagination from '@/components/Pagination/Pagination.vue';

import { MLBuilder } from 'vue-multilanguage';

export default {

    components: {
        Pagination,
    },
    props: {
        Category: String,
        ProductId: Number
    },
    data() {
        return {
            productLogic: new ProductLogic(),
            category: String,
            //cannot be array for getProductsByCategory
            suggestions: [],
            pageSize: 4,
            //required for pagination (getProductsByCategory async)
            loadingResources: true
        }
    },
    mounted() {  
        this.category = this.Category;
           
        this.productLogic.getProductsByCategory(this.category) 
            .then(suggestions => {
                suggestions.forEach(suggestion => {
                    
                    if(parseInt(suggestion.id, 10) != parseInt(this.ProductId, 10)) {
                        this.suggestions.push(suggestion);
                    }                  
                }); 
                this.loadingResources = false;                           
            });
    },
    computed: {
        mlSuggestions() {            
            return new MLBuilder('suggestionsByCategory').with('c', this.category);
        },
    },

}
</script>

<style src='./categorysuggestions.css' scoped></style>
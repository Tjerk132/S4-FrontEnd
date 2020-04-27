<template>
    <div>
        <div v-if="suggestions.length" class="suggestions">
            <h3 v-text="$ml.get('Suggestions')"/>
            <Pagination v-if="!loadingResources" :Products=suggestions  :PageSize=pageSize />
        </div>
  </div>
</template>

<script>
import ProductDao from '../../data/productdao.js';
import Pagination from '../../components/Pagination/Pagination.vue';

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
           
        ProductDao.getProductsByCategory(this.category) 
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

<style src='./suggestions.css' scoped></style>
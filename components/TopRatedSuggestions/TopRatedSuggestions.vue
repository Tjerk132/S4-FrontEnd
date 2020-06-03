<template>
   <div class="topRatedSuggestions">
        <h3 v-text="$ml.get('topRatedFromStore')" class="topRatedSuggestionsTitle"/>
       <ul>
           <div v-for="suggestion in suggestions" :key="suggestion.id">

               <div v-if="suggestion.avgRating" class="topRatedSuggestion">
                   <star-rating :rating="suggestion.avgRating" :increment="0.01" :star-size="30" :read-only="true"></star-rating>
                   <product-comp :Product='suggestion.product'/>
               </div>
           </div>
        </ul>
  </div>
</template>

<script>
import ProductDao from '@/data/productdao.js';

import ProductComp from '@/components/Product/Product.vue';

export default {

    components: {
        ProductComp
    },
    data() {
        return {
            suggestions: Array,
        }

    },
    mounted() {
       
        ProductDao.getTopRatedProducts()
            .then((response) => {
                this.suggestions = response;            
        });    
    }

}
</script>

<style src='./topratedsuggestions.css' scoped></style>
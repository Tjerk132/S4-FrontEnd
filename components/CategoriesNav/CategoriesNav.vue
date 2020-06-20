<template>
    <div class="categories-container" v-on:mouseleave="showCategoryBar = false">
        
        <button v-on:mouseover="showCategoryBar = true" v-on:click="showCategoryBar = !showCategoryBar" class="viewAllCategoriesBtn">
            <span class="viewAllText" v-text="$ml.get('viewAll')"/> 
            <div>
                <strong v-text="$ml.get('Categories')"/>
            </div>
        </button>

        <nav v-show="showCategoryBar" class="CategoryBar">
            <ul>
                <li v-on:click="goToCategory(category)" v-for="category in categories" :key="category.category">            
                    {{category}}
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import ProductLogic from '@/logic/ProductLogic.js';

import { MLBuilder } from 'vue-multilanguage';

export default {
    
    data() {
        return {
            productLogic: new ProductLogic(),
            categories: [],
            showCategoryBar: false,
        }
    },
    mounted() {  
        
        this.productLogic.getProductCategories()
            .then((categories) => {                
                this.categories = categories;
        });

        addEventListener('scroll', (event) => {            
            this.showCategoryBar = false;
        });
    },
    methods: {
        goToCategory(category) {
            this.showCategoryBar = false;
            //don't navigate to same page
            if(this.$route.query.category != category) {
                this.$router.push({
                    name: 'products',
                    query: { category: category }
                });
            }
        }
    },
    computed: {
        mlCategories() {        
            let showCategoryBarIcon = this.showCategoryBar ? '-' : '+' ;   
            return new MLBuilder('categories').with('0', showCategoryBarIcon);
        },
    },
}
</script>

<style src="./categoriesnav.css"></style>
<template>
    <div>
        <button ref="categoryOptionsBtn" v-on:click="changeCategoryBar()" class="viewAllCategoriesBtn">
            <span class="viewAllText">
                View all
            </span> 
            <div>
                <strong>
                categories
                <span v-if="showCategoryBar"> - </span>
                <span v-else> + </span>
                </strong> 
            </div>
        </button>

        <nav ref="categoryOptions" v-show="showCategoryBar" class="CategoryBar">
            <ul>
                <li v-on:click="goToCategory(category)" v-for="category in categories" :key="category.category">            
                    {{category}}
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import CategoryLogic from '../../logic/CategoryLogic.js';
import ProductDao from '../../data/productdao.js';

export default {
    
    data() {
        return {
            categories: [],
            showCategoryBar: false,
        }
    },
    mounted() {
        
        ProductDao.getProductCategories()
            .then((response) => {
                 this.categories = CategoryLogic.toReadableCategories(response);
        });
        addEventListener('scroll', (event) => {            
            this.showCategoryBar = false;
        });
    },
    methods: {
        changeCategoryBar() {
            this.showCategoryBar = !this.showCategoryBar;
        },
        goToCategory(category) {
            this.showCategoryBar = false;
            let categoryUrl = CategoryLogic.categoryToUrl(category);
            //don't navigate to same page
            if(this.$route.query.category != categoryUrl) {
                
                this.$router.push('/products?category=' + categoryUrl);
            }
        }
    }
}
</script>

<style src="./categoriesnav.css"></style>
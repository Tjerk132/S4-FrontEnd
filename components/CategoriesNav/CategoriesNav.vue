<template>
    <div>
        <button ref="categoryBar" v-on:click="changeCategoryBar()" class="viewAllCategoriesBtn">
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
                <li v-for="category in categories" :key="category.category">            
                    {{category}}
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import HomeLogic from '../../logic/HomeLogic.js';
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
                 this.categories = HomeLogic.toReadableCategories(response);
        });
        addEventListener('scroll', (event) => {
            this.showCategoryBar = false;
        });
    },
    methods: {
        changeCategoryBar() {
            this.showCategoryBar = !this.showCategoryBar;
        },
    }
}
</script>

<style src="./categoriesnav.css"></style>
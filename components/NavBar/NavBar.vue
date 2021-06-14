<template>
   <div class="navbar">

        <button v-on:click="goRoute('/')" v-text="$ml.get('home')" />
        <button v-on:click="goToAllProducts()" v-text="$ml.get('products')" />

        <categoriesNav />

        <searchNav />

        <accountNav />

        <shoppingCartNav />

        <languageNav /> 
 
    </div>
</template>

<script>
import CategoriesNav from '@/components/CategoriesNav/CategoriesNav.vue';
import SearchNav from '@/components/SearchNav/SearchNav.vue';
import AccountNav from '@/components/AccountNav/AccountNav.vue';
import ShoppingCartNav from '@/components/ShoppingCartNav/ShoppingCartNav.vue';
import LanguageNav from '@/components/LanguageNav/LanguageNav.vue';

export default {
    components: {
        categoriesNav: CategoriesNav,
        searchNav: SearchNav,
        accountNav: AccountNav,
        shoppingCartNav: ShoppingCartNav,
        languageNav: LanguageNav
    },
    methods: {
        goRoute(route) {
            //can't navigate to same page
            if(window.location.pathname != route) {
                this.$router.push(route);
            }
        },
        goToAllProducts() {
            if(this.$route.query.category != 'All') {
                this.$router.push({
                    name: 'products',
                    query: { category: 'All' }
                });
            }
        }
    }

}
</script>

<style src="./navbar.css">
</style>
<template>
    <div class="search_input-container">
           
       <input ref="searchQuery" v-on:click='showHistory()' v-on:keyup.enter='search()' v-on:keyup='getSuggestions()' :placeholder="$ml.get('searchFor')">

       <nav ref="searchQueries" v-show="showQueries || showSuggestions" class="searchResultsBar">
            <ul>
                <div v-show="showQueries">
                    <li class="searchBarHeader" v-text="$ml.get('searchedBefore')"/>
                    
                    <li v-for="query in historyQueries" :key="query.query"> 
                        <span>  
                            <p v-on:click='searchQuery(query)'>         
                                {{query}}
                            </p>
                            <a v-on:click='removeFromHistory(query)' v-text="$ml.get('remove')"/>
                        </span>
                    </li>
                </div>

                <div v-show="showSuggestions">
                    <li class="searchBarHeader" v-text="$ml.get('Suggestions')"/>

                    <li class="searchBarSuggestion"  v-on:click='searchSelected(suggestion.id)' v-for="suggestion in suggestions" :key="suggestion.suggestion">  
                        <img class="suggestionImg" v-bind:src="suggestion.imageUrl"> 
                        <p class="suggestionName">         
                            {{suggestion.name}}
                        </p> 
                        <p class="suggestionRating">
                            <span v-text="$ml.with('r', suggestion.reviewCount).get(suggestion.reviewCount == 1 ? 'review' : 'reviews')"/>
                        </p>
                        <strong class="suggestionPrice">{{suggestion.price}},-</strong>                 
                    </li>
                </div>
            </ul>
        </nav>

    </div>
</template>

<script>
import ProductDao from '@/data/productdao.js';
import SearchLogic from '@/logic/SearchLogic.js';

import { MLBuilder } from 'vue-multilanguage';

import SearchQuery from '@/models/SearchQuery.js';

export default {

    data() {
        return {
            historyQueries: Array,
            showQueries: false,
            suggestions: Array,
            showSuggestions: false,
        }
    },
    mounted() {
   
        let queryHistory = JSON.parse( 
            this.$cookies.get('searchQueries'));

        if(queryHistory != undefined) {
            this.historyQueries = queryHistory;
        }

        addEventListener('scroll', (event) => {
            this.showQueries = false;
        });

    },
    computed: {
        mlSuggestions() {            
            return new MLBuilder('suggestions').with('s', this.suggestions.length);
        },
    },
    methods: {
        search() {
            let searchQuery = this.$refs.searchQuery.value;

            //todo create logic method for this
            if(searchQuery.trim() && searchQuery != undefined) {

                let queryHistory = JSON.parse( 
                this.$cookies.get('searchQueries'));

                queryHistory = queryHistory == undefined ? [] : queryHistory;
                
                queryHistory.push(searchQuery);
                
                this.historyQueries = queryHistory;

                this.$cookies.set('searchQueries', JSON.stringify(
                    queryHistory
                ));

                if(this.$route.query.query != searchQuery) {
                    this.$router.push({
                         name: 'search',
                         query: { query: searchQuery }
                    });
                }
                this.refreshSearchNav();
            }

        },
        getSuggestions() {

            let queryInput =  this.$refs.searchQuery.value;
            if(queryInput !== '' && queryInput.trim()) {
                //when inputted remove the historQueries and show suggestions
                this.showQueries = false;

                //get all existing products b the given query
                ProductDao.getProductsByName(queryInput)
                    .then((response) => {
                        this.suggestions = response;
                        this.showSuggestions = response.length;
                });
            }
            else {
                //no input so empty and disable suggestions and show historyQueries
                this.suggestions = [];

                this.showSuggestions = false;
 
                if(this.historyQueries.length) {
                    this.showQueries = true;
                }
            }
        },
        showHistory() {
            let input = this.$refs.searchQuery.value;
            //input not empty
            if(input === '' || input.trim()) {
                this.showQueries = false;
            }
            else this.showQueries = !this.showQueries;    
        },
        removeFromHistory(historyQuery) {
            let queryHistory = SearchLogic.removeFromSearchHistory(historyQuery, this.historyQueries);
            
            this.historyQueries = queryHistory;

            this.$cookies.set('searchQueries', JSON.stringify(
                queryHistory
            ));
            this.showQueries = this.historyQueries.length;
        },
        searchQuery(query) {
            if(this.$route.query.query != query) {

                  this.$router.push({
                        name: 'search',
                        query: { query: query }
                });

                this.refreshSearchNav();
            }
        },
        searchSelected(suggestionId) {

            if(this.$route.query.id != suggestionId) {

                  this.$router.push({
                        name: 'details',
                        query: { id: suggestionId }
                });

                this.refreshSearchNav();
            }
        },
        refreshSearchNav() {
            this.$refs.searchQuery.value = '';
            this.showQueries = false;
            this.showSuggestions = false;
        }
    }
}
</script>

<style src="./searchnav.css"></style>
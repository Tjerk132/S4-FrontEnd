<template>
    <div class="search_input-container">
           
       <input ref="searchQuery" v-on:click='showHistory()' v-on:keyup.enter='search()' v-on:keyup='getSuggestions()' placeholder="Search for..">

       <nav ref="searchQueries" v-show="showQueries || showSuggestions" class="queryHistoryBar">
            <ul>
                <div v-show="showQueries">
                    <li class="searchBarHeader">
                        You searched before
                    </li>
                    <li v-for="query in historyQueries" :key="query.query"> 
                        <span>  
                            <p v-on:click='searchSelected(query)'>         
                                {{query}}
                            </p>
                            <a v-on:click='removeFromHistory(query)'>Remove</a>
                        </span>
                    </li>
                </div>

                <div v-show="showSuggestions">
                    <li class="searchBarHeader">
                        Suggestions 
                    </li>
                    <li class="searchBarSuggestion"  v-on:click='searchSelected(suggestion.name)' v-for="suggestion in suggestions" :key="suggestion.suggestion">  
                        <img class="suggestionImg" v-bind:src="suggestion.imageUrl"> 
                        <p class="suggestionName">         
                            {{suggestion.name}}
                        </p> 
                        <p class="suggestionRating">
                            {{suggestion.reviewCount}} 
                            <span v-if="suggestion.reviewCount == 1">review</span>
                            <span v-else>reviews</span>
                        </p>
                        <strong class="suggestionPrice">{{suggestion.price}},-</strong>                 
                    </li>
                </div>
            </ul>
        </nav>

    </div>
</template>

<script>
import ProductDao from '../../data/productdao.js';
import SearchLogic from '../../logic/SearchLogic.js';

import SearchQuery from '../../models/SearchQuery.js';

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
                this.refreshInput();
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
                this.showQueries = true;
            }
        },
        showHistory() {
            let input = this.$refs.searchQuery.value;
            //input not empty
            if(input != '' && input.trim()) {
                this.showQueries = false;
            }
            this.showQueries = !this.showQueries;    
        },
        removeFromHistory(historyQuery) {
            let queryHistory = SearchLogic.removeFromSearchHistory(historyQuery, this.historyQueries);
            
            this.historyQueries = queryHistory;

            this.$cookies.set('searchQueries', JSON.stringify(
                queryHistory
            ));
            this.showQueries = this.historyQueries.length;
        },
        searchSelected(selectedQuery) {

            if(this.$route.query.query != selectedQuery) {
            
                this.$router.push({
                        name: 'search',
                        query: { query: selectedQuery }
                });

                this.showQueries = false;
                this.showSuggestions = false;

                this.refreshInput();
            }
        },
        refreshInput() {
            this.$refs.searchQuery.value = '';
        }
    }
}
</script>

<style src="./searchnav.css"></style>
<template>
    <div class="search_input-container">

       <input ref="searchQuery" v-on:click='showHistory()' v-on:keyup.enter='search()' placeholder="Search for..">

       <nav ref="searchQueries" v-show="showQueryHistory" class="queryHistoryBar">
            <ul>
                <li v-for="query in historyQueries" :key="query.query">   
                    <strong v-on:click='searchSelectedQuery(query)'>         
                    {{query}}
                    </strong>
                    <a v-on:click='removeFromHistory(query)'>Remove</a>
                </li>
            </ul>
        </nav>

    </div>
</template>

<script>
import SearchLogic from '../../logic/SearchLogic.js';

import SearchQuery from '../../models/SearchQuery.js';

export default {

    data() {
        return {
            historyQueries: Array,
            showQueryHistory: false,
        }
    },
    mounted() {
        let queryHistory = JSON.parse( 
            this.$cookies.get('searchQueries'));

        if(queryHistory != undefined) {
            this.historyQueries = queryHistory;
        }

        addEventListener('scroll', (event) => {
            this.showQueryHistory = false;
        });

    },
    methods: {
        search() {
            let queryInput =  this.$refs.searchQuery;
            let searchQuery = queryInput.value;

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

                queryInput.value = '';
                this.showQueryHistory = false;
            }

        },
        showHistory() {
            if(this.historyQueries != undefined && this.historyQueries.length) {
                this.showQueryHistory = !this.showQueryHistory;
            }
        },
        removeFromHistory(historyQuery) {
            let queryHistory = SearchLogic.removeFromSearchHistory(historyQuery, this.historyQueries);
            
            this.historyQueries = queryHistory;

            this.$cookies.set('searchQueries', JSON.stringify(
                queryHistory
            ));
            this.showQueryHistory = this.historyQueries.length;
        },
        searchSelectedQuery(selectedQuery) {

            if(this.$route.query.query != selectedQuery) {
            
                this.$router.push({
                        name: 'search',
                        query: { query: selectedQuery }
                });
                
                this.showQueryHistory = false;
            }
        },
    }
}
</script>

<style src="./searchnav.css"></style>
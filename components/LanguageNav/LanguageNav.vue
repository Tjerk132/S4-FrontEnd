<template>
    <div class="languageOptions-container">
        <button v-on:click="changeShowLanguageOptions" v-text="$ml.get('changeLanguage')" class="changeLanguageBtn"/>
      
        <nav class="languageOptions">
            <ul>
                <li v-show="showLanguageOptions">
                    <button v-for="lang in $ml.list"
                        :key="lang"
                        v-on:click="changeLanguage(lang)"
                        v-text="lang">
                    </button> 
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showLanguageOptions: false,
        }
    },
    methods: {
        changeShowLanguageOptions() {
            this.showLanguageOptions = !this.showLanguageOptions;
        },
        changeLanguage(lang) {
            this.$ml.change(lang);
            this.showLanguageOptions = false;
        }
    }

}
</script>

<style src="./languagenav.css"></style>
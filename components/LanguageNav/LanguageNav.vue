<template>
    <div class="languageOptions-container" v-on:mouseleave="showLanguageOptions = false">
        <button v-on:mouseover="showLanguageOptions = true" v-on:click="showLanguageOptions = !showLanguageOptions" v-text="$ml.get('changeLanguage')" class="changeLanguageBtn">
        </button>

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
        changeLanguage(lang) {
            this.$ml.change(lang);
            this.showLanguageOptions = false;
        }
    }

}
</script>

<style src="./languagenav.css"></style>
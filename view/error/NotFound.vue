<template>
    <div class="notFoundBody">
        <title v-text="$ml.get('notFound')"/>
        <p>
            <img :src="'S4-FrontEnd/images/NotFound.png'" class="notFoundImg">
        </p>
        <p v-text="$ml.get('PathNotFound')"/>
        <p>
            <button class="goHomeBtn" v-on:click="goHome()" v-text="$ml.get('home')"/>
            <button class="goBackBtn" v-on:click.prevent="goBack()" v-text="$ml.get('goBack')"/>
        </p>

    </div>
</template>
<script>
import { MLBuilder } from 'vue-multilanguage';

export default {
    data() {
        return {
            requestedPath: window.location.pathname
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        goHome() {
            this.$router.push('/');
        }
    },
    computed: {
        mlPathNotFound() {
             return new MLBuilder('unableToFind').with('p', this.requestedPath)
         }
  }
}
</script>

<style src='./not-found.css'></style>

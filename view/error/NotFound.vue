<template>
    <div class="notFoundBody">
        <title>Not Found</title>
        <p>
            <img :src="'./images/NotFound.png'" class="notFoundImg">
        </p>

        Unable to find <strong> {{ requestedPath }} </strong>
        <p>
            <button class="goHomeBtn" v-on:click="goHome()">Home</button>
            <button class="goBackBtn" v-on:click.prevent="goBack()">Go back</button>
        </p>

    </div>
</template>
<script>
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
    }
}
</script>

<style src='./NotFound.css'></style>

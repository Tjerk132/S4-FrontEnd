<template>
    <div>
        <title>Not Found</title>

        <h1 style="color:red">404</h1> 
        <strong><h2>Not Found</h2></strong>

        Unable to find <strong> {{ requestedPath }} </strong>
        <p>
            <v-btn @click="goHome">Home</v-btn>
            <v-btn @click.prevent="goBack">Go back</v-btn>
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

<template>
    <div>
        <h3>
            Account
        </h3>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    mounted() {

    },
    methods: {
        goRoute(route) {
            //can't navigate to same page
            if(window.location.pathname != route) {
                this.$router.push(route);
            }
        }
    }
}
</script>
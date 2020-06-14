<template>
    <div class="accountOptions-container" v-on:mouseleave="showAccountOptions = false">
        <button v-on:mouseover="showAccountOptions = true" v-on:click="showAccountOptions = !showAccountOptions">
            Account
        </button>

        <nav v-show="showAccountOptions" class="accountOptions">
            <ul>
                <li>            
                    <button v-on:click="goRoute('register')" v-text="$ml.get('register')"/>
                </li>
                <li v-show="!loggedIn">            
                    <button v-on:click="goRoute('login')" v-text="$ml.get('login')"/>
                </li>
                <li v-show="loggedIn">
                    <button v-on:click="logout()" v-text="$ml.get('logout')"/>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showAccountOptions: false,
            loggedIn: Boolean,
        }
    },
    mounted() {
        
        this.loggedIn = this.$session.exists();

        addEventListener('scroll', (event) => {            
            this.showAccountOptions = false;
        });

        this.$root.$on('loggedInStatus', (loggedIn) => {
            this.loggedIn = loggedIn;
        });

    },
    methods: {
        goRoute(route) {
            //can't navigate to same page            
            if(window.location.pathname != "/" + route) {
                this.$router.push(route);
                this.showAccountOptions = false;
            }
        },
        logout() {
            this.$session.destroy();
            this.loggedIn = false;
            //update logInStatus to refresh (e.g for newReview author)
            this.$root.$emit('loggedInStatus', false);
            // location.reload();
        }
    }
    
}
</script>

<style src="./accountnav.css"></style>
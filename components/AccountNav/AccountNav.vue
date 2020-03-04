<template>
    <div>
        <button ref="changeAccountOptionsBtn" v-on:click="changeAccountBar()">Account</button>

        <nav ref="accountOptions" v-show="showAccountOptions" class="accountOptions">
            <ul>
                <li>            
                    <button v-on:click="goRoute('/register')">Register</button>
                </li>
                <li>            
                    <button v-on:click="goRoute('/login')">Login</button>
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
        }
    },
    mounted() {
  
        addEventListener('scroll', (event) => {            
            this.showAccountOptions = false;
        });
    },
    methods: {
        changeAccountBar() {
            this.showAccountOptions = !this.showAccountOptions;
        },
        goRoute(route) {
            //can't navigate to same page
            if(window.location.pathname != route) {
                this.$router.push(route);
                this.showAccountOptions = false;
            }
        }
    }
    
}
</script>

<style src="./accountnav.css"></style>
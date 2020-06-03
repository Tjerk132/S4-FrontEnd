<template>
    <div>
        <title v-text="$ml.get('login')"/>
        <div class="container">
            <h1 v-text="$ml.get('login')"/>
            <p v-text="$ml.get('loginMessage')"/>
            <hr>
            <h4 class="authenticationMessage">
                {{message}}
            </h4>
            <label for="username"><b v-text="$ml.get('username')"/></label>
            <p>
            <input ref="username" type="text" name="username" required>
            </p>

            <label for="psw"><b v-text="$ml.get('password')" /></label>
            <p>
            <input ref="password" type="password" name="psw" required>
            </p>

            <div class="authButtons">
                <button type="button" v-text="$ml.get('cancel')" class="cancelbtn"/>
                <button v-on:click='login()' type="submit" v-text="$ml.get('login')" class="signupbtn"/>
            </div>
        </div>
    </div>
</template>

<script>
import UserDao from "@/data/userdao.js";

export default {
    data() {
        return {
            message: String,
        }
    },
    mounted() {
        this.message = '';
    },
    methods: {
        login() {
            let loginRefs = this.$refs;
            let username = loginRefs.username.value;
            let password = loginRefs.password.value; 

            UserDao.loginUser(username, password)
                .then((response) => {
                    if(response == 404) {
                        this.message = this.$ml.get('loginFailed');
                    }
                    else {
                        this.message = this.$ml.get('loginSuccess');

                        let user = response;
                        
                        this.$session.start();
                        this.$session.set('user', user);         

                        this.$root.$emit('loggedInStatus', true);

                        this.$router.push({
                            name: 'products',
                            query: { category: 'All' }
                        });
                    }
                });
        },
    }
}
</script>

<style src="./login.css"></style>
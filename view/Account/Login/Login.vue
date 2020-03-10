<template>
    <div>
        <div class="container">
            <h1>Login</h1>
            <p>Please fill in this form to sign in</p>
            <hr>
            <h4 class="authenticationMessage">
                {{message}}
            </h4>
            <label for="username"><b>Username</b></label>
            <p>
            <input ref="username" type="text" placeholder="Enter username" name="username" required>
            </p>

            <label for="psw"><b>Password</b></label>
            <p>
            <input ref="password" type="password" placeholder="Enter Password" name="psw" required>
            </p>

            <div class="authButtons">
                <button type="button" class="cancelbtn">Cancel</button>
                <button v-on:click='login()' type="submit" class="signupbtn">Login</button>
            </div>
        </div>
    </div>
</template>

<script>
import UserDao from "../../../data/userdao.js";

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
                        this.message = 'Unable to login';
                    }
                    else {
                        this.message = 'Login Success';

                        let user = response;

                        this.$session.start();
                        this.$session.set('user', user);

                        this.$root.$emit('loggedInStatus', true);
                    }
                });
        },
    }
}
</script>

<style src="./login.css"></style>
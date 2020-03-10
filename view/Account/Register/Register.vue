<template>
    <div>
        <div class="container">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>

            <h4 class="authenticationMessage">
                {{message}}
            </h4>

            <label for="username"><b>Username</b></label>
            <p>
            <input ref='username' type="text" placeholder="Enter username" name="username" required>
            </p>

            <label for="psw"><b>Password</b></label>
            <p>
            <input ref='password' type="password" placeholder="Enter Password" name="psw" required>
            </p>

            <label for="psw-repeat"><b>Repeat Password</b></label>
            <p>
            <input ref='repeatPassword' type="password" placeholder="Repeat Password" name="psw-repeat" required>
            </p>
            
            <label>
            <input type="checkbox" checked="checked" name="remember" style="margin-bottom:15px"> Remember me
            </label>

            <p>By creating an account you agree to our <a href="#" style="color:dodgerblue">Terms & Privacy</a>.</p>

            <div class="authButtons">
                <button type="button" class="cancelbtn">Cancel</button>
                <button v-on:click='register()' type="submit" class="signupbtn">Sign Up</button>
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
        register() {
            let registerRefs = this.$refs;
            
            let password = registerRefs.password.value;
            let repeatPassword = registerRefs.repeatPassword.value;

            if(password != repeatPassword) {
                this.message = 'passwords do not match';
                return;
            }

            let username = registerRefs.username.value;

            UserDao.registerUser(username, password)
                .then((response) => {
                    if(response == 400) {
                        this.message = 'A user with that username already exists';
                    }
                    else {
                        this.message = 'register success, you have been logged in';

                        let user = response;

                        this.$session.start();
                        this.$session.set('user', user);

                        this.$root.$emit('loggedInStatus', true);
                    }
                });
        }
    }
}
</script>

<style src="./register.css"></style>
<template>
    <div>
        <title v-text="$ml.get('register')"/>
        <div class="container">
            <h1 v-text="$ml.get('register')"/>
            <p v-text="$ml.get('registerMessage')"/>
            <hr>

            <label for="username"><b v-text="$ml.get('username')"/></label>
            <p>
            <input ref='username' type="text"  name="username" required>
            </p>

            <label for="email"><b>Email</b></label>
            <p>
            <input ref='email' type="text" name="email" required>
            </p>

            <label for="psw"><b v-text="$ml.get('password')"/></label>
            <p>
            <input ref='password' type="password" name="psw" required>
            </p>

            <label for="psw-repeat"><b v-text="$ml.get('repeatPassword')"/></label>
            <p>
            <input ref='repeatPassword' type="password" name="psw-repeat" required>
            </p>
            
            <label>
            <input type="checkbox" checked="checked" name="remember" style="margin-bottom:15px"><span v-text="$ml.get('rememberMe')"/>
            </label>

            <p>
                <span v-text="$ml.get('byCreatingAccount')"/>
                <a href="#" style="color:dodgerblue">Terms & Privacy</a>
            </p>

            <div class="authButtons">
                <button type="button" v-text="$ml.get('cancel')" class="cancelbtn"/>
                <button v-on:click='register()' type="submit" v-text="$ml.get('register')" class="signupbtn"/>
            </div>
        </div>
  </div>
</template>

<script>
import UserDao from "@/data/userdao.js";

import AccountLogic from '@/logic/AccountLogic.js';

export default {
    methods: {
        register() {
            let registerRefs = this.$refs;
            
            let password = registerRefs.password.value;
            let repeatPassword = registerRefs.repeatPassword.value;

            if(password != repeatPassword) {
                this.$alert(this.$ml.get('passwordsDontMatch'));
                return;
            }
            
            let emailAddress = registerRefs.email.value;

            let correctEmail = AccountLogic.validateEmail(emailAddress);

            if(!correctEmail) {
               this.$alert(this.$ml.get('emailIncorrect'));
               return;
            }

            let correctInput = AccountLogic.validateRegister(registerRefs.username, registerRefs.password);
            
            if(!correctInput) {
                this.$alert(this.$ml.get('oneOrMoreFieldsIncorrect'));
                return;
            }

            let username = registerRefs.username.value;

            UserDao.registerUser(username, password, emailAddress)
                .then((response) => {
                    if(response == 400) {
                        this.$alert(this.$ml.get('registerAlreadyExists'));
                    }
                    else {
                        this.message = this.$ml.get('registerSuccess');

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
        }
    },
}
</script>

<style src="./register.css"></style>
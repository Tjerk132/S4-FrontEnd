<template>
    <div>
        <title v-text="$ml.get('register')"/>
        <div class="container">
            <h1 v-text="$ml.get('register')"/>
            <p v-text="$ml.get('registerMessage')"/>
            <hr>

            <label for="username"><b v-text="$ml.get('username')"/></label>
            <p>
            <input v-model="register.username" type="text"  name="username" required>
            </p>

            <label for="email"><b>Email</b></label>
            <p>
            <input v-model="register.email" type="text" name="email" required>
            </p>

            <label for="psw"><b v-text="$ml.get('password')"/></label>
            <p>
            <input v-model="register.password" type="password" name="psw" required>
            </p>

            <label for="psw-repeat"><b v-text="$ml.get('repeatPassword')"/></label>
            <p>
            <input v-model="register.repeatPassword" type="password" name="psw-repeat" required>
            </p>
            
            <label>
            <input type="checkbox" checked="checked" name="remember" style="margin-bottom:15px"><span v-text="$ml.get('rememberMe')"/>
            </label>

            <p>
                <span v-text="$ml.get('byCreatingAccount')"/>
                <a href="#" style="color:dodgerblue">Terms & Privacy</a>
            </p>

            <div class="authButtons">
                <button v-on:click='cancel()' type="button" v-text="$ml.get('cancel')" class="cancelbtn"/>
                <button v-on:click='validateRegister()' type="submit" v-text="$ml.get('register')" class="signupbtn"/>
            </div>
        </div>
  </div>
</template>

<script>
import Register from '@/models/Register.js';
import User from "@/models/User.js";

import AccountLogic from '@/logic/AccountLogic.js';
import JwtLogic from '@/logic/JwtLogic.js';

import CryptoJS from 'crypto-js';

export default {
    data() {
        return {
            register: new Register(),
            accountLogic: new AccountLogic(),
            jwtLogic: new JwtLogic(),
            loggedIn: false
        }
    },
    mounted() {

        this.$root.$on('jwt-retrieved', () => {
            if(!this.loggedIn) {
                this.registerUser();
            }
            else this.$alert(this.$ml.get('stillLoggedIn'));
        }) 
        this.$root.$on('loggedInStatus', (loggedIn) => this.loggedIn = loggedIn);
    },
    methods: {
        validateRegister() {

            let register = this.register;

            let message = this.accountLogic.validateRegister(register.username ,register.email, register.password, register.repeatPassword);
            
            if(message != undefined) {                
                this.$alert(this.$ml.get(message));
                return;
            }
            this.$root.$emit('check-jwt', user);
        },
        registerUser() {

            let register = this.register;

            this.accountLogic.registerUser(register.username, register.password, register.email)
                .then((response) => {

                    if(Number(response)) {
                        this.$alert(this.$ml.get('registerAlreadyExists'));
                    }
                    else {
                        this.message = this.$ml.get('registerSuccess');
        
                        let user = response;
                        let role = user.role;  

                        user.role = CryptoJS.AES.encrypt(role, this.jwtLogic.getKey()).toString();

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
        cancel() {
             this.$router.go(-1);
        }
    },
}
</script>

<style src="./register.css" scoped></style>
<style src="../account.css" scoped></style>
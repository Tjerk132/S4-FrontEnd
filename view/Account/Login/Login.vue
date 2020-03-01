<template>
    <div>
        <div class="container">
            <h1>Login</h1>
            <p>Please fill in this form to sign in</p>
            <hr>

            <label for="username"><b>Username</b></label>
            <input type="text" placeholder="Enter username" name="username" required>

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required>

            <div class="clearfix">
                <button type="button" class="cancelbtn">Cancel</button>
                <button type="submit" class="signupbtn">Login</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style src="./login.css"></style>
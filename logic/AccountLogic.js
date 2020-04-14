function validateRegister(...refs) {

    let valid = true;

    refs.forEach(ref => {
        let input = ref.value;
        
        if(input == undefined || !input.trim()) {
            valid = false;
        }
    }); 
    return valid;   
}

function validateEmail(email) {
    
    let emailReg =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/

    if(!emailReg.test(email))
    {
        return false;
    }
    return true;
}

export default {
    validateRegister,
    validateEmail
}
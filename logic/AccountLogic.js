function validateRegister(email, ...refs) {

    let message;

    
    let emailMessage = validateEmail(email);

    if(emailMessage != undefined) {
        message = emailMessage;
    }


    refs.forEach(ref => {
        let input = ref.value;
        
        if(input == undefined || !input.trim()) {
            message = 'One or more fields were not filled in correctly';
        }
    });    

    return message;
}

function validateEmail(email) {
    
    let emailReg =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/

    if(!emailReg.test(email))
    {
        return "Please enter a correct emailaddress";
    }
}

export default {
    validateRegister,
}
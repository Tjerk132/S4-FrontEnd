function removeItem(item, array) {

    var index = array.indexOf(item);

    //remove first occurance
    return array.splice(array.splice(index, 1));
}

function validateProConInput(string, proconCount) {
    //input is not blank or whitespace
    if(string.trim()) {
        if(proconCount >= 4) {
            return false;
        }
        else return true;
    }
    else return false;
}

function validateReviewSubmit(refs) {

    //validate no empty fields 
    let message; 
    refs.forEach(ref => {
        if(ref.name === 'Star Rating') {

            if(ref.value < 1 || ref.value > 5) {
                message ='Please insert a star rating';
            }
        }
        else if(!ref.value || !ref.value.trim()) {
            message = 'Please fill in the ' + ref.name + ' field';
        }
    });
    return message;
}

export default {
    removeItem,
    validateProConInput,
    validateReviewSubmit,
}   
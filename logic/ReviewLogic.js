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

export default {
    removeItem,
    validateProConInput,
}   
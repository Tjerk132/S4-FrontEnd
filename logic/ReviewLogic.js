function removeItem(item, array) {

    var index = array.indexOf(item);

    //remove first occurance
    return array.splice(array.splice(index, 1));
}

export default {
    removeItem,
}   
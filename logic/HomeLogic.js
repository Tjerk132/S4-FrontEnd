function toReadableCategories(categories) {

    let formattedCategories = [];
    categories.forEach(category => {
        // replace _ with JS global regex to 'space' and set all chars to lowercase
        let formattedCategory = category.replace(/_/g,' ')
            .toLowerCase();
        
        // first char to uppercase
        formattedCategory = formattedCategory
            .charAt(0).toUpperCase()
            + formattedCategory.slice(1);

        formattedCategories.push(formattedCategory);
    });
    return formattedCategories;
}

export default {
    toReadableCategories,
}
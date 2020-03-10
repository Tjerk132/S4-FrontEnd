const ProductDao = require('../data/productdao.js');

async function getByCategory(category) {

    let products = [];
    if(category == 'All') {
        await ProductDao.getAllProducts()
          .then((response) => {
               products = response;
          });
    }   
    else {
        await ProductDao.getProductsByCategory(category)
          .then((response) => {  
             products = response;
        });
    }
    return products;
}

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

 //replace all +'s with spaces ([] eg [+] for calculating symbols)
// = string.replace(/[+]/g, " ");

module.exports = {
    getByCategory,
    toReadableCategories,
}
let host = require('./host.js').host;

let baseUrl = 'http://' + host.ip + ":" + host.port + '/products/';

async function getAllProducts() {

    try {
        let res = await axios.get(baseUrl);
        
        return res.data;
    }
    catch (err) {
        console.error(err);
    }
}

async function getProductById(id) {
    
    try { 
        let url = baseUrl + id;

        let res = await axios.get(url);

        return res.data;
    }
    catch (err) {
        //log everything except user not found
        if(err.response.status != 404) {
            console.error(err);
        }
    }
}

async function getProductCategories() {
    try { 
        let url = baseUrl + "categories";

        let res = await axios.get(url);

        return res.data;
    }
    catch (err) {
        //log everything except user not found
        if(err.response.status != 404) {
            console.error(err);
        }
    }
}

async function getProductsByCategory(category) {
    try {
        let url = baseUrl + "categories/" + category;

        let res = await axios.get(url);

        return res.data;
    }
    catch(err) {
        console.error(err);
    }
}

async function getProductsByName(name) {
    try {   
        let url = baseUrl + "name/" + name;

        let res = await axios.get(url);

        return res.data;
    }
    catch(err) {
        console.error(err);
    }
}

async function removeBasketProductsFromStore(products) {
    try {   
        let url = baseUrl + "removeBasketItems";

        await axios.post(url, {
            products: products
        });
    }
    catch(err) {
        console.error(err);
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    getProductCategories,
    getProductsByCategory,
    getProductsByName,
    removeBasketProductsFromStore,
}


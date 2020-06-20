import axios from '@/services/base-api.js';

let basePath = '/products';

export default class ProductDao {

    async getAllProducts() {

        try {

            let res = await axios.get(basePath);
            
            return res.data;
        }
        catch (err) {
            console.error(err);
        }
    }

    async getProductById(id) {
        
        try { 
            let url = `${basePath}/${id}`;
            console.error(url);
            

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

    async addProduct(product) {

        try {
            let url = `${basePath}/add`;
                    
            let res = await axios.post(url, product);

            return res.data;
        }
        catch (err) {
            console.error(err);      
        }
    }

    async updateProduct(product) {
        try {
            let url = `${basePath}/update`;
                    
            let res = await axios.put(url, product);

            return res.data;
        }
        catch (err) {
            console.error(err);      
        }
    }

    async getProductCategories() {
        try {
            let url = `${basePath}/categories`;
            
            let res = await axios.get(url);

            return res.data;
        }
        catch (err) {
            console.error(err);      
        }
    }

    async getProductsByCategory(category) {
        try {                        
            let url = `${basePath}/categories/${category}`;        

            let res = await axios.get(url);   

            return res.data;
        }
        catch(err) {
            
            console.error(err);
        }
    }

    async getProductsByName(name) {
        try {   
            let url = `${basePath}/name/${name}`;

            let res = await axios.get(url);

            return res.data;
        }
        catch(err) {
            console.error(err);
        }
    }

    async removeBasketProductsFromStore(products) {
        try {   

            let url = `${basePath}/removeBasketItems`;

            let res = await axios.post(url, {
                products: products
            });

            return res.data;
        }
        catch(err) {
            console.error(err);
        }
    }

    async getTopRatedProducts() {
        try {   
            let url = `${basePath}/topRated`;

            let res = await axios.get(url);

            return res.data;
        }
        catch(err) {
            console.error(err);
        }
    }
}


import ProductDao from '@/data/ProductDao.js';

export default class CategoryLogic {

    constructor() {
        this.ProductDao = new ProductDao();
    }

    async getByCategory(category) {

        let products = [];
        if(category == 'All') {
            let response = await this.ProductDao.getAllProducts()
            products = response;
        }   
        else {
            category = this.toRestCategory(category);
            let response = await this.ProductDao.getProductsByCategory(category)
            products = response;
        }
        //category is saved as enum object
        products.map(x => x.category = this.toReadableCategory(x.category.category));
        
        return products;
    }

    toReadableCategory(category) {
                    
        // replace _ with JS global regex to 'space' and set all chars to lowercase
        let formattedCategory = category.replace(/_/g,' ')
            .toLowerCase();
        
        // first char to uppercase
        formattedCategory = formattedCategory
            .charAt(0).toUpperCase()
            + formattedCategory.slice(1);

        return formattedCategory;
    }

    toRestCategory(category) {                     
        return category.replace(/ /g,'_')
        .toUpperCase();    
    }
}
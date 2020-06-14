import ProductDao from '@/data/ProductDao.js';

export default class CategoryLogic {

    constructor() {
        this.ProductDao = new ProductDao();
    }

    async getByCategory(category) {

        let products = [];
        if(category == 'All') {
            await this.ProductDao.getAllProducts()
            .then((response) => {
                products = response;
            });
        }   
        else {
            await this.ProductDao.getProductsByCategory(category)
            .then((response) => {  
                products = response;
            });
        }
        return products;
    }

    toReadableCategories(categories) {

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
}
export default class ModifyProductLogic {

    validateProductAdjustments(product, categories) {

        let error;

        let price = product.price;
        if(parseFloat(price) < 0 || isNaN(parseFloat(price))) {
            error = 'errorInsertPrice';
        }

        let stockCount = product.stockCount;
        if(parseFloat(stockCount) < 0 || isNaN(parseFloat(stockCount))) {
            error = 'errorInsertStockCount';
        }
        
        let category = product.category;
        if(!categories.includes(category)) {
            error = 'errorInsertCategory';
        }
        return error;
    }
}
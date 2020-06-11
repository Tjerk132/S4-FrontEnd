import assert from 'assert';
import ProductDao from '@/data/productdao.js';

describe('ProductDao Tests', () => {

    it('should return all products', async () => {
                  
        const products = await ProductDao.getAllProducts();

        assert.notEqual(products, undefined);
        assert(products.length, true);
    });
    it('should return the correct product', async () => {
                  
        const product = await ProductDao.getProductById(1);

        assert.notEqual(product, undefined);
        assert(product.id, 1);
    });
    it('should get the right amount of categories', async () => {
                  
        const categories = await ProductDao.getProductCategories();

        assert.notEqual(categories, undefined);
        assert(categories.length, 5);
    });
    it('should get product by the given category', async () => {
                  
        const products = await ProductDao.getProductsByCategory('Sports');

        assert.notEqual(products, undefined);
        if(products.length > 1) {
            assert(products[0].category, 'Sports');
        }
    });
    it('should get the right number of top rated products', async () => {
                  
        const products = await ProductDao.getTopRatedProducts();

        assert.notEqual(products, undefined);
        assert.equal(products.length, 5);
    });
});
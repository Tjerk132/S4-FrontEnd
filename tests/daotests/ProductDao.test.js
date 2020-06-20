import assert from 'assert';
import ProductDao from '@/data/productdao.js';

const productDao = new ProductDao();

describe('ProductDao Tests', () => {

    it('should return all products', async () => {

        const products = await productDao.getAllProducts();

        assert.notEqual(products, undefined);
        assert(products.length, true);
    });
    it('should return the correct product', async () => {

        const product = await productDao.getProductById(1);

        assert(product.id, 1);
    });
    it('should get the right amount of categories', async () => {

        const categories = await productDao.getProductCategories();

        assert.notEqual(categories, null);
        assert(categories.length, 5);
    });
    it('should get product by the given category', async () => {

        const products = await productDao.getProductsByCategory('SPORTS');

        assert.notEqual(products, null);
        if(products.length > 1) {
            //category enum object
            assert(products[0].category.category, 'Sports');
        }
    });
    it('should get the right number of top rated products', async () => {

        const products = await productDao.getTopRatedProducts();
        
        assert.notEqual(products, null);
        assert.equal(products.length, 5);
    });
});
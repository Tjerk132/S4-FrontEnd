import assert from 'assert';
import Product from '@/models/Product.js';

describe('Product tests', () => {
    
    let product = new Product(1,'Shoes','url','description',50,'Sports',10,5);
    it('should have correct values', () => {
     
        assert.equal(product.id, 1);
        assert.equal(product.name, 'Shoes');
        assert.equal(product.imageUrl, 'url');
        assert.equal(product.description, 'description');
        assert.equal(product.category, 'Sports');
        assert.equal(product.price, 50);
        assert.equal(product.stockCount, 10);
        assert.equal(product.reviewCount, 5);
    });
});
const assert = require('assert');
const CategoryLogic = require('../logic/CategoryLogic.js');

describe('CategoryLogic Tests', () => {

    it('should format to readable', () => {
        
        let categories = [
            'house_and_living',
            'outdoor_products'
        ];

        categories = CategoryLogic.toReadableCategories(categories);

        assert.equal(categories[0], 'House and living');
        assert.equal(categories[1], 'Outdoor products');
    });

    it('should format category to url', () => {
        
        let category = 'house and living';

        category = CategoryLogic.categoryToUrl(category);

        assert.equal(category, 'house+and+living');
    });

    it('should format utl to category', () => {
        
        let category = 'house+and+living';

        category = CategoryLogic.urlToCategory(category);

        assert.equal(category, 'house and living');
    });
});
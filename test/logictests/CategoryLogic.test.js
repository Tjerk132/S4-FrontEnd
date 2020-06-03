import assert from 'assert';
import CategoryLogic from '@/logic/CategoryLogic.js';

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
});
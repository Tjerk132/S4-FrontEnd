import assert from 'assert';
import CategoryLogic from '@/logic/CategoryLogic.js';

const categoryLogic = new CategoryLogic();

describe('CategoryLogic Tests', () => {

    it('should format to readable', () => {
        
        let categories = [
            'house_and_living',
            'outdoor_products'
        ];

        categories = categories.map(x => x = categoryLogic.toReadableCategory(x))        

        assert.equal('House and living', categories[0]);
        assert.equal('Outdoor products', categories[1]);
    });
});
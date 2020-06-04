import assert from 'assert';
import ReviewDao from '@/data/reviewdao.js';

describe('ReviewDao Tests', () => {

    it('should return the correct reviews by product', async () => {
                  
        const reviews = await ReviewDao.getAllReviewsByProduct(1);

        assert.notEqual(reviews, undefined);
        if(reviews.length > 1) {
            assert(reviews[0].productId, 1);
        }
    });
});
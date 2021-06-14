import assert from 'assert';
import Review from '@/models/Review.js';

describe('Review Tests', () => {

    it('should create correctly', () => {
        
        let review = new Review('author','title','content', 5);
        assert.equal(review.date, Date.now());
    });

    it('should set id product correctly', () => {
        
        let review = new Review('author','title','content', 5);
        review.setProductId(1);
        assert.equal(review.productId, 1);
    });
    it('should add pros and cons correctly', () => {
        
        let review = new Review('author','title','content', 5);
        review.addPros(...[
            'pro1',
            'pro2'
        ]);

        review.addCons(...[
            'con1'
        ]);
        assert.equal(review.pros.length, 2);
        assert.equal(review.cons.length, 1);
    });
});
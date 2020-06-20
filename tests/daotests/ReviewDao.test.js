import assert from 'assert';
import ReviewDao from '@/data/reviewdao.js';

const reviewDao = new ReviewDao();

// describe('ReviewDao Tests', () => {

//     it('should return the correct reviews by product', async () => {
                  
//         const reviews = await reviewDao.getAllReviewsByProduct(1);

//         assert.notEqual(reviews, undefined);
//         if(reviews.length > 1) {
//             assert(reviews[0].productId, 1);
//         }
//     });
// });
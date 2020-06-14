import axios from '@/services/base-api.js';

let basePath = '/reviews';

export default class ReviewDao {

    async getAllReviewsByProduct(id) {

        try {        
            let url = `${basePath}/product/${id}`;

            let res = await axios.get(url);

            return res.data;
        }
        catch (err) {
            console.error(err);
        }
    }

    async addReview(review) {

        try {

            let url = `${basePath}/add`;
            
            let res = await axios.post(url, review);

            return res.data;
        }
        catch(err) {
            console.error(err);
        }
    }

}


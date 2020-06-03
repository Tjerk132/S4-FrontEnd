import axios from '@/services/base-api.js';

let basePath = '/reviews';

async function getAllReviewsByProduct(id) {

    try {        
        let url = `${basePath}/product/${id}`;

        let res = await axios.get(url);

        return res.data;
    }
    catch (err) {
        console.error(err);
    }
}

async function addReview(review) {

    try {

        let url = `${basePath}/add`;

        console.log(review);
        
        let res = await axios.post(url, review);

        return res.data;
    }
    catch(err) {
        console.error(err);
    }
}

export default {
    
    getAllReviewsByProduct,
    addReview,
}


<template>
    <div>
        <title v-text="$ml.get('Details')"/>
        <h3 v-text="$ml.get('Details')"/>

        <div class="productDetailsDiv">
            <!-- 1 -->
            <div class="productDetailsInfoContainerDiv">

                <div class="productDetailsImg">
                    <zoom-on-hover :img-normal="product.imageUrl" :img-zoom="product.imageUrl" :scale="1" ref="productImg" alt="product image">
                    </zoom-on-hover>     
                </div>

                <div class="productDetailsInfoDiv">

                    <div class="productDescription">
                        <strong v-text="$ml.get('description')"/>
                        <p>{{product.description}}</p>
                    </div>

                    <strong v-text="$ml.get('price')"/>
                    <p>{{product.price}},-</p>

                    <strong v-text="$ml.get('stockCount')"/>
                    <p v-text="$ml.get('Stock')"/>

                    <strong v-text="$ml.get('reviewCount')"/>
                    <p v-text="$ml.get('Review')"/>
                </div> 

            </div>
            <!-- 2 -->
            <div>
                <categorySuggestions v-if="!loadingData" :Category='product.category' :ProductId='product.id' class="productSuggestions"/>
            </div> 
            <!-- 3 -->
            <div/>
            <!-- 4 -->
            <div/>

            <!-- 5 -->
            <div class="productReviews">
                <ReviewsComp v-if="!loadingData" :Reviews='reviews' :Product='product' />
            </div>

            <!-- 6 -->
            <div>
                <top-rated-suggestions/>
            </div>
            <!-- 7 -->
            <div/>
            <!-- 8 -->
            <div/>
        </div>
    </div>
</template>

<script>
import ReviewsComp from '@/components/Reviews/Reviews.vue';
import CategorySuggestions from '@/components/CategorySuggestions/CategorySuggestions.vue';
import TopRatedSuggestions from '@/components/TopRatedSuggestions/TopRatedSuggestions.vue';

import ReviewDao from '@/data/reviewdao.js';
import ProductDao from '@/data/productdao.js';

import { MLBuilder } from 'vue-multilanguage';

export default {

    components: {
        ReviewsComp,
        CategorySuggestions,
        TopRatedSuggestions

    },
    props: {    
      id: Number,    
    },
    data() {
        return {
            product: Object,
            reviews: Array,
            loadingData: 2
        }
    },
    mounted() {

        window.scrollTo(0,0);

        this.fetchProductDetails(this.id);
    }, 
    watch: {
      '$route.query.id'(newId, oldId) {
          this.fetchProductDetails(newId);
      }
    },
    methods: {
        fetchProductDetails(id) {

            this.loadingData = 2;

            ProductDao.getProductById(id)
            .then((product) => {
                this.product = product;  
                this.loadingData -= 1;                
            });

            ReviewDao.getAllReviewsByProduct(id)
                .then((reviews) => {
        
                this.reviews = reviews;
                this.loadingData -= 1;  
            });
        },
        changeScale() {
            console.log(this.$refs.productImg);
            
            this.$refs.productImg.style.scale += 1;
        }
    },
    computed: {
        mlDetails() {            
            return new MLBuilder('detailsFor').with('p', this.product.name);
        },   
        mlStock() {  
            let stockCount = this.product.stockCount;         
            if(stockCount > 0) {
                return new MLBuilder('inStock').with('s', this.product.stockCount);
            }
            else return new MLBuilder('outOfStock');
        },
        mlPrice() {  
            return new MLBuilder('Productprice').with('p', this.product.price); 
        },
        mlReview() {
            let reviewCount = this.product.reviewCount;
            if(reviewCount != 1) {
                return new MLBuilder('reviews').with('r', reviewCount);
            }
            else return new MLBuilder('review').with('r', reviewCount);
        }
    },
}
</script>

<style src='./productdetails.css' scoped></style>
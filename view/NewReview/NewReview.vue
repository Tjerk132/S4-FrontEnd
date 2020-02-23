<template>
    <div class="reviews">
        <ul class="review">
            <h4>Create a review</h4>
            <li>    
                <p>Title</p>
                <input ref="title" class="inputItem">
            </li>
            <li>
                <p>StarRating</p>
                <input ref="starRating" :max="5" :min="0" type="number" class="inputItem">
            </li>
                <p>
                    <strong>Pros and cons</strong>
                </p>
                <ul>
                    <div v-if="pros.length">
                        <h5>Pros</h5>
                        <li v-for="pro in pros" :key="pro.pro">
                            {{pro}} 
                            <button v-on:click="removePro(pro)" class="removeProConBtn">Remove</button>
                        </li>
                    </div>  
                </ul>

                <p>Add a pro</p>
                <input ref="pro" v-on:keyup.enter='addPro()' class="inputItem">
                <ul>
                    <div v-if="cons.length">
                        <h5>Cons</h5>
                        <li v-for="con in cons" :key="con.con">
                            {{con}}
                            <button v-on:click="removeCon(con)" class="removeProConBtn">Remove</button>
                        </li>
                    </div>
                </ul>
                
                <p>Add a con</p>
                <input ref="con" v-on:keyup.enter='addCon()' class="inputItem">
            <li>
                <p>Content</p>
                <textarea ref="content" class="reviewTextArea" placeholder="Place your review here"></textarea>
            </li>
            <button v-on:click="submitReview()" class="submitReviewBtn">Submit</button>
        </ul>
    </div>
</template>

<script>
import ReviewLogic from '../../logic/ReviewLogic.js';
import Review from '../../models/Review.js';
export default {
    data() {
        return {
            pros: [],
            cons: [],
        }
    },
    methods: {
        addPro() {
            let proInput = this.$refs.pro;
            let pro = proInput.value;
            if(!!pro.trim()) {
                if(this.pros.length >= 4) {
                    this.$alert('Please use 4 pros max');
                }
                else {
                    this.pros.push(pro);
                    proInput.value = '';
                }
            }
        },
        removePro(pro) {
            this.pros = ReviewLogic.removeItem(pro, this.pros);
        },
        addCon() {
            let conInput = this.$refs.con;
            let con = conInput.value;
            if(!!con.trim()) {
                if(this.cons.length >= 4) {
                    this.$alert('Please use 4 cons max');
                }
                else {
                    this.cons.push(con);
                    conInput.value = '';
                }
            }
        },
        removeCon(con) {
            this.cons = ReviewLogic.removeItem(con, this.cons);
        },
        submitReview() {
            
            let refs = this.$refs;

            let title = refs.title.value;
            let content = refs.content.value;
            let starRating = refs.starRating.value;

            //validate no empty fields
            if(!!title.trim() && !!content.trim() && !!starRating.trim()) {

                let review = new Review(
                    title,
                    content,
                    starRating,
                    0
                ); 
                //add elements from array individually
                review.addPros(...this.pros);
                review.addCons(...this.cons);

                this.$root.$emit('addReview', review);
            }
            else this.$alert('Please fill in all fields to submit your review');
        }
    }
}
</script>

<style src='./NewReview.css'></style>
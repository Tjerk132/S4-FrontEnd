<template>
    <div class="reviews">
        <ul class="review">
            <h4>Create a review</h4>
            <li>    
                <p>Title</p>
                <input ref="title" class="inputItem" required>
            </li>
            <li>
                <p>StarRating</p>
                <input ref="starRating" :max="5" :min="0" type="number" class="inputItem" required>
            </li>
                <p>
                    <strong>Pros and cons</strong>
                </p>
                <p class="toSubmitText">
                    Enter to submit
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

                <p></p>
                <input ref="pro" v-on:keyup.enter='addPro()' class="inputItem" placeholder="Add a pro">
                <ul>
                    <div v-if="cons.length">
                        <h5>Cons</h5>
                        <li v-for="con in cons" :key="con.con">
                            {{con}}
                            <button v-on:click="removeCon(con)" class="removeProConBtn">Remove</button>
                        </li>
                    </div>
                </ul>
                <p></p>
                <input ref="con" v-on:keyup.enter='addCon()' class="inputItem" placeholder="Add a con">
            <li>
                <p>Content</p>
                <textarea ref="content" class="reviewTextArea" placeholder="Place your review here" required></textarea>
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
            author: String
        }
    },
    mounted() {
        if(this.$session.exists()) {
            this.author = this.$session.get('user').username;
        }    
        this.$root.$on('loggedInStatus', (loggedIn) => {
            if(!loggedIn) {
                this.author = '';
            }
        });
    },
    methods: {
        addPro() {
            let proInput = this.$refs.pro;
            let pro = proInput.value;

            if(ReviewLogic.validateProConInput(pro, this.pros.length)) {
                this.pros.push(pro);
                proInput.value = '';
            }
            else this.$alert('Please use 4 pros max');
        },
        removePro(pro) {
            this.pros = ReviewLogic.removeItem(pro, this.pros);
        },  
        addCon() {
            let conInput = this.$refs.con;
            let con = conInput.value;

            if(ReviewLogic.validateProConInput(con, this.cons.length)) {
                this.cons.push(con);
                conInput.value = '';
            }
            else this.$alert('Please use 4 cons max');
        },
        removeCon(con) {
            this.cons = ReviewLogic.removeItem(con, this.cons);
        },
        submitReview() {

            if(Object.keys(this.author).length === 0 || this.author === '{}') {
                this.$alert("You are not logged in");
                return;
            }
            
            let refs = this.$refs;

            let message = ReviewLogic.validateReviewSubmit(
                [
                    { 
                        name: 'Content', 
                        value: refs.content.value 
                    }, 
                    { 
                        name: 'StarRating',
                        value: refs.starRating.value 
                    },
                    { 
                        name: 'Title', 
                        value: refs.title.value 
                    },
                ]
            );

            if(message != undefined) {
                this.$alert(message);
            }
            else if(this.author != undefined ) {
                    
                let review = new Review(
                    this.author,
                    refs.title.value,
                    refs.content.value,
                    refs.starRating.value,  
                ); 
                //add elements from array individually
                review.addPros(...this.pros);
                review.addCons(...this.cons);

                this.$root.$refs.detailsPage.addReview(review);
            }      
        }
    }
}
</script>

<style src='./NewReview.css'></style>
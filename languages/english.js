import { MLanguage } from 'vue-multilanguage';

export default
    new MLanguage('English').create({

        homePage: 'Home page',
        homeTitle: 'Hello {0}!',
        homeGreeting: 'Welcome to the product store!',

        productPage: 'Products page',
        productCategory: 'Products for category: {c}',
        productsAll: 'All products',
        NoProductsFound: 'No products found for this category',

        scrollToTop: 'scroll to top',

        description: 'Description',
        addToCart: 'Add to cart',
        details: 'Details',
        inStock: '{s} in stock',
        outOfStock: 'Out of stock!',
        notEnoughInStock: 'Not enough of this product in stock',
        review: '{r} review',
        reviews: '{r} reviews',
        onPage: 'Currently on page {p} of {m}',

        noItemsInCart: 'You have no items in your shopping cart',
        itemsInCart: 'Your shopping cart has {p} products',
        itemInCart: 'Your shopping cart has 1 product',

        quantity: 'Quantity',
        name: 'Name',
        price: 'Price',

        remove: 'Remove',
        add: 'Add',

        shoppingcart: 'Shopping cart',

        buyProducts: 'Buy products',
        totalCosts: 'Total costs {c}',

        detailsFor: 'Details for {p}',
        reviewsFor: 'Reviews for {p}',

        noReviewsYet: 'No reviews for this product yet...',

        createReview: 'Create a review',
        reviewTitle: 'Title',
        starRating: 'Star rating',
        submitProCon: 'Press {k} to submit',
        prosAndCons: 'Pros and Cons',
        addPro: 'Add a pro',
        addCon: 'Add a con',
        content: 'Content',
        submit: 'Submit',

        reviewUseful: 'Was this review useful?',

        showMoreReviews: 'Show more reviews',
        showLessReviews: 'Show less reviews',

        numberOfReviews: 'Number of reviews: {r}',
        outOf: 'out of {t}',

        registerMessage: 'Please fill in this form to register',
        username: 'Username',
        password: 'Password',
        repeatPassword: 'Repeat password',
        passwordsDontMatch: 'The passwords do not match',
        emailIncorrect: 'Please enter a valid emailaddress',
        oneOrMoreFieldsIncorrect: 'One or more fields were not filled in correct',

        rememberMe: 'Remember me',
        byCreatingAccount: 'By creating an account you agree to our ',

        register: 'Register',
        registerAlreadyExists: 'A user with that username already exists',
        registerSuccess: 'register success, you have been logged in',

        loginMessage: 'Please fill in this form to sign in',

        cancel: 'Cancel',
        login: 'Login',
        notLoggedIn: 'You are not logged in',
        loginSuccess: 'Login success',
        loginFailed: 'Unable to login',
        logout: 'Logout',

        viewAll: 'View all',
        categories: 'categories {0}',

        products: 'Products',

        changeLanguage: 'Change language',

        result: '1 result for {q}',
        results: '{r} results for {q}',
        noResults: 'No results for {q}',

        notFound: 'Not found',
        unableToFind: 'Unable to find {p}',
        home: 'Home',
        goBack: 'Go back',

        search: 'Search',
        suggestions: 'Suggestions',
        searchedBefore: 'You searched before',
        searchFor: 'Search for...',

        suggestionsByCategory: 'Suggestions for category {c}',

        successSendEmail: 'An email has successfully been send to the email corresponding to your account',

    })
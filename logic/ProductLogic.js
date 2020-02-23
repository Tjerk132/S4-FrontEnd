    function addToShoppingCart(newProduct, products) {
        
        products = checkExistingBasket(products);
      
        products.push(newProduct);
        
        return products;
    } 
    
    function removeFromShoppingCart(productToBeRemoved, products) {
        
        products = checkExistingBasket(products);

        //remove product from shopping cart
        for (var i = 0; i < products.length; i++)
        if (products[i].id === productToBeRemoved.id) {
           products.splice(i,1);
           break;
        }
        return products;
    }
    
    function checkExistingBasket(products) {
        //create new basket if user doesn't have one  
        return products = products == null ? [] : products;
    }

    function calculateBasketCosts(products) {
        let totalCosts = 0;
        // console.log(products);
        products.forEach(product => {
            // console.log(product);
            totalCosts += product.price;
        });
        return totalCosts.toFixed(2);
    }

    function getProductIds(products) {

        if(products.length) {

            let productIds = [];
            products.forEach(product => {
                productIds.push(product.id);
            });
            return productIds;
        }
        else return [];
    }

    export default {
        addToShoppingCart,
        removeFromShoppingCart,
        checkExistingBasket,
        calculateBasketCosts,
        getProductIds
    }
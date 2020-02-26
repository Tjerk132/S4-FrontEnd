   import ShoppingCartItem from '../models/ShoppingCartitem.js';
   
   function addToShoppingCart(newProduct, products) {
        
        products = checkExistingBasket(products);
      
        products.push(newProduct);
        
        return products;
    } 
    
    function removeFromShoppingCart(productToBeRemoved, cartItems) {
        
        cartItems = checkExistingBasket(cartItems);

        //remove product from shopping cart
        cartItems.forEach(cartItem => {
            let product = cartItem.product;
            if(product.id == productToBeRemoved.id) {
                if(cartItem.quantity > 0) {
                    //lower quantity for chosen product
                    cartItem.quantity--;
                }
                if(cartItem.quantity == 0) {
                    //remove cartItem completely 
                    cartItems.splice(cartItem, 1);
                }
            }       
        });
        return cartItems;
    }
    
    function checkExistingBasket(products) {
        //create new basket if user doesn't have one  
        return products = products == null ? [] : products;
    }

    function calculateBasketCosts(cartItems) {
        let totalCosts = 0;
        cartItems.forEach(cartItem => {
            for(let i = 0; i < cartItem.quantity; i++) {

                let product = cartItem.product;
                totalCosts += product.price;
            }
        });
        return totalCosts.toFixed(2);
    }

    function getProductIds(cartItems) {

        let productIds = [];
        if(cartItems.length) {
            cartItems.forEach(cartItem => {
                let product = cartItem.product;
                productIds.push(product.id);
            });
            return productIds;
        }
        else return [];
    }

    function getTotalQuantity(cartItems) {
        let totalQuantity = 0;
        cartItems.forEach(cartItem => {
            totalQuantity += cartItem.quantity;
        });
        return totalQuantity;
    }

    function existsInBasket(p, cartItems) {
        let exists = false;
        cartItems.forEach(item => {
            let product = item.product;
            if(p.id == product.id) {
                item.quantity++;
                exists = true;
                return cartItems;
            }
        }); 
        //still gets triggered otherwise somehow
        if(!exists) {
            cartItems.push(new ShoppingCartItem(p, 1));
            return cartItems;
        }
        else return cartItems;
    }

    export default {
        addToShoppingCart,
        removeFromShoppingCart,
        checkExistingBasket,
        calculateBasketCosts,
        getProductIds,
        getTotalQuantity,
        existsInBasket,
    }
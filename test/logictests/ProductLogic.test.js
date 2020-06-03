import assert from 'assert';
import Productlogic from '@/logic/ProductLogic.js';

import Product from '@/models/Product.js';
import ShoppingCartItem from '@/models/ShoppingCartitem.js';

describe('Productlogic Tests', () => {

    it('should add the item into the basket correctly', () => {
        //only id is necessary for this test
        let shoppingcart = [
            {
                product: [ { id: 1 } ],
                quantity: 1,
            },
            {
                product: [ { id: 2 } ],
                quantity: 1,
            },
        ];
        
        let newItem = [{ id: 2 }];

        shoppingcart = Productlogic.addToShoppingCart(newItem, shoppingcart);

        assert.notEqual(shoppingcart, undefined);
        assert.equal(shoppingcart.length, 2);
    });

    it('should adjust quantity from to be removed item for the basket correctly', () => {
        //only id is necessary for this test
        let shoppingcart = [
            {
                product: [ { id: 1 } ],
                quantity: 2,
            },
            {
                product: [ { id: 2 } ],
                quantity: 1,
            },
        ];
        
        let itemToBeRemoved = [{ id: 1 }];

        shoppingcart = Productlogic.removeFromShoppingCart(itemToBeRemoved, shoppingcart);

        assert.notEqual(shoppingcart, undefined);
        assert.equal(shoppingcart[0].quantity, 1);
    });

    it('should remove item from basket completely when quantity reaches 0', () => {
        //only id is necessary for this test
        let shoppingcart = [
            {
                product: [ { id: 1 } ],
                quantity: 2,
            },
            {
                product: [ { id: 2 } ],
                quantity: 1,
            },
        ];
        
        let itemToBeRemoved = [{ id: 2 }];

        shoppingcart = Productlogic.removeFromShoppingCart(itemToBeRemoved, shoppingcart);

        assert.notEqual(shoppingcart, undefined);
        //shopping cart item with id 2 (index 1) has been removed from the cart
        assert.equal(shoppingcart[1], undefined);
    }); 

    it('should calculate the basket costs correctly', () => {

        let shoppingcart = [];

        let productOne = new Product();
        productOne.price = 10;

        shoppingcart.push(new ShoppingCartItem(productOne, 2));

        let productTwo = new Product();
        productTwo.price = 5;

        shoppingcart.push(new ShoppingCartItem(productTwo, 1));

        let expected = (2*10) + (1*5);

        let actual = Productlogic.calculateBasketCosts(shoppingcart);

        assert.equal(actual, expected);

    });

    it('should get the right ids', () => {

        let shoppingcart = [];

        let productOne = new Product(1);

        shoppingcart.push(new ShoppingCartItem(productOne, 1));

        let productTwo = new Product(2);

        shoppingcart.push(new ShoppingCartItem(productTwo, 1));

        let ids = Productlogic.getProductIds(shoppingcart);

        assert.equal(ids.length, 2);
    });


    it('should get the right total quantities', () => {

        let shoppingcart = [];

        shoppingcart.push(new ShoppingCartItem("", 2));

        shoppingcart.push(new ShoppingCartItem("", 3));

        let totalQuantity = Productlogic.getTotalQuantity(shoppingcart);

        assert.equal(totalQuantity, 5);
    });

    it('should know if a product is in the basket', () => {

        let shoppingcart = [
            {
                product: [ { id : 1 } ]
            }
        ];

        let newProduct = [ { id: 1 } ];

        let existingProduct = Productlogic.existsInBasket(newProduct, shoppingcart);

        assert.notEqual(existingProduct, undefined);
    });

});
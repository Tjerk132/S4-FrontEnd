import Home from '@/view/home/Home.vue';

import Account from '@/view/Account/Account.vue';
import Register from '@/view/Account/Register/Register.vue';
import Login from '@/view/Account/Login/Login.vue'

import Products from '@/view/productviews/products/Products.vue';
import ProductDetails from '@/view/productviews/productsdetails/ProductDetails.vue';
import AddProduct from '@/view/productviews/addproduct/AddProduct.vue';
import ModifyProduct from '@/view/productviews/modifyproduct/ModifyProduct.vue';

import Search from '@/view/Search/Search.vue';
import ShoppingCart from '@/view/ShoppingCart/ShoppingCart.vue';
import NotFound from '@/view/error/NotFound.vue';

const routes = [
    { 
        path: '/',
        name: 'home',
        component: Home 
    },
    {
        path: '/account',
        component:  Account,
        children: [
            {
                path: '',
                redirect: '/login'
            },
            {
                path: '/register',
                name: 'register',
                component: Register
            },
            {
                path: '/login',
                name: 'login',
                component: Login
            }
        ]
    },
    {
        path: '/products',
        name: 'products',
        component: Products,
        props: (route) => ({ category: route.query.category }),
    },
    {
        path: '/search',
        name: 'search',
        component: Search,
        props: (route) => ({ query: route.query.query })
    },
    {
        path: '/add',
        name: 'add',
        component: AddProduct,
    },   
    {
        path: '/details',
        name: 'details',
        component: ProductDetails,
        props: (route) => ({ id: +route.query.id })
    },
    {
        path: '/modify',
        name: 'modify',
        component: ModifyProduct,
        props: (route) => ({ id: +route.query.id })
    },
    {
        path: '/shoppingcart',
        name: 'shopping cart',
        component: ShoppingCart
    },
    { 
        path: '*',
        name: 'error',
        component: NotFound 
    },
]

export default routes;
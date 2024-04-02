import axios from 'axios';
import { baseUrl } from '../_constants';

const cartService = {
    getCartItems: (token) => axios.get(`${baseUrl}/auth/carts`, {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }),

    postCartItem: (cart, token) => axios.post(`${baseUrl}/auth/carts`, cart, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }),

    deleteCartItem: (id, token) => axios.delete(`${baseUrl}/auth/carts/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};

export { cartService };

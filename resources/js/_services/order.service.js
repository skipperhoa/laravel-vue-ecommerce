import axios from 'axios';
import { baseUrl } from '../_constants';
const checkOut = (data,token)=>{

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: JSON.stringify(data)
    };
    return axios(baseUrl+"/auth/orders", requestOptions);

}
export const orderService = {
    checkOut
}

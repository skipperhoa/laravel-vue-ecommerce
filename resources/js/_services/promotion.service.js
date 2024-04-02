import axios from 'axios'
import {baseUrl} from '../_constants'
const getPromotion = async (code,token) => {
    try {
        const res = await axios.get(`${baseUrl}/auth/promotions/${code}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        // Trả về chỉ dữ liệu từ phản hồi API
        return res.data;
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error while fetching shippers:', error);
        throw error; // Ném lỗi để cho phép bên gọi xử lý nó
    }
};

export const promotionService = {
    getPromotion
};

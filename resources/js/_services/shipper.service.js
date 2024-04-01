import axios from 'axios'
import {baseUrl} from '../_constants'
const getAll = async () => {
    try {
        const res = await axios.get(`${baseUrl}/shippers`);
        // Trả về chỉ dữ liệu từ phản hồi API
        return res.data;
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error while fetching shippers:', error);
        throw error; // Ném lỗi để cho phép bên gọi xử lý nó
    }
};
const getShipperID = async (id) => {
    try {
        const res = await axios.get(`${baseUrl}/shippers/${id}`);
        // Trả về chỉ dữ liệu từ phân hồi API
        return res.data;
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error while fetching shippers:', error);
    }
};


export const shipperService = {
    getAll,
    getShipperID
}

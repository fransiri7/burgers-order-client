import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const URLS = {
    GET_ORDERS_BY_SOLD: date => `${baseURL}/order/sold/${date}`
};

export const getOrdersBySold = async date => {
    const response = await axios.get(URLS.GET_ORDERS_BY_SOLD(date));
    if (response.data.success) {
        return response.data.data;
    } else {
        throw Error(response.data.msg);
    }
};

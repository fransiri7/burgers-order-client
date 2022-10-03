import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const URLS = {
    CREATE_PRODUCT: `${baseURL}/product`,
    GET_PRODUCT_BY_ID: id => `${baseURL}/product/${id}`
};

export const create = async product => {
    const response = await axios.post(URLS.CREATE_PRODUCT, product);
    if (response.data.success) {
        return response.data.msg;
    } else {
        throw new Error(response.data.msg);
    }
};

export const getProductById = async id => {
    const response = await axios.get(URLS.GET_PRODUCT_BY_ID(id));
    return response.data;
};

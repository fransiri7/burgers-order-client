import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const URLS = {
    GET_PRODUCTS: `${baseURL}/product`,
    CREATE_PRODUCT: `${baseURL}/product`
};

export const getProducts = async () => {
    const response = await axios.get(URLS.GET_PRODUCTS);
    return response.data;
};

export const create = async product => {
    const response = await axios.post(URLS.CREATE_PRODUCT, product);
    if (response.data.success) {
        return response.data.msg;
    } else {
        throw new Error(response.data.msg);
    }
};

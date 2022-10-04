import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const URLS = {
    CREATE_PRODUCT: `${baseURL}/product`,
    GET_PRODUCT_BY_ID: id => `${baseURL}/product/${id}`,
    EDIT_PRODUCT: id => `${baseURL}/product/${id}`,
    GET_PRODUCTS: `${baseURL}/product`,
    EDIT_PRODUCT_STATUS: id => `${baseURL}/product/status/${id}`
};

export const getProducts = async () => {
    const response = await axios.get(URLS.GET_PRODUCTS);
    return response.data;
};

export const createProduct = async product => {
    const response = await axios.post(URLS.CREATE_PRODUCT, product);
    if (response.data.success) {
        return response.data.msg;
    } else {
        throw new Error(response.data.msg);
    }
};

export const getProductById = async id => {
    const response = await axios.get(URLS.GET_PRODUCT_BY_ID(id));
    if (response.data.success) {
        return response.data.data;
    } else {
        throw new Error(response.data.msg);
    }
};

export const editProduct = async (product, id) => {
    const response = await axios.put(URLS.EDIT_PRODUCT(id), product);
    if (response.data.success) {
        return response.data.msg;
    } else {
        throw new Error(response.data.msg);
    }
};

export const editStatusProduct = async id => {
    const response = await axios.put(URLS.EDIT_PRODUCT_STATUS(id));
    if (response.data.success) {
        return response.data.msg;
    } else {
        throw new Error(response.data.msg);
    }
};

import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const URLS = {
    GET_PRODUCTS: `${baseURL}/product`
};

export const getProducts = async () => {
    const response = await axios.get(URLS.GET_PRODUCTS);
    return response.data;
};

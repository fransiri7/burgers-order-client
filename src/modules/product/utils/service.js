import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const URLS = {
    CREATE_PRODUCT: `${baseURL}/product`
};

export const create = async product => {
    try {
        const response = await axios.post(URLS.CREATE_PRODUCT, product);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.msg);
    }
};

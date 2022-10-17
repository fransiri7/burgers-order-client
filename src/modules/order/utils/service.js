import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const URLS = {
    GET_DATE: (dateFrom, dateTo) => `${baseURL}/order?dateFrom=${dateFrom}&dateTo=${dateTo}`
};

export const getOrders = async (dateFrom, dateTo) => {
    const response = await axios.get(URLS.GET_DATE(dateFrom, dateTo));
    if (response.data.success) {
        return response.data.data;
    } else {
        throw Error(response.data.msg);
    }
};

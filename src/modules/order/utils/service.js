import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const URLS = {
    GET_ORDERS: (dateFrom, dateTo) => `${baseURL}/order?dateFrom=${dateFrom}&dateTo=${dateTo}`,
    DELETE_ORDER: id => `${baseURL}/order/${id}`,
    EDIT_DELIVERY: id => `${baseURL}/order/delivery/${id}`
};

export const getOrders = async (dateFrom, dateTo) => {
    const response = await axios.get(URLS.GET_ORDERS(dateFrom, dateTo));
    if (response.data.success) {
        return response.data.data;
    } else {
        throw Error(response.data.msg);
    }
};

export const deleteOrder = async id => {
    const response = await axios.delete(URLS.DELETE_ORDER(id));
    if (response.data.success) {
        return response.data.msg;
    } else {
        throw new Error(response.data.msg);
    }
};

export const editDelivery = async (id, deliveredBy) => {
    const response = await axios.put(URLS.EDIT_DELIVERY(id), { deliveredBy });
    if (response.data.success) {
        return response.data.msg;
    } else {
        throw new Error(response.data.msg);
    }
};

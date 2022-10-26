import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const URLS = {
    GET_SOLD_QUANTITY_BY_MONTH: date => `${baseURL}/order/sold-quantity/${date}`
};

export const getSoldQuantityByMonth = async date => {
    const response = await axios.get(URLS.GET_SOLD_QUANTITY_BY_MONTH(date));
    if (response.data.success) {
        return response.data.data;
    } else {
        throw Error(response.data.msg);
    }
};

import { useState, useEffect, useCallback } from "react";
import moment from "moment/moment";
import * as service from "./service";

const formatDates = (dateFrom, dateTo) => {
    const formattedDateFrom = moment(dateFrom).utcOffset(0);
    const formattedDateTo = moment(dateTo || dateFrom).utcOffset(0);
    return {
        from: formattedDateFrom.set({ hour: "00", minute: "00", second: "00" }).toISOString(),
        to: formattedDateTo.set({ hour: "23", minute: "59", second: "59" }).toISOString()
    };
};

export const useAllOrders = (dateFrom, dateTo) => {
    const [orders, setOrders] = useState([]);
    const [completed, setCompleted] = useState(false);
    const getAllOrders = useCallback(async () => {
        try {
            const { from, to } = formatDates(dateFrom, dateTo);

            const ordersByPeriod = await service.getOrders(from, to);
            setOrders(ordersByPeriod);
        } catch (error) {
            console.log(error);
        } finally {
            setCompleted(true);
        }
    }, [dateFrom, dateTo]);

    useEffect(() => {
        getAllOrders();
    }, [getAllOrders]);

    return [orders, setOrders, completed];
};

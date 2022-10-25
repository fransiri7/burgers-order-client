import { useState, useEffect, useCallback } from "react";
import * as service from "./service";

export const useOrdersBySold = date => {
    const [orders, setOrders] = useState([]);
    const [completed, setCompleted] = useState(false);
    const getOrdersBySold = useCallback(async () => {
        try {
            const burgersByPeriod = await service.getOrdersBySold(date);
            setOrders(burgersByPeriod);
        } catch (error) {
            console.log(error);
        } finally {
            setCompleted(true);
        }
    }, [date]);

    useEffect(() => {
        getOrdersBySold();
    }, [getOrdersBySold]);

    return [orders, completed];
};

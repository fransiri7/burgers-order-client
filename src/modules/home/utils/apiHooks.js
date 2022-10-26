import { useState, useEffect, useCallback } from "react";
import * as service from "./service";

export const useSoldQuantity = date => {
    const [soldQuantity, setSoldQuantity] = useState([]);
    const [completed, setCompleted] = useState(false);
    const getSoldQuantityByMonth = useCallback(async () => {
        try {
            const soldQuantityByPeriod = await service.getSoldQuantityByMonth(date);
            setSoldQuantity(soldQuantityByPeriod);
        } catch (error) {
            console.log(error);
        } finally {
            setCompleted(true);
        }
    }, [date]);

    useEffect(() => {
        getSoldQuantityByMonth();
    }, [getSoldQuantityByMonth]);

    return [soldQuantity, completed];
};

import { useState, useEffect, useCallback } from "react";
import moment from "moment/moment";
import * as service from "./service";

const dates = (dateFrom, dateTo) => {
    const timeDateFrom = moment(dateFrom).utcOffset(0);
    const timeDateTo = moment(dateTo).utcOffset(0);
    if (dateFrom && dateTo) {
        return {
            from: timeDateFrom.set({ hour: "00", minute: "00", second: "00" }).toISOString(),
            to: timeDateTo.set({ hour: "23", minute: "59", second: "59" }).toISOString()
        };
    }
    if (dateFrom && !dateTo) {
        return {
            from: timeDateFrom.set({ hour: "00", minute: "00", second: "00" }).toISOString(),
            to: timeDateFrom.set({ hour: "23", minute: "59", second: "59" }).toISOString()
        };
    }
};

export const useAllOrders = (dateFrom, dateTo) => {
    const [orders, setOrders] = useState([]);
    const [completed, setCompleted] = useState(false);
    const getAllOrders = useCallback(async () => {
        try {
            const formattedDates = dates(dateFrom, dateTo);

            const ordersByDate = await service.getOrders(formattedDates.from, formattedDates.to);
            setOrders(ordersByDate);
        } catch (error) {
            console.log(error);
        } finally {
            setCompleted(true);
        }
    }, [dateFrom, dateTo]);

    useEffect(() => {
        getAllOrders();
    }, [getAllOrders]);

    return [orders, completed];
};

// Si dateFrom y dateTo existen
// formatear dateFrom para que tenga horario a las 00 y dateTo para que tenga horario a las 23.59
// Funcion que devuelve
// {from: 04/05/2022 00.00, to: 10/05/2022 23.59}
// Si dateFrom existe y dateTo es null
// formatear dateFrom para que sea a las 00
// formatear un segundo dateFrom para que sea a las 23.59
// {from: 13/05/2022 00.00, to: 13/05/2022 23.59}

// Haria una funcion que reciba dateFrom y dateTo y devuelva un objeto date {from: , to: }

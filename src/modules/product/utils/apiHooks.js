import { useState, useEffect, useCallback } from "react";
import * as service from "./service";

export const useAllProducts = isMountedRef => {
    const [products, setProducts] = useState([]);
    const [completed, setCompleted] = useState(false);

    const useAllProducts = useCallback(async () => {
        try {
            const products = await service.getProducts();
            if (isMountedRef.current) {
                setProducts(products);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        useAllProducts();
    }, [useAllProducts]);

    return [products, completed];
};

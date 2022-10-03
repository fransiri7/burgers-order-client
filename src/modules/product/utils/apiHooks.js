import { useState, useEffect, useCallback } from "react";
import * as service from "./service";

export const useProductById = id => {
    const [product, setProduct] = useState(null);
    const [completed, setCompleted] = useState(false);

    const getProduct = useCallback(async () => {
        try {
            if (id) {
                const product = await service.getProductById(id);
                setProduct(product);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setCompleted(true);
        }
    }, [id]);

    useEffect(() => {
        getProduct();
    }, [getProduct]);

    return [product, completed];
};

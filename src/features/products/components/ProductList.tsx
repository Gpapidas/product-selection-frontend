import { useEffect } from "react";
import { useProducts } from "@/features/products/services/productService.ts";

export const ProductList = () => {
    const { data: products, isLoading, error } = useProducts();

    useEffect(() => {
        console.log("Fetching products...");
    }, []);

    useEffect(() => {
        console.log("Products:", products);
        console.log("Is loading:", isLoading);
        console.log("Error:", error);
    }, [products, isLoading, error]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading products</p>;

    return (
        <div>
            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                products.map((product) => (
                    <p key={product.id}>{product.name}</p>
                ))
            )}
        </div>
    );
};

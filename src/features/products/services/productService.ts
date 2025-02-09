import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    ProductListResponse,
    ProductSelectionResponse
} from "@/features/products/types/productTypes.ts";
import authAxios from "@/utils/authUtils.ts";
import {handleGlobalError} from "@/App.tsx";

class ProductService {
    private backendUrl: string;

    constructor() {
        this.backendUrl = import.meta.env.VITE_API_BASE_URL;
    }

    async getProducts(search?: string, ordering?: string, resetSearch?: boolean): Promise<ProductListResponse> {
        const params: Record<string, string | boolean> = {};
        if (search) params.search = search;
        if (ordering) params.ordering = ordering;
        if (resetSearch) params.reset_search = resetSearch;

        const response = await authAxios.get<ProductListResponse>(`${this.backendUrl}/api/v1/products/products/`, {params});
        return response.data;
    }

    async toggleProductSelection(productId: number): Promise<ProductSelectionResponse> {
        const response = await authAxios.post<ProductSelectionResponse>(`${this.backendUrl}/api/v1/products/products/${productId}/select/`);
        return response.data;
    }
}

export const productService = new ProductService();

/**
 * Hook to fetch the list of products.
 */
export const useProducts = (search?: string, ordering?: string, resetSearch?: boolean) => {
    const query = useQuery({
        queryKey: ["products", search, ordering, resetSearch],
        queryFn: () => productService.getProducts(search, ordering, resetSearch)
    });

    return {
        data: query.data?.data ?? [],
        isLoading: query.isPending,
        error: query.error,
    };
};

/**
 * Hook to toggle the selection of a product.
 */
export const useToggleProductSelection = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (productId: number) => productService.toggleProductSelection(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["products"]});
        },
        onError: handleGlobalError,
    });

    return {
        mutate: mutation.mutate,
        isLoading: mutation.isPending,
        error: mutation.error,
    };
};
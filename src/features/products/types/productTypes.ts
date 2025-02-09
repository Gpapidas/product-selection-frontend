import {BaseResponse} from "@/types/baseResponseType";

export type Product = {
    id: number;
    name: string;
    description: string;
    price: string;
    stock: number;
    selected: boolean;
    derivedFromSavedSearch: string | null;
};

export type ProductListResponse = BaseResponse<Product[]>;

export type ProductSelectionResponse = BaseResponse<Product>;

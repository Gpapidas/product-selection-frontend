import {Layout} from "../../Layout.tsx";
import {ProductList} from "@/features/products/components/ProductList.tsx";

export const ProductsPage = () => {
    return <Layout mainContent={<ProductList/>}/>;
};

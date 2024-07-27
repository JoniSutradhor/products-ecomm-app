import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import ProductList from "../components/ProductList";
import { products } from "../utils/data";
import Cart from "../components/Cart";
import { Product } from "@/app/utils/types";

const ProductsPage: React.FC = () => {
  return (
    <div className="flex gap-2">
      <div className="w-2/3">
        <ProductList products={products} />
      </div>
      <div className="w-1/3">
        <Cart />
      </div>
    </div>
  );
};

export default ProductsPage;

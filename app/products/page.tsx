import ProductList from "../components/ProductList";
import { products } from "../utils/data";
import Cart from "../components/Cart";

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

import { notFound } from "next/navigation";
import { products } from "../../utils/data";
import { Product } from "../../utils/types";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

export async function generateStaticParams() {
  // Generate paths for the first 5 products
  const paths = products.slice(0, 5).map((product) => ({
    productId: product.id,
  }));

  return paths;
}

const fetchProduct = async (productId: string): Promise<Product | null> => {
  // Simulate fetching product data (replace with your actual data fetching logic)
  const product = products.find((p) => p.id === productId) || null;
  return product;
};

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const { productId } = params;

  // Fetch product data based on productId from params
  const product = await fetchProduct(productId);

  // If product is not found, show 404
  if (!product) {
    notFound();
  }

  return (
    <div className="product-details">
      <img
        src={product.featuredImageUrl}
        alt={product.name}
        className="w-full h-96 object-contain"
      />
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mt-2">{product.name}</h1>
        <p>Price: ${product.productPrice.price}</p>
        <p>Available Quantity: {product.quantity}</p>
      </div>
    </div>
  );
};

// Rebuild the page if visited after 40 seconds
export const revalidate = 40;

export default ProductPage;

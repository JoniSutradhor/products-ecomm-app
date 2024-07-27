import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../components/Layout";
import { products } from "../utils/data";
import { Product } from "../utils/types";
import { ParsedUrlQuery } from "querystring";

// Define types for context parameters
interface Params extends ParsedUrlQuery {
  productId: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = products.slice(0, 5).map((product) => ({
    params: { productId: product.id },
  }));

  console.log("Generated paths:", paths);

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  { product: Product | null },
  Params
> = async (context) => {
  const { productId } = context.params || {};

  if (!productId) {
    return { props: { product: null } };
  }

  const product = products.find((p) => p.id === productId) || null;

  console.log("Fetched product:", product);

  return {
    props: {
      product,
    },
    revalidate: 40, // Rebuild each product if visited after 40 seconds of the initial build time
  };
};

interface ProductPageProps {
  product: Product | null;
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  console.log("Product Details Page......");
  if (!product) {
    return <div>404 - Product Not Found</div>;
  }

  return (
    <Layout>
      <div className="product-details">
        <img
          src={product.featuredImageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <h1 className="text-2xl font-bold mt-2">{product.name}</h1>
        <p>Price: ${product.productPrice.price}</p>
        <p>Available Quantity: {product.quantity}</p>
      </div>
    </Layout>
  );
};

export default ProductPage;

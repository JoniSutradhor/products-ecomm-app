export interface ProductPrice {
  oldPrice: number;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  seName: string;
  colorVariants: string | null;
  shortDescription: string | null;
  featuredImageUrl: string;
  productPrice: ProductPrice;
  quantity: number;
}

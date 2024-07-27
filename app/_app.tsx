import { AppProps } from "next/app";
import "../styles/globals.css";
import { CartProvider } from "./utils/cartContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  console.log("Hi MyApp.......!!!!!");
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
};

export default MyApp;

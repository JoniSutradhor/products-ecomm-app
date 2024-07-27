import { ReactNode } from "react";
import "./globals.css";
import { CartProvider } from "./utils/cartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html>
      <body>
        <CartProvider>
          <Header />
          <div className="p-2">{children}</div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
};

export default Layout;

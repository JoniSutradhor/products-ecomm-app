import React, { ReactNode } from "react";
import Header from "./Header";
import { CartProvider } from "../utils/cartContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <main className="container mx-auto mt-4">{children}</main>
    </div>
  );
};

export default Layout;

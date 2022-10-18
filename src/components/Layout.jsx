import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Newsletter from "./Newsletter";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Newsletter />
      <Footer />
    </>
  );
};

export default Layout;

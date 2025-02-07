"use client";
import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import productApi from "../_utils/ProductApi";
const ProductSection = () => {
  const [prod, setProd] = useState([]);
  useEffect(() => {
    getLatestProd();
  }, []);

  const getLatestProd = async () => {
    await productApi.getLatestProducts().then((res) => {
      setProd(res.data.data);
    });
  };

  return (
    <div className="px-10 md:px-10 ">
      <h2 className="my-1">Our Latest Products</h2>
      <ProductList productList={prod} />
    </div>
  );
};

export default ProductSection;

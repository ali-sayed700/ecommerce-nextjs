import React from "react";
import ProductItem from "./ProductItem";
import { productType } from "../_interfaces";

const ProductList = ({ productList }: { productList: productType[] }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {productList.map((item: productType) => (
        <ProductItem productItem={item} key={item.id} />
      ))}
    </div>
  );
};

export default ProductList;

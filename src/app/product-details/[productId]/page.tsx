"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { use, useEffect, useState } from "react";
import { productType } from "@/app/_interfaces";

import ProductApi from "../../_utils/ProductApi";
import BreadCrumb from "@/app/_components/BreadCrumb";
import ProductBanner from "./_components/ProductBanner";
import ProductInfo from "./_components/ProductInfo";
import ProductList from "@/app/_components/ProductList";
import { usePathname } from "next/navigation";

const ProductDetails = ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const path = usePathname();
  const prodParam = use(params);

  const [productDetails, setProductDetails] = useState({});
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    if (!productDetails) return;

    ProductApi.getProductById(prodParam?.productId).then((res) => {
      setProductDetails(res?.data?.data);
      getProductListByCategory(res?.data?.data);
    });
  }, [prodParam.productId]);

  const getProductListByCategory = (product: productType) => {
    ProductApi.getProductsByCategory(product?.category).then((res) => {
      setProductList(res?.data?.data);
    });
  };
  // console.log(productList);
  return (
    <div className="px-10 py-8 md:px-28">
      <BreadCrumb path={path} />
      <div className="grid justify-around grid-cols-1 gap-5 mt-10 sm:gap-5 sm:grid-cols-2">
        <ProductBanner product={productDetails} />
        <ProductInfo product={productDetails} />
      </div>
      <div>
        <h2 className="mt-24 mb-4 text-xl">Similar Products</h2>
        <ProductList productList={productList} />
      </div>
    </div>
  );
};

export default ProductDetails;

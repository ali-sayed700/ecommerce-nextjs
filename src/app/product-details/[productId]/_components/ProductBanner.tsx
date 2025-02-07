import { productType } from "@/app/_interfaces";
import Image from "next/image";
import React from "react";

const ProductBanner = ({ product }: { product: productType }) => {
  return (
    <>
      {product?.banners?.url ? (
        <Image
          src={product.banners?.url as string}
          alt="product-image"
          height={400}
          width={400}
          className="rounded-lg"
        />
      ) : (
        <div className="w-[200px] h-[200px] bg-slate-200 rounded-lg animate-pulse"></div>
      )}
    </>
  );
};

export default ProductBanner;

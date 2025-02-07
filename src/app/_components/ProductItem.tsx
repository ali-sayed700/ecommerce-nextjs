import React from "react";
import { productType } from "../_interfaces";
import Image from "next/image";
import { List } from "lucide-react";
import Link from "next/link";

const ProductItem = ({ productItem }: { productItem: productType }) => {
  return (
    <Link
      href={`product-details/${productItem?.documentId}`}
      className="p-1 rounded-lg hover:border hover:shadow-md border-teal-400 hover:cursor-pointer"
    >
      <Image
        src={productItem?.banners?.url as string}
        alt="image"
        width={400}
        height={350}
        className="rounded-t-lg h-[170px] object-cover"
      />
      <div className="flex items-center justify-between p-3 rounded-b-lg bg-gray-50">
        <div className="">
          <h2 className="text-[12px] font-medium line-clamp-1">
            {productItem.title}
          </h2>
          <h2 className="text-[10px] text-gray-400 flex  gap-1 items-center">
            <List className="w-4 h-4" />
            {productItem.category}
          </h2>
        </div>
        <h2>{productItem.price}</h2>
      </div>
    </Link>
  );
};

export default ProductItem;

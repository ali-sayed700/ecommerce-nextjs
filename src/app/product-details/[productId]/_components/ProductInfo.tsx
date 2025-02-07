import React, { useContext } from "react";
import { cartContextType, productType } from "@/app/_interfaces";
import { AlertOctagon, BadgeCheck, ShoppingCart } from "lucide-react";
import SkeletonProductInfo from "./SkeletonProduction";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import cartApi from "@/app/_utils/CartApis";
import { CartContext } from "@/app/_context/CartContext";

const ProductInfo = ({ product }: { product: productType }) => {
  const { setCart } = useContext(CartContext);
  const { user } = useUser();
  const router = useRouter();

  const handleToCart = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      const data = {
        data: {
          username: user.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
          products: [product?.id],
        },
      };
      cartApi
        .addToCart(data)
        .then((res) => {
          // console.log(res);

          // console.log("cart created successfully", res.data.data);
          setCart((oldcart: cartContextType[]) => [
            ...oldcart,
            { id: res?.data?.data?.id, product },
          ]);
          // setCart((oldcart: cartContextType[]) => console.log(oldcart));
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  const {
    title,
    description,
    price,
    instantDelivery,
    // whats,
    // whatsInculded,
    category,
    documentId,
  } = product;
  return (
    <>
      {documentId ? (
        <div>
          <h2 className="text-[20px]">{title}</h2>
          <h2 className="text-[15px] text-gray-400">{category}</h2>
          <h2 className="text-[11px] mt-2">
            {description?.[0].children?.[0].text}
          </h2>
          <h2 className="text-[11px] text-gray-500 flex gap-2 mt-2 items-center">
            {instantDelivery ? (
              <BadgeCheck className="w-5 h-5 text-green-500" />
            ) : (
              <AlertOctagon />
            )}{" "}
            Eligible For Instant Delivery
          </h2>
          <h2 className="text-[24px] text-primary mt-2">$ {price}</h2>
          <button
            onClick={handleToCart}
            className="flex gap-2 p-2 text-white rounded-lg bg-primary hover:bg-teal-600"
          >
            <ShoppingCart />
            Add To Cart
          </button>
        </div>
      ) : (
        <SkeletonProductInfo />
      )}
    </>
  );
};

export default ProductInfo;

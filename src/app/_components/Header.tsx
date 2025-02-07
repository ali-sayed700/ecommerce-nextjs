"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";

import Link from "next/link";
import { CartContext } from "../_context/CartContext";
import CartApis from "../_utils/CartApis";
import Cart from "./Cart";
import { productType } from "../_interfaces";

const Header = () => {
  const { cart, setCart } = useContext(CartContext);
  const [openCart, setOpenCart] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

  useEffect(() => {
    setIsLoggedIn(window?.location?.href.toString().includes("sign-in"));
  }, []);
  const { user } = useUser();
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    user && getCartItems();
  }, [user]);
  const getCartItems = () => {
    CartApis.getUserCartItems(user?.primaryEmailAddress?.emailAddress).then(
      (res) => {
        res?.data?.data.forEach(
          (citem: { documentId: string; products: productType[] }) => {
            // console.log(citem.products[0]);
            // console.log(citem);

            setCart((oldCart) => [
              ...oldCart,
              {
                id: citem?.documentId,
                product: citem?.products[0],
              },
            ]);
          }
        );
      }
    );
  };
  return (
    !isLoggedIn && (
      <header className="bg-white dark:bg-gray-900">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <Image src="/logo.svg" width={50} height={50} alt="logo" />

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="/"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Explore
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Projects
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Abouts Us
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Contacts Us
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              {!user ? (
                <div className="sm:flex sm:gap-4">
                  <Link
                    className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-500 dark:hover:bg-teal-500"
                    href="/sign-in"
                  >
                    Login
                  </Link>

                  <Link
                    className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-500 transition hover:text-teal-600/75 sm:block dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                    href="/"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="flex item-center gap-5">
                  <h2 className="flex gap-1 cursor-pointer">
                    <ShoppingCart onClick={() => setOpenCart(!openCart)} />(
                    {cart?.length}){openCart && <Cart />}
                  </h2>

                  <UserButton />
                </div>
              )}

              <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden dark:bg-gray-800 dark:text-white dark:hover:text-white/75">
                <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    )
  );
};
export default Header;

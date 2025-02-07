import { createContext, Dispatch, SetStateAction } from "react";
import { cartContextType } from "../_interfaces";
export type GlobalContent = {
  cart: cartContextType[];
  setCart: Dispatch<SetStateAction<cartContextType[]>>;
  //   setCart: (c: cartContextType[]) => void;
};

export const CartContext = createContext<GlobalContent>({
  cart: [],
  setCart: () => {},
});

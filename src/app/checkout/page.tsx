"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import CheckoutForm from "./_components/CheckoutForm";
import { useSearchParams } from "next/navigation";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_PUBLISHABLE_STRIPE_KEY}`
);

function Checkout() {
  const searchParams = useSearchParams();
  const options: StripeElementsOptions = {
    // passing the client secret obtained from the server
    mode: "payment",
    currency: "usd",
    amount: Number(searchParams.get("amount")) * 100,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={Number(searchParams.get("amount"))} />
    </Elements>
  );
}

export default Checkout;

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import SectionHead from "../../components/header/sectionHead/SectionHead";
import CheckoutForm from "./CheckoutForm";
console.log(import.meta.env.VITE_PAYMENT_GATEWAY);

const stripePromise = loadStripe(
  `pk_test_51QfJA9GD3KHhVlzkSUaG2mHhF562ojCg9k8KcmfRveUNQ5QMXXkiaj4NcXi4IMUfaHxjDx6pvkyQrcViVmLNcBGB00xJ3x774K`
);

const Payment = () => {
  const options = {
    mode: "payment",
    amount: 1099,
    currency: "usd",
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };
  return (
    <div>
      <SectionHead heading="Payment" subHeading="Please pay to eat" />
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payment;

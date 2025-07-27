import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

const stripePromise = loadStripe(
  "pk_test_51RjHX5PENRwGi7FaY7Ugh451amdgyGAjHQqOB5Y7TrL5ZVEhxJFZLBueJBI6WfdRAo6lgTrJhfwtXAdmXp6C5OV5000BSegQzC"
);

const PaymentForm = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const stripe = await stripePromise;
    if (!stripe) {
      console.error("Stripe failed to load.");
      return;
    }

    setLoading(true);

    try {
      // Create payment method with raw card data
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: {
          number: data.cardNumber,
          exp_month: Number(data.expMonth),
          exp_year: Number(data.expYear),
          cvc: data.cvc,
        },
      });

      if (error) {
        console.error("Stripe error:", error.message);
        return;
      }

      // Send to your backend to confirm payment
      const confirmRes = await axios.post("/api/confirm-payment", {
        payment_intent_id: "pi_XXXXXXXXXXXXXX", // should be dynamic
        payment_method_id: paymentMethod.id,
      });

      console.log("Payment confirmed:", confirmRes.data);
    } catch (err) {
      console.error("Payment error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register("cardNumber")} placeholder="Card Number" />
      <input {...register("expMonth")} placeholder="Exp Month" />
      <input {...register("expYear")} placeholder="Exp Year" />
      <input {...register("cvc")} placeholder="CVC" />
      <button type="submit" disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default PaymentForm;

// const res = await fetch("https://api.stripe.com/v1/payment_methods", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//     Authorization: "Basic " + btoa("sk_test_..."), // 🔥 DON'T DO THIS ON FRONTEND
//   },
//   body: new URLSearchParams({
//     "card[number]": "4242424242424242",
//     "card[exp_month]": "12",
//     "card[exp_year]": "2029",
//     "card[cvc]": "123",
//     type: "card",
//   }),
// });

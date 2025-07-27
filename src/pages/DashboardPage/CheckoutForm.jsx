import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useCarts from "../../hooks/useCarts";
import useAuth from "./../../hooks/useAuth";
import useAxiosSecure from "./../../hooks/useAxiosSecure";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [cart, refetch] = useCarts();
  const price = cart.reduce((total, item) => total + item.price, 0);
  console.log(price);

  useEffect(() => {
    if (price > 0) {
      axiosSecure
        .post("/create-checkout-intent", { price: price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, price]);

  console.log(clientSecret);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setErrorMessage(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setErrorMessage("");
    }

    const { paymentIntent, error: cardConfirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });

    if (cardConfirmError) {
      console.log("cardConfirmError error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        // now the save payment in data base
        const payment = {
          name: user?.displayName,
          email: user?.email,
          price: price,
          transactionId: paymentIntent.id,
          date: new Date(),
          cartId: cart.map((item) => item._id),
          menuId: cart.map((item) => item.menuId),
          status: "pending",
        };

        axiosSecure.post("/payment", payment).then((res) => {
          console.log("payment save", res.data);
          if (res.data?.deleteResult?.deletedCount > 0) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
            navigate("/dashboard/paymentHistory");
          }
        });
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          disabled={!stripe || !clientSecret}
          className="btn btn-sm btn-primary my-4"
          type="submit"
        >
          Pay
        </button>
        <p>this is test cart code : 4242424242424242</p>
        {transactionId && (
          <p className="text-yellow-700">
            {" "}
            your transaction Id: {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;

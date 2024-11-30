import React, { useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { makePayment } from "../../api";
import { redirect, useNavigate } from "react-router-dom";

const stripePromise = loadStripe('pk_test_51QMYsaA4LnMO44o0fGuTiUxM4EQyJ5NmStuShPa2Tll2FaDeJzPyDgqiwNBp1GOt1dvJ8rtyI5lFDX99Wnj5QRPS00gCshWJH2');

const StripePayment = () => {
  const paymentFormRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const backendUrl = "https://python-backend-taupe.vercel.app/payment-sheet";
    const userId = JSON.parse(localStorage.getItem('user')).id;

    const fetchPaymentSheet = async () => {
      try {
        const response = await fetch(backendUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer abc",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Payment sheet data:", data);

        // Initialize Stripe with the publishable key from the backend
        const stripe = await stripePromise;

        // Pass the clientSecret to Stripe Elements
        const elements = stripe.elements({
          clientSecret: data.paymentIntent,
        });

        // Create and mount the Payment Element only if the element is present in the DOM
        if (paymentFormRef.current) {
          const paymentElement = elements.create("payment");
          paymentElement.mount(paymentFormRef.current);

          // Attach event listener to the button to confirm payment
          document
            .getElementById("confirmButton")
            .addEventListener("click", async () => {
              const { error } = await stripe.confirmPayment({
                elements,
                redirect: 'if_required'
              });
          

              if (error) {
                console.error("Payment failed:", error);
                alert(`Payment failed: ${error.message}`);
              } else {
                console.log("Payment successful!");
                const payId = await makePayment(userId);
                console.log(payId);
                navigate(`/payment-success?payId=${payId}`);
                alert("Payment successful!");
              }
            });
        } else {
          console.error("Payment form element not found in the DOM.");
        }
      } catch (error) {
        console.error("Error fetching payment sheet:", error);
        alert("Failed to fetch payment details. Please try again.");
      }
    };

    fetchPaymentSheet();
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <div>
        <div id="payment-form" ref={paymentFormRef}></div>
        <button id="confirmButton">Pay Now</button>
      </div>
    </Elements>
  );
};

export default StripePayment;

import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(''); // Replace with your actual publishable key

const PaymentButton = () => {
  useEffect(() => {
    const backendUrl = "https://python-backend-taupe.vercel.app/payment-sheet";

    async function fetchPaymentSheet() {
      try {
        console.log('Fetching payment sheet from:', backendUrl);
        const response = await fetch(backendUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer abc" // Example auth key
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Payment sheet data:', data);

        const stripe = await stripePromise;

        const elements = stripe.elements();

        const paymentElement = elements.create("payment");
        paymentElement.mount("#payment-form");

        const { error } = await stripe.confirmPayment({
          clientSecret: data.paymentIntent,
          confirmParams: {
            return_url: "https://your-website.com/payment-success", // Replace with your success page
          },
        });

        if (error) {
          alert(`Payment failed: ${error.message}`);
        } else {
          alert("Payment successful!");
        }
      } catch (error) {
        console.error("Error fetching payment sheet:", error);
        alert("Failed to fetch payment details. Please try again.");
      }
    }

    document.getElementById("payButton").addEventListener("click", fetchPaymentSheet);
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <div>
        <button id="payButton">Pay Now</button>
        <div id="payment-form"></div>
      </div>
    </Elements>
  );
};

export default PaymentButton;
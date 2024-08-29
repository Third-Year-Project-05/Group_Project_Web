import axios from 'axios';
import React, { useEffect } from 'react';

const loadPayHereScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://www.payhere.lk/lib/payhere.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load PayHere SDK'));
      document.body.appendChild(script);
    });
  };

const PaymentButton = () => {
    useEffect(() => {
        loadPayHereScript().then(() => {
          // PayHere SDK is now loaded
          console.log('PayHere SDK loaded');
        }).catch((error) => {
          console.error(error);
        });
      }, []);
      
  useEffect(() => {
    // Check if payhere is loaded
    if (window.payhere) {
      window.payhere.onCompleted = function onCompleted(orderId) {
        console.log("Payment completed. OrderID:", orderId);
        // After successful payment completion, redirect or update UI
      };

      window.payhere.onDismissed = function onDismissed() {
        console.log("Payment dismissed");
        // Handle user dismissing the payment
      };

      window.payhere.onError = function onError(error) {
        console.log("Payment error:", error);
        // Handle payment errors
      };
    } else {
      console.error("PayHere script not loaded");
    }
  }, []);

  const handlePayment = async () => {

    const url = 'http://localhost:8080/api/payments/generate-hash';
    const data = {
        orderId: '12345',
        amount: '100.00',
        currency: 'LKR'
    };
    
    // Send the POST request
    const response = await axios.post(url, new URLSearchParams(data).toString(), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    // console.log(response);

    const hash = response.data;

    const payment = {
      sandbox: true, 
      merchant_id: '1227963', 
      return_url: 'http://localhost:5173/payment-success',
      cancel_url: 'http://localhost:5173/payment-cancel',
      notify_url: 'http://localhost:8080/api/payments/notify',
      order_id: '12345',
      items: 'Premium Subscription',
      amount: '100.00',
      currency: 'LKR',
      hash: hash, 
      first_name: 'Saman',
      last_name: 'Perera',
      email: 'samanp@gmail.com',
      phone: '0771234567',
      address: 'No.1, Galle Road',
      city: 'Colombo',
      country: 'Sri Lanka',
      delivery_address: 'No. 46, Galle road, Kalutara South',
      delivery_city: 'Kalutara',
      delivery_country: 'Sri Lanka',
    };

    if (window.payhere) {
      window.payhere.startPayment(payment);
    } else {
      console.error("PayHere script not loaded");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="px-4 py-2 bg-blue-600 text-white rounded-md"
    >
      Pay Now
    </button>
  );
};

export default PaymentButton;

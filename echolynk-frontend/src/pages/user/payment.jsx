import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  // const navigate = useNavigate();

  useEffect(() => {
    loadPayHereScript().then(() => {
      // PayHere SDK is now loaded
      console.log('PayHere SDK loaded');
      console.log(window.payhere);
      if (window.payhere) {
        window.payhere.onCompleted = function onCompleted(orderId) {
          console.log("Payment completed. OrderID:", orderId);
          // After successful payment completion, redirect or update UI
          axios.post('http://localhost:8080/api/payments/notify', {
            
              order_id: orderId,
              payhere_amount: '100',
              payhere_currency: 'LKR',
              status_code: 'success',
            
          }).then((response) => {
            console.log(response.data);
          }).catch((error) => {
            console.error(error);
          });

          const user = JSON.parse(localStorage.getItem('user'));
          const userId = user ? user.id : null;
          console.log(user);

          axios.post('http://localhost:8080/api/integratePremium', {
            userId: userId
          }).then((response) => {
            console.log(response.data);
          }).catch((error) => {
            console.error(error);
          });

          user.isPremium = true;
          localStorage.setItem('user', JSON.stringify(user));

          window.location.href = '/payment-success';
        };


        window.payhere.onDismissed = function onDismissed() {
          console.log("Payment dismissed");
          // Handle user dismissing the payment
        };

        window.payhere.onError = function onError(error) {
          console.log("Payment error:", error);
          // Handle payment errors
        };

        console.log(window.payhere);
      } else {
        console.error("PayHere script not loaded");
      }
    }).catch((error) => {
      console.error(error);
    });
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
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  //redirect to home page after successful payment
  const handleBackToHome = () => {
    navigate('/user-home'); 
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconContainer}>
          <svg
            style={styles.icon}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 style={styles.title}>Payment Successful!</h1>
        <p style={styles.text}>Thank you for your purchase. Your payment has been processed successfully.</p>
        <p style={styles.orderInfo}>
          <strong>Payment ID:</strong> {new URLSearchParams(window.location.search).get('payId')}
        </p>
        <p style={styles.orderInfo}>
          <strong>Payment Amount:</strong> $5.00
        </p>
        <button onClick={handleBackToHome} style={styles.button}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    maxWidth: '400px',
    textAlign: 'center',
  },
  iconContainer: {
    backgroundColor: '#28a745',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto 20px',
  },
  icon: {
    color: '#fff',
    width: '30px',
    height: '30px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  text: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '20px',
  },
  orderInfo: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default PaymentSuccess;

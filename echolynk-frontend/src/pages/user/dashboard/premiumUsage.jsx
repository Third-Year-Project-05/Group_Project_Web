import React from 'react';

const PremiumUserUsage = () => {
  // Replace these values with dynamic data from your backend or state
  const imageGenerationCount = 45;
  const suggestionCount = 120;
  const remainingCredits = 15;

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      background: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '20px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    headerTitle: {
      fontSize: '24px',
      color: '#333',
    },
    usageItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px',
      padding: '15px',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
    },
    usageItemTitle: {
      fontSize: '18px',
      color: '#555',
    },
    value: {
      fontSize: '20px',
      color: '#2a9df4',
      fontWeight: 'bold',
    },
    footer: {
      textAlign: 'center',
      marginTop: '20px',
    },
    button: {
      background: '#2a9df4',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
    },
    buttonHover: {
      background: '#1d7bc6',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Premium User Usage</h1>
      </div>

      <div style={styles.usageItem}>
        <h2 style={styles.usageItemTitle}>Image Generation Count</h2>
        <span style={styles.value}>{imageGenerationCount}</span>
      </div>

      <div style={styles.usageItem}>
        <h2 style={styles.usageItemTitle}>Suggestion Count</h2>
        <span style={styles.value}>{suggestionCount}</span>
      </div>

      <div style={styles.usageItem}>
        <h2 style={styles.usageItemTitle}>Remaining Credits</h2>
        <span style={styles.value}>{remainingCredits}</span>
      </div>

      {/* <div style={styles.footer}>
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.background = styles.buttonHover.background)}
          onMouseOut={(e) => (e.target.style.background = styles.button.background)}
          onClick={() => alert('Upgrade feature coming soon!')}
        >
          Upgrade Plan
        </button>
      </div> */}
    </div>
  );
};

export default PremiumUserUsage;

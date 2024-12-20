import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/card';
import { useNavigate } from 'react-router-dom';
import PaymentButton from './payment';


function PremiumUpgrade() {


  const navigate = useNavigate();

  const handleProceedToPayment = () => {
    // Redirect to payment gateway
    navigate('/payment-gateway');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-lg p-4 bg-white shadow-md rounded-lg">
        <CardHeader>
          <CardTitle>Confirm Your Upgrade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Premium Plan</h2>
            <p className="text-gray-700">Enjoy exclusive features and a better experience:</p>
            <ul className="list-disc ml-5 mt-2 text-gray-700">
              
              <li>Access to premium content</li>
              <li>Priority customer support</li>
              <li>Visual cues for difficult words</li>
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">Total Cost</h3>
            <p className="text-xl font-bold text-blue-600">$5.00</p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">Terms and Conditions</h3>
            <p className="text-gray-600 text-sm">
              When this subscription is active, you are granted access to the premium features listed below within the specified usage limits:
              <br />
              <br />
              <b>Suggestions for Responses:</b> 1000 uses
              <br />
              <b>Visual Cue Generation:</b> 100 uses
              <br />
              <br />
              Once these limits are reached, you will need to renew your premium subscription to continue enjoying these features, unless the subscription is canceled.
            </p>

          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <button
            onClick={() => navigate('/user-home')}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => navigate('/stripe-payment')}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
          >
            Pay
          </button>
          
        </CardFooter>
      </Card>
    </div>
  );
}

export default PremiumUpgrade;

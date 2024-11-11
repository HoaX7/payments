import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { PaymentService } from '../services/PaymentService';

interface PaymentButtonProps {
  amount: number;
  currency?: string;
  onSuccess?: (details: any) => void;
  onError?: (error: any) => void;
}

export const PaymentButton: React.FC<PaymentButtonProps> = ({
  amount,
  currency = 'USD',
  onSuccess,
  onError,
}) => {
  const paymentService = PaymentService.getInstance();

  const paypalOptions = {
    'client-id': paymentService.getPayPalClientId(),
    currency: currency,
    intent: 'capture',
    components: 'buttons',
    'disable-funding': 'credit,card'
  };

  if (!paymentService.getPayPalClientId()) {
    return (
      <div className="p-4 bg-red-500/20 text-red-200 rounded-lg">
        PayPal Client ID is not configured. Please add VITE_PAYPAL_CLIENT_ID to your environment variables.
      </div>
    );
  }

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <PayPalButtons
        style={{ layout: 'horizontal', color: 'blue', shape: 'pill' }}
        createOrder={(_, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toString(),
                  currency_code: currency,
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          if (actions.order) {
            const details = await actions.order.capture();
            onSuccess?.(details);
          }
        }}
        onError={(err) => {
          console.error('PayPal Error:', err);
          onError?.(err);
        }}
      />
    </PayPalScriptProvider>
  );
};
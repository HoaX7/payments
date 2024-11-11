# Payment Service Integration

A modern, type-safe payment service integration for React applications supporting both PayPal and Stripe payment processors.

## Features

- 🔒 Secure payment processing
- 💳 Multiple payment provider support (PayPal & Stripe)
- 🎨 Beautiful, responsive UI
- 📱 Mobile-friendly design
- 🔄 Real-time payment status updates
- 🌐 International currency support

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with your PayPal client ID:
   ```env
   VITE_PAYPAL_CLIENT_ID=your_paypal_client_id_here
   ```

## Usage

### Basic Implementation

```tsx
import { PaymentButton } from './components/PaymentButton';

function CheckoutPage() {
  const handleSuccess = (details) => {
    console.log('Payment successful:', details);
  };

  const handleError = (error) => {
    console.error('Payment failed:', error);
  };

  return (
    <PaymentButton
      amount={99.99}
      currency="USD"
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
}
```

### PaymentService Class

The `PaymentService` class provides a singleton instance for managing payments:

```typescript
import { PaymentService } from './services/PaymentService';

const paymentService = PaymentService.getInstance();

// Create a payment
const paymentId = await paymentService.createPayment({
  amount: 99.99,
  currency: 'USD',
  description: 'Premium Subscription'
});

// Capture a payment
const captured = await paymentService.capturePayment(paymentId);

// Refund a payment
const refunded = await paymentService.refundPayment(paymentId);
```

## Security Considerations

- Never store sensitive payment information in the frontend
- Always use HTTPS in production
- Implement proper error handling
- Follow PCI compliance guidelines
- Validate all inputs server-side

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT
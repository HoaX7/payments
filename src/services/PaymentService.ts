export interface PaymentDetails {
  amount: number;
  currency: string;
  description?: string;
  metadata?: Record<string, any>;
}

export class PaymentService {
  private static instance: PaymentService;
  private paypalClientId: string;

  private constructor() {
    this.paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || '';
    
    if (!this.paypalClientId) {
      console.warn('PayPal Client ID is not configured. Please add VITE_PAYPAL_CLIENT_ID to your environment variables.');
    }
  }

  public static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  public getPayPalClientId(): string {
    return this.paypalClientId;
  }

  public async createPayment(details: PaymentDetails): Promise<string> {
    if (!this.paypalClientId) {
      throw new Error('PayPal Client ID is not configured');
    }
    // Implementation would handle both PayPal and Stripe payment creation
    return 'payment_id';
  }

  public async capturePayment(paymentId: string): Promise<boolean> {
    if (!this.paypalClientId) {
      throw new Error('PayPal Client ID is not configured');
    }
    // Implementation would handle payment capture
    return true;
  }

  public async refundPayment(paymentId: string): Promise<boolean> {
    if (!this.paypalClientId) {
      throw new Error('PayPal Client ID is not configured');
    }
    // Implementation would handle refunds
    return true;
  }
}
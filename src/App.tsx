import React, { useState } from 'react';
import { PaymentButton } from './components/PaymentButton';
import { CreditCard, DollarSign } from 'lucide-react';

function App() {
  const [amount, setAmount] = useState<number>(99.99);
  const [message, setMessage] = useState<string>('');

  const handleSuccess = (details: any) => {
    setMessage(`Payment completed! Transaction ID: ${details.id}`);
  };

  const handleError = (error: any) => {
    setMessage(`Payment failed: ${error.message}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
            <div className="flex items-center justify-center mb-8">
              <DollarSign className="w-12 h-12 text-emerald-400" />
              <h1 className="text-3xl font-bold ml-3">Payment Demo</h1>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium mb-2">
                Payment Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  placeholder="Enter amount"
                />
              </div>
            </div>

            <div className="space-y-4">
              <PaymentButton
                amount={amount}
                onSuccess={handleSuccess}
                onError={handleError}
              />
            </div>

            {message && (
              <div className={`mt-6 p-4 rounded-lg ${
                message.includes('failed') 
                  ? 'bg-red-500/20 text-red-200' 
                  : 'bg-emerald-500/20 text-emerald-200'
              }`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
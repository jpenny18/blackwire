'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CryptoPayment from '@/components/CryptoPayment';

interface CryptoPrice {
  BTC: number;
  ETH: number;
  USDT: number;
  USDC: number;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  platform: string;
  discordUsername?: string;
}

type PaymentMethodType = 'crypto' | 'card' | null;

function ChallengeCryptoPaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice>({ BTC: 0, ETH: 0, USDT: 1, USDC: 1 });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodType>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    platform: 'MT5',
    discordUsername: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});

  // Get challenge details from URL params or sessionStorage
  const challengeType = searchParams?.get('type') || sessionStorage.getItem('preselectedChallengeType') || 'Blackwire Standard';
  const tier = searchParams?.get('tier') || sessionStorage.getItem('preselectedTier') || 'Core';
  const balance = searchParams?.get('balance') || sessionStorage.getItem('preselectedBalance') || '50000';
  const priceParam = searchParams?.get('price');

  // Price mapping
  const priceMap: { [key: string]: { [key: string]: number } } = {
    'Blackwire Standard': {
      '50000': 999,
      '100000': 1999,
      '200000': 3499,
      '300000': 4999
    },
    'Blackwire VIP': {
      '25000': 999,
      '50000': 1999,
      '100000': 4999,
      '200000': 9999
    }
  };

  const price = priceParam ? parseInt(priceParam) : (priceMap[challengeType]?.[balance] || 999);

  // Check if this account size is eligible for card payment
  const isCardPaymentEligible = () => {
    const balanceNum = parseInt(balance);
    if (challengeType === 'Blackwire Standard') {
      return balanceNum === 50000 || balanceNum === 100000;
    } else if (challengeType === 'Blackwire VIP') {
      return balanceNum === 25000 || balanceNum === 50000;
    }
    return false;
  };

  // Get Whop checkout link based on challenge type and balance
  const getWhopCheckoutLink = () => {
    const balanceNum = parseInt(balance);
    if (challengeType === 'Blackwire Standard') {
      if (balanceNum === 50000) return 'https://whop.com/checkout/plan_HM9n7mLWCP8qw';
      if (balanceNum === 100000) return 'https://whop.com/checkout/plan_9qTe4xo8gVTl4';
    } else if (challengeType === 'Blackwire VIP') {
      if (balanceNum === 25000) return 'https://whop.com/checkout/plan_rnI3Toq7S4Ydn';
      if (balanceNum === 50000) return 'https://whop.com/checkout/plan_OMTCt8Wnax3vA';
    }
    return null;
  };

  // Fetch crypto prices
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('/api/crypto/prices');
        const data = await response.json();
        setCryptoPrices(data);
      } catch (error) {
        console.error('Error fetching crypto prices:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};

    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email format';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.country.trim()) errors.country = 'Country is required';
    if (!formData.platform.trim()) errors.platform = 'Platform selection is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof FormData]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleProceedToPayment = async () => {
    if (validateForm()) {
      if (selectedPaymentMethod === 'card') {
        // Save order to Firebase first
        try {
          setIsProcessingPayment(true);
          const response = await fetch('/api/card/submit-order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              challengeData: getChallengeData(),
              paymentMethod: 'card'
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to save order');
          }

          const data = await response.json();
          console.log('Order saved:', data.orderId);

          // Redirect to Whop checkout
          const whopLink = getWhopCheckoutLink();
          if (whopLink) {
            window.location.href = whopLink;
          }
        } catch (error) {
          console.error('Error saving order:', error);
          alert('Failed to process order. Please try again.');
          setIsProcessingPayment(false);
        }
      } else if (selectedPaymentMethod === 'crypto') {
        setShowPayment(true);
      }
    }
  };

  const handlePaymentMethodSelection = (method: PaymentMethodType) => {
    setSelectedPaymentMethod(method);
  };

  const getChallengeData = () => {
    return {
      type: challengeType,
      amount: `$${parseInt(balance).toLocaleString()}`,
      platform: formData.platform,
      formData,
      price,
      addOns: []
    };
  };

  if (showPayment) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        </div>

        {/* Header */}
        <header className="relative z-20 border-b border-white/10 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-center">
              <a href="/" className="text-xl font-bold tracking-tight text-center hover:opacity-80 transition-opacity">
                BLACKWIRE<span className="text-cyan-400">.VIP</span>
              </a>
            </div>
          </div>
        </header>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
            {isProcessingPayment && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 rounded-2xl">
                <div className="text-center">
                  <div className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-white">Processing payment...</p>
                </div>
              </div>
            )}
            
            <div className="p-6 md:p-8 border-b border-cyan-400/20">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-cyan-400">Get Your Funded Account</h2>
                  <p className="text-gray-400 mt-1">{challengeType} - {tier} ${parseInt(balance).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-cyan-400">${price.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">One-time Payment</div>
                </div>
              </div>
            </div>

            <CryptoPayment
              challengeData={getChallengeData()}
              successRedirectPath="/challenge/cryptopending"
              onProcessingStateChange={setIsProcessingPayment}
              cryptoPrices={cryptoPrices}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-20 border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center">
            <a href="/" className="text-xl font-bold tracking-tight text-center hover:opacity-80 transition-opacity">
              BLACKWIRE<span className="text-cyan-400">.VIP</span>
            </a>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get Your <span className="text-cyan-400">Funded Account</span>
          </h1>
          <p className="text-xl text-gray-400">
            {challengeType} - {tier} ${parseInt(balance).toLocaleString()}
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">Complete Your Information</h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-gray-400 ${
                    formErrors.firstName ? 'border-red-500' : 'border-white/10'
                  }`}
                  placeholder="Enter your first name"
                />
                {formErrors.firstName && <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>}
              </div>

              <div>
                <label className="block text-white mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-gray-400 ${
                    formErrors.lastName ? 'border-red-500' : 'border-white/10'
                  }`}
                  placeholder="Enter your last name"
                />
                {formErrors.lastName && <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-white mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-white/5 border rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-gray-400 ${
                  formErrors.email ? 'border-red-500' : 'border-white/10'
                }`}
                placeholder="Enter your email address"
              />
              {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-gray-400 ${
                    formErrors.phone ? 'border-red-500' : 'border-white/10'
                  }`}
                  placeholder="Enter your phone number"
                />
                {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
              </div>

              <div>
                <label className="block text-white mb-2">Country *</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-lg focus:outline-none focus:border-cyan-400 text-white ${
                    formErrors.country ? 'border-red-500' : 'border-white/10'
                  }`}
                >
                  <option value="">Select your country</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Other">Other</option>
                </select>
                {formErrors.country && <p className="text-red-500 text-sm mt-1">{formErrors.country}</p>}
              </div>
            </div>

            <div>
              <label className="block text-white mb-2">Trading Platform *</label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-white/5 border rounded-lg focus:outline-none focus:border-cyan-400 text-white ${
                  formErrors.platform ? 'border-red-500' : 'border-white/10'
                }`}
              >
                <option value="MT5">MetaTrader 5 (MT5)</option>
                <option value="MT4">MetaTrader 4 (MT4)</option>
              </select>
              {formErrors.platform && <p className="text-red-500 text-sm mt-1">{formErrors.platform}</p>}
              <p className="text-gray-400 text-xs mt-1">Select your preferred trading platform</p>
            </div>

            <div>
              <label className="block text-white mb-2">Discord Username (Optional)</label>
              <input
                type="text"
                name="discordUsername"
                value={formData.discordUsername}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-gray-400"
                placeholder="Your Discord username"
              />
            </div>

            <div className="pt-6 border-t border-white/10">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <div className="text-lg font-semibold text-white">{challengeType}</div>
                  <div className="text-cyan-400">{tier} ${parseInt(balance).toLocaleString()} Account</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-cyan-400">${price.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">One-time Payment</div>
                </div>
              </div>

              {/* Payment Method Selection */}
              {isCardPaymentEligible() ? (
                <>
                  <div className="mb-4">
                    <label className="block text-white mb-3 font-semibold">Select Payment Method</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => handlePaymentMethodSelection('card')}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          selectedPaymentMethod === 'card'
                            ? 'border-cyan-400 bg-cyan-400/10'
                            : 'border-white/10 bg-white/5 hover:border-cyan-400/50'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                          <span className="text-white font-semibold">Credit/Debit Card</span>
                        </div>
                      </button>

                      <button
                        onClick={() => handlePaymentMethodSelection('crypto')}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          selectedPaymentMethod === 'crypto'
                            ? 'border-cyan-400 bg-cyan-400/10'
                            : 'border-white/10 bg-white/5 hover:border-cyan-400/50'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-white font-semibold">Cryptocurrency</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleProceedToPayment}
                    disabled={!selectedPaymentMethod || isProcessingPayment}
                    className={`w-full font-bold py-4 rounded-xl transition-all duration-300 ${
                      selectedPaymentMethod && !isProcessingPayment
                        ? 'bg-cyan-400 hover:bg-cyan-500 text-black hover:scale-105'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isProcessingPayment ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      `Proceed to ${selectedPaymentMethod === 'card' ? 'Card' : selectedPaymentMethod === 'crypto' ? 'Crypto' : ''} Payment`
                    )}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setSelectedPaymentMethod('crypto');
                    handleProceedToPayment();
                  }}
                  className="w-full bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-4 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  Proceed to Crypto Payment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChallengeCryptoPaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading payment page...</p>
        </div>
      </div>
    }>
      <ChallengeCryptoPaymentContent />
    </Suspense>
  );
}

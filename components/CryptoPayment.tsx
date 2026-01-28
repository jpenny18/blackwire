'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { generate as generateWords } from 'random-words';
import { Check, Copy, RefreshCw } from 'lucide-react';

interface CryptoPaymentProps {
  challengeData: any;
  successRedirectPath: string;
  onProcessingStateChange: (state: boolean) => void;
  cryptoPrices: CryptoPrice;
}

interface CryptoPrice {
  BTC: number;
  ETH: number;
  USDT: number;
  USDC: number;
}

interface CryptoAddress {
  BTC: string;
  ETH: string;
  USDT: string;
  USDC: string;
}

const CRYPTO_ADDRESSES: CryptoAddress = {
  BTC: 'bc1q4zs3mwhv50vgfp05pawdp0s2w8qfd0h824464u',  // Replace with your actual BTC address
  ETH: '0x54634008a757D262f0fD05213595dEE77a82026B',  // Replace with your actual ETH address
  USDT: 'TLVMLJhSmWTTtitpeF5Gvv2j4avXVZ3EMd',  // Replace with your actual USDT address (TRC20)
  USDC: '8ShmNrRPeN1KaCixPhPWPQTvZJn9a8s7oqsCdhoJgeJj'  // Replace with your actual USDC address (Solana)
};

export default function CryptoPayment({ challengeData, successRedirectPath, onProcessingStateChange, cryptoPrices }: CryptoPaymentProps) {
  const router = useRouter();
  const [selectedCrypto, setSelectedCrypto] = useState<'BTC' | 'ETH' | 'USDT' | 'USDC'>('BTC');
  const [cryptoAmount, setCryptoAmount] = useState<CryptoPrice>({ BTC: 0, ETH: 0, USDT: 0, USDC: 0 });
  const [verificationPhrase, setVerificationPhrase] = useState<string[]>([]);
  const [userPhrase, setUserPhrase] = useState('');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Generate verification phrase on mount
  useEffect(() => {
    const words = generateWords({ exactly: 10 });
    setVerificationPhrase(Array.isArray(words) ? words : [words]);
  }, []);

  // Calculate crypto amounts when prices or challenge data changes
  useEffect(() => {
    const usdAmount = challengeData.price;
    setCryptoAmount({
      BTC: usdAmount / cryptoPrices.BTC,
      ETH: usdAmount / cryptoPrices.ETH,
      USDT: usdAmount,
      USDC: usdAmount
    });
  }, [challengeData.price, cryptoPrices]);

  const handleCryptoSelect = (crypto: 'BTC' | 'ETH' | 'USDT' | 'USDC') => {
    setSelectedCrypto(crypto);
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(CRYPTO_ADDRESSES[selectedCrypto]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSubmit = async () => {
    if (userPhrase.toLowerCase() !== verificationPhrase.join(' ').toLowerCase()) {
      setError('Verification phrase does not match. Please try again.');
      return;
    }

    setIsLoading(true);
    onProcessingStateChange(true);

    try {
      const response = await fetch('/api/crypto/submit-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          challengeData,
          cryptoDetails: {
            type: selectedCrypto,
            amount: cryptoAmount[selectedCrypto],
            address: CRYPTO_ADDRESSES[selectedCrypto],
            verificationPhrase: verificationPhrase.join(' '),
            usdAmount: challengeData.price
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      const { orderId } = await response.json();

      // Send order notification emails
      try {
        const emailResponse = await fetch('/api/send-crypto-emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: orderId,
            status: 'PENDING',
            cryptoType: selectedCrypto,
            cryptoAmount: cryptoAmount[selectedCrypto].toString(),
            cryptoAddress: CRYPTO_ADDRESSES[selectedCrypto],
            usdAmount: challengeData.price,
            verificationPhrase: verificationPhrase.join(' '),
            challengeType: challengeData.type,
            challengeAmount: challengeData.amount,
            platform: challengeData.platform,
            addOns: challengeData.addOns || [],
            customerEmail: challengeData.formData.email,
            customerName: `${challengeData.formData.firstName} ${challengeData.formData.lastName}`,
            customerPhone: challengeData.formData.phone,
            customerCountry: challengeData.formData.country,
            customerDiscordUsername: challengeData.formData.discordUsername,
            createdAt: new Date().toISOString()
          }),
        });

        if (!emailResponse.ok) {
          console.error('Failed to send order emails');
        }
      } catch (emailError) {
        console.error('Error sending order emails:', emailError);
      }

      router.push(successRedirectPath);
    } catch (error) {
      setError('Failed to submit order. Please try again.');
      setIsLoading(false);
      onProcessingStateChange(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Crypto Selection */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Select Payment Method</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(['BTC', 'ETH', 'USDT', 'USDC'] as const).map((crypto) => (
            <button
              key={crypto}
              onClick={() => handleCryptoSelect(crypto)}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                selectedCrypto === crypto
                  ? 'border-cyan-400 bg-cyan-400/10 scale-105'
                  : 'border-white/10 bg-white/5 hover:border-cyan-400/50 hover:bg-white/10'
              }`}
            >
              <div className="text-center">
                <div className={`font-bold ${selectedCrypto === crypto ? 'text-cyan-400' : 'text-white'}`}>
                  {crypto}
                </div>
                {crypto === 'USDT' && (
                  <div className="text-xs text-gray-400 mt-1">
                    (TRC20)
                  </div>
                )}
                {crypto === 'USDC' && (
                  <div className="text-xs text-gray-400 mt-1">
                    (SOL)
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
        <div className="text-center mb-3">
          <div className="text-lg font-medium text-white">
            1 {selectedCrypto} = ${cryptoPrices[selectedCrypto].toLocaleString()}
          </div>
        </div>
        
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 text-orange-400 text-sm text-center">
          {selectedCrypto === 'BTC' && 
            "⚠️ Only send Bitcoin (BTC) assets to this address. Other assets will be lost forever."
          }
          {selectedCrypto === 'ETH' &&
            "⚠️ Only send Ethereum (ETH) assets to this address. Other assets will be lost forever."
          }
          {selectedCrypto === 'USDT' &&
            "⚠️ Only send Tether (TRC20) assets to this address. Other assets will be lost forever."
          }
          {selectedCrypto === 'USDC' &&
            "⚠️ Only send USD Coin (SPL) assets to this address. Other assets will be lost forever."
          }
        </div>
      </div>

      {/* Payment Details */}
      <div className="space-y-4">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">Payment Amount</h3>
          <div className="text-center mb-6">
            <div className="text-sm text-gray-400 mb-2">Send exactly</div>
            <div className="text-3xl md:text-4xl font-bold text-cyan-400">
              {cryptoAmount[selectedCrypto].toFixed(selectedCrypto === 'USDC' || selectedCrypto === 'USDT' ? 2 : 8)} {selectedCrypto}
            </div>
            <div className="text-sm text-gray-400 mt-2">
              ≈ ${challengeData.price.toFixed(2)} USD
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white rounded-xl shadow-lg">
              <QRCodeSVG
                value={
                  selectedCrypto === 'USDT' 
                    ? `tron:${CRYPTO_ADDRESSES[selectedCrypto]}?amount=${cryptoAmount[selectedCrypto].toFixed(2)}`
                    : selectedCrypto === 'USDC'
                    ? `solana:${CRYPTO_ADDRESSES[selectedCrypto]}?amount=${(cryptoAmount[selectedCrypto] / 1000).toFixed(2)}&spl-token=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`
                    : selectedCrypto === 'BTC'
                    ? `bitcoin:${CRYPTO_ADDRESSES[selectedCrypto]}?amount=${cryptoAmount[selectedCrypto].toFixed(8)}`
                    : `ethereum:${CRYPTO_ADDRESSES[selectedCrypto]}?value=${(cryptoAmount[selectedCrypto] * 1e18).toFixed(0)}`
                }
                size={200}
                level="H"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex-1 font-mono text-sm text-white truncate">
              {CRYPTO_ADDRESSES[selectedCrypto]}
            </div>
            <button
              onClick={copyAddress}
              className="flex items-center gap-2 px-3 py-2 bg-cyan-400 hover:bg-cyan-500 text-black rounded-lg transition-colors font-medium text-sm"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Verification Phrase */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Verification Phrase</h3>
          <div className="mb-4">
            <div className="text-sm text-gray-400 mb-3">Type this phrase exactly to confirm payment:</div>
            <div className="font-mono bg-cyan-400/10 border border-cyan-400/30 p-4 rounded-lg text-cyan-400 text-center font-semibold">
              {verificationPhrase.join(' ')}
            </div>
          </div>

          <input
            type="text"
            value={userPhrase}
            onChange={(e) => setUserPhrase(e.target.value)}
            onPaste={(e) => e.preventDefault()}
            placeholder="Type the verification phrase here"
            className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
          />
          {error && (
            <div className="mt-3 bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading || userPhrase.toLowerCase() !== verificationPhrase.join(' ').toLowerCase()}
          className="w-full bg-cyan-400 hover:bg-cyan-500 disabled:bg-cyan-400/50 disabled:cursor-not-allowed text-black font-bold py-4 rounded-xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <RefreshCw className="animate-spin" size={20} />
              <span>Processing...</span>
            </div>
          ) : (
            "I've Sent the Payment"
          )}
        </button>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
        <div className="text-sm text-gray-400 space-y-2">
          <p className="flex items-start gap-2">
            <span className="text-cyan-400 font-bold">•</span>
            <span>The payment amount is locked in for 15 minutes. If you don't send the payment within this time, the price may be updated.</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-cyan-400 font-bold">•</span>
            <span>After sending the payment, click the button above and wait for confirmation. This may take up to 30 minutes depending on network conditions.</span>
          </p>
        </div>
      </div>
    </div>
  );
} 
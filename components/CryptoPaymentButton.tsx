'use client';

import { useEffect, useCallback, useRef } from 'react';
import {
  RozoPayButton,
  useRozoPayUI,
} from '@rozoai/intent-pay';
import { getAddress } from 'viem';

// Base USDC token contract address
const BASE_USDC_ADDRESS = getAddress('0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913');

interface CryptoPaymentButtonProps {
  toAddress: string;
  amount: number;
  onPaymentStarted?: (txHash: string | null) => void;
  onPaymentCompleted?: (txHash: string) => void;
  onPaymentBounced?: (txHash: string) => void;
  disabled?: boolean;
}

export function CryptoPaymentButton({
  toAddress,
  amount,
  onPaymentStarted,
  onPaymentCompleted,
  onPaymentBounced,
  disabled = false,
}: CryptoPaymentButtonProps) {
  const { resetPayment } = useRozoPayUI();
  const prevParamsRef = useRef({ toAddress, amount });

  // Only call resetPayment when toAddress or amount actually change
  useEffect(() => {
    const prevParams = prevParamsRef.current;
    if (prevParams.toAddress !== toAddress || prevParams.amount !== amount) {
      resetPayment();
      prevParamsRef.current = { toAddress, amount };
    }
  }, [toAddress, amount, resetPayment]);

  const handlePaymentStarted = useCallback(
    (event: { txHash: string | null }) => {
      console.log('Payment started:', event.txHash);
      onPaymentStarted?.(event.txHash);
    },
    [onPaymentStarted]
  );

  const handlePaymentCompleted = useCallback(
    (event: { txHash: string }) => {
      console.log('Payment completed:', event.txHash);
      onPaymentCompleted?.(event.txHash);
    },
    [onPaymentCompleted]
  );

  const handlePaymentBounced = useCallback(
    (event: { txHash: string }) => {
      console.log('Payment bounced:', event.txHash);
      onPaymentBounced?.(event.txHash);
    },
    [onPaymentBounced]
  );

  // Validate inputs - only show button when valid
  const isValidAddress = toAddress && toAddress.length > 0;
  const isValidAmount = amount > 0;
  const canPay = isValidAddress && isValidAmount && !disabled;

  if (!canPay) {
    return (
      <button
        disabled
        className="w-full bg-gray-400 text-white px-6 py-4 border-2 border-gray-400 text-lg font-bold uppercase tracking-wide cursor-not-allowed"
      >
        Pay with Crypto
      </button>
    );
  }

  return (
    <RozoPayButton
      appId="rozoIntentPay"
      toChain={8453} // Base chain
      toAddress={getAddress(toAddress)} // Wrap with getAddress for Base USDC
      toToken={BASE_USDC_ADDRESS}
      toUnits={amount.toString()} // Human-readable string (e.g., "10" for 10 USDC)
      onPaymentStarted={handlePaymentStarted}
      onPaymentCompleted={handlePaymentCompleted}
      onPaymentBounced={handlePaymentBounced}
    />
  );
}

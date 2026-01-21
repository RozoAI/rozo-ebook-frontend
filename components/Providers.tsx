'use client';

import { WagmiProvider, createConfig } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RozoPayProvider, getDefaultConfig } from '@rozoai/intent-pay';
import { useState, type ReactNode } from 'react';

// Use getDefaultConfig from @rozoai/intent-pay and pass to createConfig
const config = createConfig(getDefaultConfig({
  appName: 'rozoBook',
}));

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RozoPayProvider>
          {children}
        </RozoPayProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

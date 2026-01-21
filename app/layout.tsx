import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Blackwire Trading | Direct Funded Allocation',
  description: 'Direct funded trading allocation. No evaluation. Day-1 payouts. High drawdown. No BS rules.',
  keywords: 'prop trading, funded account, trading capital, forex funding, day trading',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

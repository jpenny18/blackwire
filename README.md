# Blackwire Trading

A modern, sophisticated landing page and dashboard for Blackwire Trading - a direct funded allocation prop firm.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed Firebase setup instructions.

Create a `.env.local` file with your Firebase credentials:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site.

## 📦 Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React** - UI library

## 🏗️ Project Structure

```
blackwire/
├── app/
│   ├── page.tsx          # Main landing page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   └── PromoPricingCards.tsx  # Pricing component
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## 📋 Trading Models

### Blackwire Standard
- **Core**: $999 / 50K / 10% max / 5% daily
- **Pro**: $1,999 / 100K / 10% max / 5% daily
- **Elite**: $3,499 / 200K / 12% max / 6% daily
- **Institutional**: $4,999 / 300K / 12% max / 6% daily

### Blackwire VIP
- **Core**: $999 / 25K / 10% max / No daily
- **Pro**: $1,999 / 50K / 10% max / No daily
- **Elite**: $4,999 / 100K / 15% max / No daily
- **Institutional**: $9,999 / 200K / 15% max / No daily

## ✨ Key Features

- ✅ Static drawdown (no trailing)
- ✅ First payout after 7 days
- ✅ No lot size limits
- ✅ Account scaling: 25% per payout, cap at 2x
- ✅ Profit splits: Standard 70%→90% | VIP 50%→90%
- ✅ Consistency rule: 40% balance or 60% total profits

## 🎨 Design

Dark, sophisticated James Bond aesthetic with cyan accents, perfect for the blackwire.vip brand.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linter

## 🔐 Authentication Routes

- `/` - Landing page
- `/auth` - Sign in / Sign up page
- `/dashboard` - Protected dashboard (requires authentication)
- `/dashboard/accounts` - Account management
- `/dashboard/payouts` - Payout requests
- `/dashboard/kyc` - KYC verification
- `/dashboard/support` - Support tickets

## 🛠️ Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Firebase** - Authentication & Database
- **Lucide React** - Icons

---

© 2026 Blackwire Trading. All rights reserved.

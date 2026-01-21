# Firebase Setup Guide

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name your project "blackwire-trading" (or your preferred name)
4. Follow the setup wizard (you can disable Google Analytics if you don't need it)

## Step 2: Enable Authentication

1. In your Firebase project, go to **Build** → **Authentication**
2. Click "Get started"
3. Go to the **Sign-in method** tab
4. Enable **Email/Password** authentication
5. Click "Save"

## Step 3: Create Firestore Database

1. Go to **Build** → **Firestore Database**
2. Click "Create database"
3. Start in **Test mode** (you can configure security rules later)
4. Choose a location close to your users
5. Click "Enable"

## Step 4: Get Your Firebase Config

1. Go to **Project Settings** (gear icon next to "Project Overview")
2. Scroll down to "Your apps"
3. Click the **Web** icon (`</>`)
4. Register your app with a nickname (e.g., "Blackwire Web")
5. Copy the `firebaseConfig` object

## Step 5: Configure Environment Variables

1. Create a `.env.local` file in the root of your project:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

2. Replace the values with your actual Firebase configuration from Step 4

## Step 6: Test Authentication

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000/auth`
3. Try creating a new account
4. Check Firebase Console → Authentication to see your new user

## Security Rules (Production)

Before deploying to production, update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Add more rules as needed for accounts, payouts, etc.
  }
}
```

## Additional Features to Implement

- Email verification
- Password reset
- User profiles in Firestore
- Account data storage
- KYC document storage
- Payout request tracking

## Troubleshooting

- If you get "Firebase not configured" errors, make sure your `.env.local` file is in the root directory
- If authentication fails, check that Email/Password is enabled in Firebase Console
- Make sure to restart your dev server after adding environment variables

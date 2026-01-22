# Firestore Setup for Blackwire Trading

## Overview
The voting system and signup counter features require Firestore to be properly configured in your Firebase project.

## Features Using Firestore

### 1. Feedback Voting System
- Located below the pricing table on the landing page
- Allows users to vote: "I'm Ready", "Interested", or "Not Yet"
- Votes are stored in the `feedback_votes` collection
- Limited to once per page load using sessionStorage

### 2. Live Signup Counter
- Displayed in the hero section below CTA buttons  
- Shows real-time count of registered users
- Base count starts at 62 (as requested)
- Refreshes every 30 seconds to show live updates

## Setup Instructions

### Step 1: Enable Firestore in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your `blackwiretrading` project
3. Click on **Firestore Database** in the left sidebar
4. Click **Create database**
5. Choose **Start in production mode** (we'll configure rules next)
6. Select a location (closest to your users)
7. Click **Enable**

### Step 2: Configure Firestore Security Rules

Once Firestore is enabled, you need to set up security rules to allow reads and writes:

1. In the Firestore Database section, go to the **Rules** tab
2. Replace the default rules with the following:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Allow anyone to read user count (for signup counter)
    match /users/{userId} {
      allow read: if true;
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update, delete: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow anyone to submit feedback votes (for voting system)
    match /feedback_votes/{voteId} {
      allow create: if true;
      allow read: if request.auth != null; // Optional: restrict reading votes
    }
  }
}
```

3. Click **Publish**

### Step 3: Test the Features

1. Visit your local development server: `http://localhost:3001`
2. Scroll to the voting section below the pricing table
3. Click one of the vote options - you should see a checkmark and "Thanks for your feedback!" message
4. The signup counter in the hero section should now show "62 traders signed up" (base count + registered users)

### Step 4: Monitor Data

You can view the data being collected in your Firestore Console:

1. **feedback_votes** collection: Contains all user votes with timestamps
2. **users** collection: Automatically created when users sign up via the auth page

## Data Structure

### feedback_votes Collection
```javascript
{
  vote: 'ready' | 'interested' | 'not_yet',
  timestamp: Timestamp
}
```

### users Collection
```javascript
{
  email: 'user@example.com',
  createdAt: Timestamp
}
```

## Security Notes

- The voting system allows anyone to submit votes (no auth required)
- Users can only vote once per page load (enforced client-side via sessionStorage)
- User documents can only be created during signup and modified by the owner
- The signup counter is read-only for everyone

## Troubleshooting

### Signup Counter Shows "Loading..."
- Check that Firestore is enabled in Firebase Console
- Verify security rules allow reading the `users` collection
- Check browser console for Firebase errors

### Votes Not Being Recorded
- Verify security rules allow creating documents in `feedback_votes`
- Check Network tab for failed Firestore requests
- Ensure Firebase credentials are correctly set in `.env.local`

## Next Steps for Production

Before launching, consider:

1. **Rate Limiting**: Implement server-side rate limiting for vote submissions
2. **Analytics**: Add Analytics to track vote distributions
3. **Admin Dashboard**: Create a dashboard to view vote statistics
4. **Data Export**: Set up automated exports for voting data analysis

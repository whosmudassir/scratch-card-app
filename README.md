# Setup Instructions

### Prerequisites

Ensure you have the following installed:

- Node.js (Latest LTS version recommended)
- Expo CLI (`npm install -g expo-cli`)
- Yarn or npm package manager

### Installation

1.  Clone the repository:

    ```
    git clone https://github.com/whosmudassir/scratch-card-app.git
    cd scratch-card-app

    ```

2.  Install dependencies:

    ```
    yarn install  # or npm install

    ```

3.  Start the Expo development server:

    ```
    expo start

    ```

4.  Run the app on an emulator or physical device:
    - For Android: Press `a` to open in an Android emulator.
    - For iOS (Mac required): Press `i` to open in an iOS simulator.
    - Scan the QR code in the Expo Go app on your mobile device.

---

# Dependencies List

### Core Libraries

- **React Native** -- `react-native`
- **Expo** -- `expo`

### UI & Animation

- **Gesture Handling** -- `react-native-gesture-handler`
- **Scratch Card Component** -- Custom implementation + `@shopify/react-native-skia`
- **Lottie Animations** -- `lottie-react-native`

### State Management

- **React Context API** -- for managing transaction state

### API Calls

- Mock APIs used for demo

### TypeScript Support

- **TypeScript** -- for static typing

---

# Features List

**Checkout Screen**

- Displays the total payment amount
- Shows merchant details for the transaction
- Provides a "Proceed Payment" button to confirm the transaction
- Transitions users to the payment success screen upon successful payment

**Payment Success Screen**

- Displays payment confirmation message
- Shows transaction amount and merchant details
- Animates payment success feedback

**Scratch Card Component**

- Initially appears as an unscratched surface
- Responds to touch gestures for scratching
- Tracks scratch progress dynamically
- Auto-reveals reward if 70% is scratched
- Plays a celebration animation upon full reveal
- Displays a "Claim Reward" button after scratching

**Reward Claim Handling**

- Users can claim the revealed reward
- Prevents re-scratching of claimed rewards
- Stores claimed rewards persistently

**User Experience & Animation**

- Smooth scratch interactions and animations
- Handles partial scratching without abrupt reveals

**Error Handling**

- Handles failed payment scenarios with retry options
- Displays error messages for API failures (e.g., failed transaction or reward fetch)
- Prevents multiple reward claims for the same transaction
- Claim failure flow with error message and retry option

---

# Assumptions Made

- Flow of the app: The user views the payment details to be paid → Clicking on "Proceed Payment" takes the user to the payment success screen where rewards are listed → The user interacts with the scratch card component to reveal rewards → The user can claim the revealed reward.
- A transaction can have one or more rewards.
- Claimed, Unclaimed states of the already scratched rewards.
- Claimed, Unclaimed rewards cannot be scratched again.

---

# Known Limitations

- No backend integration for actual reward validation (uses mock APIs).
- Not optimized for accessibility (e.g. screen reader support not implemented).
- Does not include deep linking for reward claim redirection.

---

# Preview Screen Recording

https://vimeo.com/1061145785?share=copy

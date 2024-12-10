This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Bhookh App

## Overview

The **Bhookh App** is a restaurant application built using React Native, designed to provide users with a seamless dining experience. The app allows users to log in, browse food items, search for their favorite dishes, and view their profile.

## Features

- **User Authentication**: Implemented user login and signup functionality with dummy accounts stored in JSON.
- **Food Item Display**: Users can view food items under categories such as Dinner, Lunch, Breakfast, and Dessert.
- **Pull to Refresh**: The app features a pull-down-to-refresh feature to reload food items dynamically.
- **State Management with Zustand**: Used Zustand to manage authentication and food items state.
- **Tailwind CSS with NativeWind**: Styled the app using Tailwind CSS via NativeWind, enabling responsive and efficient styling.

### Dummy User Accounts:

```json
[
  {
    "username": "Samivo",
    "password": "admin"
  },
  {
    "username": "Yuvraj",
    "password": "1234"
  },
  {
    "username": "User",
    "password": "User"
  }
]
```

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Clone the Repository

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
git clone https://github.com/your-username/bhookh-app.git
cd bhookh-app
```

## Step 2: Install Dependencies

Run `npm install` to make sure you have all required dependencies installed:

- React Navigation
- Zustand for state management
- React Native Vector Icons
- Moti for animations
- Yup for building Auth validation schema
- Formik for creating and managing the login form

```bash
npm install
```

## Step 3: Start the App

Use `npx react-native start` to start the development server. Then, press `a for Android` or `i for iOS` to run the app on the respective platform.

```bash
npx react-native start
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 4: Modifying your App

Now that you have successfully run the app, you can modify it.

1. Open `App.jsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

## Design Decisions & Approach

1. **User Authentication:** For the sake of simplicity, the app uses dummy user data stored in a `Credentials.json` file. The login screen authenticates users based on their credentials.

2. **State Management:** Zustand was chosen for its simplicity in managing global states like authentication and food items, avoiding the complexity of Redux or Context API for this small app.

3. **FlatList for Rendering Long Data:** Since the list of food items can be long, the app uses `FlatList` to efficiently render and manage the display of food items. This ensures optimal performance even with a large set of data.

4. **Pull to Refresh:** Implemented the pull-to-refresh feature using FlatList's refresh control props and Zustand to refresh the list of food items.

5. **Food Categories:** I used horizontal `ScrollView` to display various categories of food, such as dinner, lunch, and breakfast. The images for these categories were added manually in the assets folder.

6. **Styling with Tailwind CSS (NativeWind):** Tailwind CSS via NativeWind was used to provide utility-first CSS classes that are responsive and maintainable.

7. **Navigation:** Used bottom tab navigation (from React Navigation) to provide easy access to key sections of the app like Home, Favourites, Search, and Profile. The stack navigator is used for login and signup screens.

8. **UI Components:** The app uses custom components such as FoodImageCard and FoodListCard to display food items in a visually appealing way.
   Skeleton loaders are used to indicate loading states when refreshing or fetching data.

9. **Reusability and Consistency:** Avoided hardcoding strings or colors. Instead:

- Used Tailwind's theme extension for consistent styling.
- Managed app-specific colors in a separate file for centralized updates.
- Avoided embedding links directly in functions, keeping them in constants for reusability and flexibility.

10. **Error Handling and UX Considerations:** Gracefully managed loading states, pull-to-refresh functionality, and empty lists, ensuring a user-friendly experience.

## MVC Architecture in the app

The Model-View-Controller (MVC) architecture is employed in this app to separate concerns and maintain a clean codebase. Here's how it is implemented:

### 1. Model (Data Layer)

The Model represents the data and logic of the application. It handles the fetching, storing, and managing of data. In this app, the model can be seen in the form of the state management handled by Zustand. This allows the app to manage data such as food items and user authentication globally.

The food items and user authentication states are stored in `FoodState.js` and `AuthState.js` respectively.

### 2. View (UI Layer)

The View handles the presentation of data. In this app, the View is responsible for displaying food items, login pages, and user interfaces. The views are implemented in the form of React Native components such as HomeScreen, LoginScreen, FoodItemCard etc.

The HomeScreen is purely responsible for rendering food items, receiving data from the model layer (foodItems), and presenting it to the user, via `FoodImageCard.jsx` and `FoodListCard.jsx`.

A custom button component (`PrimaryButton.jsx`) is created using the `Pressable`, other react-native components and conditional logic. It maintains the visual consistency throughout the app!

### 3. Controller (Logic Layer)

The Controller connects the Model and the View. It handles user actions and updates the model as needed. In this app, controllers are represented by the functions that manage state updates and handle navigation.

- **LoginController:** The logic for handling login is encapsulated in a function that checks credentials and updates the authentication state.

```bash
const handleLogin = values => {
    if (
      userData.some(
        user =>
          user.username === values.username.trim() &&
          user.password === values.password.trim(),
      )
    ) {
      console.log('Login Successful');
      login({
        username: values.username.trim(),
        password: values.password.trim(),
      });
    } else {
      console.log('Login Failed');
      ToastAndroid.show('Invalid Credentials, Try again!', ToastAndroid.SHORT);
    }
  };
```

- **Fetching Food Controller:** The Fetching Food Controller is implemented in the refreshFoodItems function inside the useFoodStore. It handles fetching data from the API and updating the state (foodItems and refreshing), acting as the Controller in the MVC architecture.

```bash
import {create} from 'zustand';

export const useFoodStore = create(set => ({
  foodItems: [],
  refreshing: false,
  refreshFoodItems: async () => {
    set({foodItems: []});
    set({refreshing: true});
    const response = await fetch(apiUrl);
    const data = await response.json();
    set({foodItems: data.recipes, refreshing: false});
  },
}));
```

**Key Responsibilities:**

- _State Management:_ Updates foodItems (data) and refreshing (loading indicator).
- _Data Fetching:_ Fetches recipes from the API and updates the state.
- _Integration:_ Invoked by the View (FlatList in HomeScreen) for pull-to-refresh functionality.

This keeps business logic separate from the UI, ensuring a clean MVC structure.

## Challengs faced

- Initially, I had to manage different states across multiple screens and components (like login data on home screen & food item data in their respective cards). Zustand proved to be a simple and efficient solution, as I could create individual stores for authentication and food items data storage and access data globally with a simple hook.

- Implementing a smooth refresh experience for fetching food items was challenging, but with the refresh control options in `FlatList` component, I was able to achieve the desired behavior.

- Ensuring consistent styling across different devices was a bit tricky, but Tailwind CSS (via NativeWind) simplified this by providing a standard set of utility classes.

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

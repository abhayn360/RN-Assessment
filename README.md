# React Native Assessment Project

A mobile application built with React Native showcasing user authentication, product listings, and profile management.

## Features

### Authentication
- User registration (Sign Up)
- User login (Sign In)
- Secure logout with complete data clearance
- Session persistence using MMKV storage

### Home Screen
- Product listings with infinite scroll
- UI enhancement

### Profile Management
- User profile display
- Secure logout with data clearance

### Data Management
- Redux for state management
- MMKV for persistent storage
- Product data caching


### Enhanced Logout Functionality 
- Implemented complete user data clearance on logout
- Added requirement for re-signup after logout
- Cleared MMKV storage for better security
- Reset product state on logout



# Getting Started

firstly clone the repo. 
## Installing Dependencies
After cloning the repository, install the dependencies:
```bash
# Install JavaScript dependencies
npm install
```





>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.



You've successfully run React Native App. :partying_face:

### Now what?



## Usage

1. Start the Metro bundler
```bash
npm start
```

2. Run the application

For Android:
```bash
npm run android
```

For iOS:
```bash
npm run ios
```


## Troubleshooting

If you encounter build issues:
```bash
# Clear watchman
watchman watch-del-all

# Reset Metro cache
npm start -- --reset-cache

# Rebuild iOS
cd ios && pod install && cd ..
```


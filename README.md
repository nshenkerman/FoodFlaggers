# FoodFlaggers

# FoodFlagger

## Developer Team

- Viraj Acharya
- Nate Krall
- Nathan Shenkerman
- Felipe Vallejo
- Asfandyar Khan

## Overview

FoodFlagger is a React Native application (IOS and Android) designed to help users find free food events around them. Utilizing Google Maps API and user-generated data, the app aims to create a community-driven platform for sharing and discovering free food opportunities at the Duke University Campus.

## Features

- Real-time location tracking
- User-generated event creation
- Filter events by categories
- User preferences and settings

## Prerequisites

- Node.js
- npm
- Android Studio (for Android)
- Xcode (for iOS)
- Watchman (Optional but recommended)
  
## Setup Instructions

### For Project Owner

1. **Clone the repository**
    ```bash
    git clone https://github.com/virajac0/FoodFlagger

    ```
   
2. **Navigate to the project directory**
    ```bash
    cd FoodFlagger
    ```
  
3. **Install the required packages**
    ```bash
    npm install
    ```
  
4. **Run the app on iOS**
    ```bash
    npx react-native run-ios
    ```
  
    **Or on Android**
    ```bash
    npx react-native run-android
    ```
  
5. **Commit the `.gitignore` file**
    ```bash
    git add .gitignore
    git commit -m "Add .gitignore"
    ```

### For Teammates

1. **Clone the repository**
  
2. **Navigate to the project directory**
    ```bash
    cd FreeFoodFinder
    ```
  
3. **Install the required packages**
    ```bash
    npm install
    ```
  
4. **Run the app on iOS**
    ```bash
    npx react-native run-ios
    ```
  
    **Or on Android**
    ```bash
    npx react-native run-android
    ```

## Common Issues and Troubleshooting

1. **"RNSScreen was not found" Error**
    - Solution: Run `cd ios && pod install && cd ..` to install the necessary CocoaPods.

2. **"react-native-gesture-handler module was not found" Error**
    - Solution: Run `npm install react-native-gesture-handler` and then `cd ios && pod install && cd ..`.
  
Since our first milestone, we have welcomed two additional members to our team. We have worked together to form a coherent plan and divided labor between ourselves 1) Frontend 2) Backend. 

We have drafted up an initial features plan, and have started working on merging our resources together. We have formed proper channels of communication between us utilizing Slack and have set up an iMessage group. 

Furthermore, we have begun researching react native syntax and how we can incorporate the framework to make our application frontend seamless and aligned with modern application development practices. 

We have formed a plan for the microservices to implement and have reached out to Duke OIT for further clarification regarding their API for login using netid. In this way we hope to have our app fully functional and aligned specifically for the Duke student body. We have not yet divided up tasks or made substantial individual progress, but we've all contributed evenly to the collective progress we've made.

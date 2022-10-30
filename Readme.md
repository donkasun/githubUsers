## How to Run the application

Setup

- Step 1: Clone the repository
- Step 2: Run the following code to install node modules

    NPM
    ```Javascript
    npm install
    ```
    or
    
    Yarn
    ```Javascript
    yarn install
    ```
- Step 3: For iOS install pods in ```ios``` folder or run the following code
    ```Javascript
    cd ios && pod install
    ```

- Step 4: Creeate `config.js` file. Sample can be found in `example.config.js`. Create a github personal access token and replace token in the config. (https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

- Step 5: Run the application (You may need to open an emulator or connect a device before running)

    ### Android

    `npx react-native run-android` or `npm run android`

    ### iOS
    `npx react-native run-ios`  or `npm run ios`
    
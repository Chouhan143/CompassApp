import * as React from 'react';
import {AppRegistry} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import App from './App'; // Import your main App component
import {name as appName} from './app.json';

// Define your custom theme if needed (you can customize this)
const theme = {
  ...DefaultTheme,
  roundness: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: '#A69EEC', // Replace with your primary color
    accent: '#f1c40f', // Replace with your accent color
  },
};

function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);

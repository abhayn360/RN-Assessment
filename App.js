import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { StatusBar, Platform } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { store } from './src/redux/store';

export default function App() {
  useEffect(() => {
    StatusBar.setBarStyle('dark-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#FFFFFF', true);
    }
  }, []);

  const theme = {
    dark: false,
    colors: {
      primary: '#003B95',
      background: '#F3F4F6',
      card: '#FFFFFF',
      text: '#111827',
      border: '#E5E7EB',
      notification: '#3B82F6',
    },
  };

  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <NavigationContainer theme={theme}>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}
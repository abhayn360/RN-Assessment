import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import TabNavigator from './TabNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { checkSession } from '../redux/userSlice';
import { View, ActivityIndicator, Text } from 'react-native';
import { getUser, isSignedIn, getStorageInfo } from '../utils/storage';

const Stack = createNativeStackNavigator();

function Splash() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
      <ActivityIndicator size="large" color="#003B95" />
      <Text style={{ marginTop: 10, fontSize: 16, color: '#666' }}>
        Checking session...
      </Text>
    </View>
  );
}

export default function AppNavigator() {
  const dispatch = useDispatch();
  const { isAuthenticated, checked } = useSelector((s) => s.user);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    
    const storageInfo = getStorageInfo();
    console.log(' Initial MMKV state:', storageInfo);
    
    dispatch(checkSession()).finally(() => {
      setInitializing(false);
    });
  }, [dispatch]);

  if (initializing || !checked) {
    return <Splash />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={TabNavigator} />
         <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
     
    </Stack.Navigator>
  );
}
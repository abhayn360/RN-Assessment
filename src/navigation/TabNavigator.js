import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BookingsScreen from '../screens/BookingsScreen';
import OffersScreen from '../screens/OffersScreen';
import { Typography } from '../utils/typography';
import { HomeIcon, BookingsIcon, OffersIcon, ProfileIcon } from '../components/icons';

const Tab = createBottomTabNavigator();

import { COLORS } from '../utils/colors';

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.inactive,
        tabBarLabelStyle: {
          ...Typography.captionSmall,
          fontSize: 12,
          marginTop: 4,
        },
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopWidth: 0,
          height: 50,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 3,
        },
        tabBarIcon: ({ color, focused }) => {
          let IconComponent;
          let iconSize = 24; 
          switch (route.name) {
            case 'Home':
              IconComponent = HomeIcon;
              break;
            case 'Bookings':
              IconComponent = BookingsIcon;
              break;
            case 'Offers':
              IconComponent = OffersIcon;
              break;
            case 'Profile':
              IconComponent = ProfileIcon;
              iconSize = 20; 

              break;
            default:
              IconComponent = HomeIcon;
          }

          return (
            <View style={{ alignItems: 'center' }}>
              {focused && (
                <View
                  style={{
                    width: 50,
                    height: 4,
                    borderBottomLeftRadius:10,
                    borderBottomRightRadius:10,
                    backgroundColor: COLORS.primary,
                    position: 'absolute',
                    top: -5,
                  }}
                />
              )}
              <IconComponent 
                width={iconSize} 
                height={iconSize} 
                fill={color}
                color={color}
                style={{
                  paddingTop: 10,
                  opacity: focused ? 1 : 0.7 
                }}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Offers" component={OffersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

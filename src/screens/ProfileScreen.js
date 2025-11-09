import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import { resetProducts } from '../redux/productSlice';
import { useNavigation } from '@react-navigation/native';
import { Typography } from '../utils/typography';


const ProfileScreen = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = () => {
    // Clear user data
    dispatch(logout());
    // Reset products state
    dispatch(resetProducts());
    navigation.replace('SignIn');
  };

  const handleEditProfile = () => {
    console.log('Edit profile pressed');
  };

  const handleMenuItemPress = (menuItem) => {
    console.log(`${menuItem} pressed`);
  };

  return (
    <View style={styles.container}>
      <ProfileHeader
        user={user}
        onEditPress={handleEditProfile}
      />

      <SettingsSection
        onMenuItemPress={handleMenuItemPress}
        onLogout={handleLogout}
      />
    </View>
  );
};


const ProfileHeader = ({ user, onEditPress }) => (
  <View style={styles.profileHeader}>
    <View style={styles.profileInfo}>
      <Image
        source={require('../images/profile.jpg')}
        style={styles.avatar}
      />
      <View style={styles.userDetails}>
        <Text style={styles.userName}>
          {user?.fullName || 'Brooklyn Simmons'}
        </Text>
        <Text style={styles.userEmail}>
          {user?.email || 'brooklyn@testmail.com'}
        </Text>
      </View>
    </View>
    <TouchableOpacity 
      style={styles.editButton}
      onPress={onEditPress}
      activeOpacity={0.6}
    >
      <Ionicons 
        name="create-outline" 
        size={22} 
        color="#111827" 
      />
    </TouchableOpacity>
  </View>
);

const SettingsSection = ({ onMenuItemPress, onLogout }) => (
  <View style={styles.settingsSection}>
    <Text style={styles.sectionTitle}>Setting</Text>
    
    <View style={styles.menuContainer}>
      {MENU_ITEMS.map((item, index) => (
        <MenuItem
          key={item.id}
          icon={item.icon}
          title={item.title}
          onPress={() => onMenuItemPress(item.title)}
          isLast={index === MENU_ITEMS.length - 1}
        />
      ))}
    </View>

    <TouchableOpacity 
      onPress={onLogout} 
      style={styles.logoutButton}
      activeOpacity={0.6}
    >
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  </View>
);


const MenuItem = ({ icon, title, onPress, isLast = false }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.menuItem, !isLast && styles.menuItemBorder]}
    activeOpacity={0.6}
  >
    <View style={styles.menuItemContent}>
      <Ionicons 
        name={icon} 
        size={20} 
        color="#111827" 
      />
      <Text style={styles.menuItemTitle}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const MENU_ITEMS = [
  {
    id: 'your-card',
    icon: 'card-outline',
    title: 'Your Card',
  },
  {
    id: 'security',
    icon: 'shield-checkmark-outline',
    title: 'Security',
  },
  {
    id: 'notification',
    icon: 'notifications-outline',
    title: 'Notification',
  },
  {
    id: 'languages',
    icon: 'globe-outline',
    title: 'Languages',
  },
  {
    id: 'help-support',
    icon: 'help-circle-outline',
    title: 'Help and Support',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 32,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    ...Typography.titleLarge,
    color: '#171725',
    marginBottom: 4,
  },
  userEmail: {
    ...Typography.bodySmall,
    color: '#8E8E8E',
  },
  editButton: {
    padding: 4,
  },
  settingsSection: {
    flex: 1,
    paddingHorizontal: 22,
  },
  sectionTitle: {
    ...Typography.bodyLarge,
    color: '#9CA3AF',
    marginLeft:10
  },
  menuContainer: {
    borderRadius: 16,
    paddingHorizontal: 10,
    marginBottom: 32,
  },
  menuItem: {
    paddingVertical: 20,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemTitle: {
    ...Typography.titleMedium,
    color: '#111827',
    marginLeft: 16,
  },
  logoutButton: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  logoutText: {
    ...Typography.titleLarge,
    color: '#EF4444',
  },
});

export default ProfileScreen;

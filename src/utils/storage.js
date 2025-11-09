import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'rn-storage',
});

export const STORAGE_KEYS = {
  USERS: 'users', 
  CURRENT_USER: 'currentUser', 
  SESSION: 'session',
};

try {
  storage.set('init_test', 'working');
  const testResult = storage.getString('init_test');
  storage.delete('init_test');
} catch (error) {
  console.error(' MMKV Initialization Failed:', error);
}

// Get all registered users
export function getAllUsers() {
  try {
    const usersString = storage.getString(STORAGE_KEYS.USERS);
    const users = usersString ? JSON.parse(usersString) : [];
    return users;
  } catch (e) {
    console.error('❌ MMKV getAllUsers parse error:', e);
    return [];
  }
}

// Add a new user to the users list
export function addUser(newUser) {
  try {
    
    const users = getAllUsers();
    
    // Check if user already exists by email
    const existingUserIndex = users.findIndex(
      user => user.email.toLowerCase() === newUser.email.toLowerCase()
    );
    
    if (existingUserIndex !== -1) {
      throw new Error('User with this email already exists');
    }
    
    // Add timestamp and unique ID
    const userWithMetadata = {
      ...newUser,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    users.push(userWithMetadata);
    
    storage.set(STORAGE_KEYS.USERS, JSON.stringify(users));
    
    const verification = getAllUsers();
    
    return userWithMetadata;
  } catch (error) {
    throw error;
  }
}

// Find user by email and password
export function findUser(email, password) {
  try {
    
    const users = getAllUsers();
    const normalizedEmail = email.toLowerCase();
    
    const user = users.find(
      user => user.email.toLowerCase() === normalizedEmail && user.password === password
    );
    
    return user || null;
  } catch (error) {
    console.error(' MMKV findUser error:', error);
    return null;
  }
}

// Set current logged in user
export function setCurrentUser(user) {
  try {
    storage.set(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    storage.set(STORAGE_KEYS.SESSION, true);
    
    const verification = getCurrentUser();
  } catch (error) {
    console.error(' MMKV setCurrentUser error:', error);
    throw error;
  }
}

// Get current logged in user
export function getCurrentUser() {
  try {
    const userString = storage.getString(STORAGE_KEYS.CURRENT_USER);
    const user = userString ? JSON.parse(userString) : null;
    return user;
  } catch (e) {
    return null;
  }
}

export function isSignedIn() {
  try {
    const isLoggedIn = storage.getBoolean(STORAGE_KEYS.SESSION) || false;
    return isLoggedIn;
  } catch (error) {
    return false;
  }
}

export function clearUser() {
  try {
    console.log('Clearing current user session');
    storage.delete(STORAGE_KEYS.CURRENT_USER);
    storage.delete(STORAGE_KEYS.SESSION);
  } catch (error) {
    console.error('❌ Clear user failed:', error);
  }
}

export function clearAllUsers() {
  try {
    storage.delete(STORAGE_KEYS.USERS);
    storage.delete(STORAGE_KEYS.CURRENT_USER);
    storage.delete(STORAGE_KEYS.SESSION);
  } catch (error) {
    console.error('❌ Clear all users failed:', error);
  }
}

export const saveUser = setCurrentUser;
export const getUser = getCurrentUser;

export function getStorageInfo() {
  try {
    return {
      currentUser: getCurrentUser(),
      allUsers: getAllUsers(),
      isSignedIn: isSignedIn(),
      allKeys: storage.getAllKeys(),
      currentUserRaw: storage.getString(STORAGE_KEYS.CURRENT_USER),
      usersRaw: storage.getString(STORAGE_KEYS.USERS),
      sessionRaw: storage.getBoolean(STORAGE_KEYS.SESSION),
    };
  } catch (error) {
    return null;
  }
}
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getCurrentUser, 
  setCurrentUser, 
  clearUser,
  clearAllUsers, 
  isSignedIn, 
  addUser, 
  findUser, 
  getAllUsers 
} from '../utils/storage';

export const checkSession = createAsyncThunk('user/checkSession', async () => {
  
  const signedIn = isSignedIn();
  const user = signedIn ? getCurrentUser() : null;
  
  return { signedIn, user };
});

export const signupUser = createAsyncThunk('user/signupUser', async (payload, { rejectWithValue }) => {
  try {
    
    if (!payload.email || !payload.password) {
      throw new Error('Email and password are required');
    }
    
    const userData = {
      ...payload,
      email: payload.email.trim().toLowerCase(),
    };
    
    
    const newUser = addUser(userData);
    
    setCurrentUser(newUser);
    
    
    return newUser;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

export const signinUser = createAsyncThunk('user/signinUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    
    const user = findUser(email, password);
    
    if (!user) {
      return rejectWithValue('Invalid email or password.');
    }
    
    setCurrentUser(user);
    
    return user;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

export const logout = createAsyncThunk('user/logout', async () => {
  // Clear all user data 
  clearAllUsers();
  return true;
});

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  checked: false, 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        state.loading = false;
        state.checked = true;
        state.isAuthenticated = action.payload.signedIn && !!action.payload.user;
        state.user = action.payload.user || null;
      })
      .addCase(checkSession.rejected, (state, action) => {
        state.loading = false;
        state.checked = true;
        state.error = action.error.message;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export default userSlice.reducer;
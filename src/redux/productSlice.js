import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../api/client';

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async ({ offset = 0, limit = 10 }, { rejectWithValue }) => {
    try {
      const res = await client.get(`/products`, {
        params: { offset, limit },
      });
      return { items: res.data, offset, limit };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const initialState = {
  items: [],
  offset: 0,
  limit: 10,
  hasMore: true,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProducts: (state) => {
      state.items = [];
      state.offset = 0;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        const { items, offset, limit } = action.payload;
        if (offset === 0) {
          state.items = items;
        } else {
          state.items = [...state.items, ...items];
        }
        state.offset = offset + limit;
        state.hasMore = items.length === limit;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetProducts } = productSlice.actions;
export default productSlice.reducer;
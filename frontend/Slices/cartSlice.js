import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loadcartFormStorage = () => {
  const storedcart = localStorage.getItem("cart");
  return storedcart ? JSON.parse(storedcart) : [];
};

const savecartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = axios.get(`https://myshop-ecommerce-fullstack.onrender.com/api/v1/cart/get`, {
        params: {
          userId,
          guestId,
        },
      });
      return (await response).data.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addtoCart = createAsyncThunk(
  "cart/addtoCart",
  async (
    { productId, quantity, color, size, guestId, userId },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "https://myshop-ecommerce-fullstack.onrender.com/api/v1/cart/create",
        {
          productId,
          quantity,
          color,
          size,
          guestId,
          userId,
        }
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (
    { productId, quantity, color, size, guestId, userId },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        "https://myshop-ecommerce-fullstack.onrender.com/api/v1/cart/increment",
        {
          productId,
          quantity,
          color,
          size,
          guestId,
          userId,
        }
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, color, size, guestId, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        "https://myshop-ecommerce-fullstack.onrender.com/api/v1/cart/delete",
        {
          data: {
            productId,
            color,
            size,
            guestId,
            userId,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const margeCart = createAsyncThunk(
  "cart/margeCart",
  async ({ guestId, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://myshop-ecommerce-fullstack.onrender.com/api/v1/cart/marge",
        { guestId, userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: loadcartFormStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = { product: [] };
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        savecartToStorage(action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.data.message || "Fild to fetch cart";
      })

      //   addTocart
      .addCase(addtoCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addtoCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        savecartToStorage(action.payload);
      })
      .addCase(addtoCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data.message || "Fild to addTocart cart";
      })
      // update cart
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        savecartToStorage(action.payload);
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data.message || "Fild to update cart";
      })

      // remove from cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        savecartToStorage(action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.data.message || "Fild to remove items from cart";
      })
      // marge cart
      .addCase(margeCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(margeCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        savecartToStorage(action.payload);
      })
      .addCase(margeCart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.data.message || "Fild to remove items from cart";
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;

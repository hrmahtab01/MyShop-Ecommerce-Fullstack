import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllorder = createAsyncThunk(
  "adminorder/fetchAllorder",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://myshop-ecommerce-fullstack.onrender.com/api/v1/admin/orders",
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

// update order
export const updateOrderStatus = createAsyncThunk(
  "adminorder/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://myshop-ecommerce-fullstack.onrender.com/api/v1/admin/orders/${id}`,
        { status },
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

//    delete order
export const deleteOrder = createAsyncThunk(
  "adminorder/deleteOrder",
  async ({ id }, { rejectWithValue }) => {
    try {
      await axios.delete(`https://myshop-ecommerce-fullstack.onrender.com/api/v1/admin/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return id;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState: {
    orders: [],
    totalOrders: 0,
    totalSales: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllorder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllorder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length;

        const totalSales = action.payload.reduce((acc, order) => {
          return acc + order.totalPrice;
        }, 0);
        state.totalSales = totalSales;
      })
      .addCase(fetchAllorder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.data.message;
      })

      //   update order status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updateOrder = action.payload;
        const orderIndex = state.orders.findIndex((order)=>order._id === updateOrder._id);
        if (orderIndex !== -1) {
          state.orders[orderIndex] = updateOrder;
            
        }

      })

    //   delete order 
    .addCase(deleteOrder.fulfilled, (state, action)=>{
        state.orders = state.orders.filter((order)=>order._id !== action.payload)
    })
  },
});

export default adminOrderSlice.reducer;

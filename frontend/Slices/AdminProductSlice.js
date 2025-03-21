import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAdminproducts = createAsyncThunk(
  "admin/fetchAdminproducts",
  async () => {
    const response = await axios.get(
      "http://localhost:4400/api/v1/admin/product",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data.data;
  }
);

export const createProduct = createAsyncThunk(
  "admin/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4400/api/v1/admin/product",
        productData,
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

export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:4400/api/v1/admin/product/${id}`,
        productData,
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

export const deleteProduct = createAsyncThunk("admin/deleteProduct", async (id, {rejectWithValue})=>{
    try {
        const response = await axios.delete(`http://localhost:4400/api/v1/admin/product/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data.data;

    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response.data.message)
    }
})

const adminProductSlice = createSlice({
    name:"adminProduct",
    initialState:{
        products: [],
        loading: false,
        error: null,
    },
    reducers:{},
    
})

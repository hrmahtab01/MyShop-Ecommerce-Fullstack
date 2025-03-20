import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Collection } from "mongoose";

export const fetchAllproducts = createAsyncThunk(
  "product/fetchAllproducts",
  async ({
    collection,
    size,
    color,
    gender,
    minPrice,
    maxPrice,
    sortBy,
    search,
    category,
    brand,
    limit,
    material,
  }) => {
    const quary = URLSearchParams();
    if (collection) quary.append("collection", collection);
    if (size) quary.append("size", size);
    if (color) quary.append("color", color);
    if (gender) quary.append("gender", gender);
    if (minPrice) quary.append("minPrice", minPrice);
    if (maxPrice) quary.append("maxPrice", maxPrice);
    if (sortBy) quary.append("sortBy", sortBy);
    if (search) quary.append("search", search);
    if (category) quary.append("category", category);
    if (brand) quary.append("brand", brand);
    if (limit) quary.append("limit", limit);
    if (material) quary.append("material", material);

    const response = await axios.get(
      `http://localhost:4400/api/v1/product/allproduct?${quary.toString()}`
    );
    return response.data.data;
  }
);

export const fetchproductDetils = createAsyncThunk(
  "product/fetchproductDetils",
  async (id) => {
    const response = await axios.get(
      `http://localhost:4400/api/v1/product/singleproduct/${id}`
    );
    return response.data.data;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, productData }) => {
    const response = await axios.patch(
      `http://localhost:4400/api/v1/product/update/${id}`,
      productData
    );
    return response.data;
  }
);

export const fetchSimilarProduct = createAsyncThunk(
  "product/fetchSimilarProduct",
  async (id) => {
    const response = await axios.get(
      `http://localhost:4400/api/v1/product/similar/${id}`
    );
    return response.data.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    selectedProduct: null,
    similarProducts: [],
    loading: false,
    error: null,
    filters: {
      collection: "",
      size: "",
      color: "",
      gender: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
      search: "",
      category: "",
      brand: "",
      limit: "",
      material: "",
    },
  },
  reducers: {
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearfilter: (state) => {
      state.filters = {
        collection: "",
        size: "",
        color: "",
        gender: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "",
        search: "",
        category: "",
        brand: "",
        limit: "",
        material: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllproducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllproducts.fulfilled, (state, action) => {
        state.loading = false;
        state.product = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAllproducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // fethproductDetils
      .addCase(fetchproductDetils.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchproductDetils.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchproductDetils.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    //   update product
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updateproduct = action.payload;
        const index = state.product.findIndex(
          (product) => product._id === updateproduct._id
        );
        if (index !== -1) {
          state.product[index] = updateproduct;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    // fetchSimilarProduct
    builder
      .addCase(fetchSimilarProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchSimilarProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilter, clearfilter } = productSlice.actions;
export default productSlice.reducer;

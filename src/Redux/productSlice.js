import { createSlice } from "@reduxjs/toolkit";


export const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        categories: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        // get product list
        getStart: (state) => {
            state.isFetching = true
            state.error = false;
        },
        getProductsSuccess: (state, action) => {
            state.isFetching = false;
            state.products = action.payload;
        },
        getCategoriesSuccess: (state, action) => {
            state.isFetching = false;
            state.categories = action.payload;
        },
        getFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
})


export const { getStart, getFailure, getProductsSuccess, getCategoriesSuccess  } = productSlice.actions;

export default productSlice.reducer;
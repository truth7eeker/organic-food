import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./fetchProducts";

export interface IProduct {
    id: number,
    title: string,
    category: string,
    pic: string,
    pic2?: string,
    price: number,
    portion: string,
    description: string
}

interface IProducts {
    products: Array<IProduct>,
    status: null | string
}

const initialState: IProducts = {
    products: [],
    status: null
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, state => {
            state.status = 'loading'
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.status = 'success'
            state.products = action.payload
        })
        builder.addCase(getProducts.rejected, state => {
            state.status = 'error'
        })
    }
})

export default productsSlice.reducer
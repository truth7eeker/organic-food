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
    description: string,
    isFavourite: boolean,
    rating: number
}

interface IProducts {
    products: Array<IProduct>,
    status: null | string,
    favourites: Array<IProduct>
}

const initialState: IProducts = {
    products: [],
    status: null,
    favourites: []
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
       setLike(state, {payload}) {
        state.products.map(product => product.id === payload.id ? product.isFavourite = !product.isFavourite : product)
       }
    },
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

export const { setLike } = productsSlice.actions

export default productsSlice.reducer
import { configureStore } from "@reduxjs/toolkit";
import products from "./reducers/productsSlice/productsSlice";
import filter from './reducers/filterSlice/filterSlice'
import cart from './reducers/cartSlice/cartSlice'

export const store = configureStore({
    reducer: {
        products,
        filter,
        cart,
    }
})
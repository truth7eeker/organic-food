import { createSlice } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../../utils/calcTotalPrice";
import { IProduct } from "../productsSlice/productsSlice";

export interface ICartItem extends IProduct {
    quantity: number
}

interface ICart {
    items: Array<ICartItem>,
    totalPrice: number
}

const initialState:ICart = {
    items: [],
    totalPrice: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increment(state, { payload }) {
            const found = state.items.find(obj => obj.id === payload.id)
            if (found) {
                found.quantity++
            } else {
                state.items.push(({
                    ...payload,
                    quantity: 1
                }))
        
            }
            state.totalPrice = calcTotalPrice(state.items)
        },
        decrement(state, { payload }) {
            const found = state.items.find(obj => obj.id === payload.id)
            if (found && found.quantity > 1) {
                found.quantity--
            } else if (found && found.quantity <= 1) {
                state.items = state.items.filter(item => item !== found)
                console.log(state.items)
            }
            state.totalPrice = calcTotalPrice(state.items)
        }
    }
})

export const { increment, decrement } = cartSlice.actions

export default cartSlice.reducer
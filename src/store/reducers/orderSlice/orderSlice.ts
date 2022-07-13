import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    user: {
        name: '',
        phone: ''
    },
    card: {
        number: '',
        fullName: '',
        month: '',
        year: '',
        cvv: ''
    },
    address: {
        addressLine: '',
        extraInfo: ''
    },
    error: ''
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        hanldeCardInfo(state, {payload}) {
            const isText = payload.name === 'fullName'
            let inputVal = ''
            if (isText) {
                inputVal = payload.value.replace(/[^a-z\s]/gi, '')
            } else if (!isText) {
                inputVal = payload.value.replace(/[^0-9]/gi, '')
            }
            state.card[payload.name as keyof typeof state.card] = inputVal
        },
        handleContactInfo(state, {payload}) {
            const isPhone = payload.name === 'phone'
            const regex = /(^8|7|\+7)((\d{10})|(\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}))/
            if(isPhone) {
                regex.test(payload.value) ? state.error = '' : state.error = 'Неверный номер телефона'
            }
            state.user[payload.name as keyof typeof state.user] = payload.value
        },
        handleAddressInfo(state, {payload}) {
            state.address[payload.name as keyof typeof state.address] = payload.value
        },
        setCart(state, {payload}) {
            state.cartItems = payload
        }
    }
})

export default orderSlice.reducer

export const { hanldeCardInfo, handleContactInfo, handleAddressInfo, setCart }  = orderSlice.actions
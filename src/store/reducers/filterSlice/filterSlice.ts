import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: '',
    total: 17,
    sort: {
        title: 'По популярности',
        sortBy: 'rating',
        order: 'desc',
    },
    page: 1,
    search: ''
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategory(state, { payload }) {
            state.category = payload.category
            state.total = payload.total
            state.page = 1
        },
        setSortOption(state, { payload }) {
            state.sort = payload
        },
        setPage(state, { payload }) {
            state.page = payload
        },
        setSearch(state, {payload}) {
            state.search = payload.value
            console.log(payload.value)
        }
    }
})

export const { setCategory, setSortOption, setPage, setSearch } = filterSlice.actions

export default filterSlice.reducer
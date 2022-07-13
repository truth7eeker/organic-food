import { createAsyncThunk } from "@reduxjs/toolkit";
import { IOption } from "../../../components/sort-menu/SortMenu";

export interface IParams {
    category: string 
    sort: IOption 
    page: number 
    search: string 
}

export const getProducts = createAsyncThunk('products/getProducts', async(params:IParams) => {
    const url = params.search ? `https://62b60aac6999cce2e8fe40f4.mockapi.io/shop-api/products?search=${params.search}` 
    : `https://62b60aac6999cce2e8fe40f4.mockapi.io/shop-api/products?category=${params.category}&p=${params.page}&l=8&sortBy=${params.sort.sortBy}&order=${params.sort.order}`
    const response = await fetch(url)
    const data = await response.json()
    return data
})
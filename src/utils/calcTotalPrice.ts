import { ICartItem } from "../store/reducers/cartSlice/cartSlice";

export function calcTotalPrice(items:Array<ICartItem>) {
    return items.reduce((prev, curr) => curr.quantity * curr.price + prev, 0)
}

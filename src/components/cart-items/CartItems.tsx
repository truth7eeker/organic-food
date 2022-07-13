import React from 'react';
import CartItem from '../cart-item/CartItem';
import { ICartItem } from '../../store/reducers/cartSlice/cartSlice';

function CartItems({items}: {items?: Array<ICartItem>}) {
  return (
    <ul>
      {items?.map((item: ICartItem) => (
        <CartItem item={item} key={item.id} />
      ))}
    </ul>
  );
}

export default CartItems;

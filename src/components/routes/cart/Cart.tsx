import React from 'react';
import styles from './Cart.module.scss';
import notice from '../../../assets/notice-icon.svg';
import CartItems from '../../cart-items/CartItems';
import OrderInfo from '../../order-info/OrderInfo';
import { useSelector } from 'react-redux';
import EmptyList from '../../empty-list/EmptyList';
import emptyCart from '../../../assets/empty-cart.png';

function Cart() {
  const { items } = useSelector((state: any) => state.cart);
  return (
    <>
      {items.length ? (
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <div className={styles.header}>
              <div className={styles.title}>Корзина</div>
              <div className={styles.notice}>
                <img src={notice} />
                <p>Минимальная сумма заказа 1500 ₽</p>
              </div>
            </div>
            <div>
              <CartItems items={items} />
            </div>
          </div>
          <OrderInfo margin="55" />
        </div>
      ) : (
        <EmptyList pic={emptyCart}/>
      )}
    </>
  );
}

export default Cart;

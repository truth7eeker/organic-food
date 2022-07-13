import React from 'react';
import styles from './OrderInfo.module.scss';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

function OrderInfo({ margin, message }: { margin: string; message?: any}) {
  const { items, totalPrice } = useSelector((state: any) => state.cart);
  const location = useLocation();

  return (
    <div className={styles.wrapper} style={{ marginTop: margin + 'px' }}>
      <div className={styles.top__wrapper}>
        <div className={styles.order__info}>
          <p>Кол-во товаров</p>
          <p>{items.length}</p>
        </div>
        <div className={styles.order__info}>
          <p>Стоимость продуктов</p>
          <p>{totalPrice} ₽</p>
        </div>
      </div>
      <div className={styles.bottom__wrapper}>
        <Link to={totalPrice > 1500 ? '/organic-food/order' : ''}>
          <button
            className={totalPrice < 1500 ? styles.disabled : ''}>
            Оформить заказ
          </button>
        </Link>
        <p>
          {location.pathname === '/organic-food/cart' ? 'Минимальная сумма заказа 1500 ₽' : message()}
        </p>
      </div>
    </div>
  );
}

export default OrderInfo;

import React from 'react';
import styles from './ProductCard.module.scss';
import { IProduct } from '../../store/reducers/productsSlice/productsSlice';
import basket from '../../assets/basket-icon.svg';
import { useSelector } from 'react-redux';
import { ICartItem } from '../../store/reducers/cartSlice/cartSlice';
import usePlusMinus from '../../hooks/usePlusMinus';

function ProductCard({ product }: { product: IProduct }) {
  const { items } = useSelector((state: any) => state.cart);
  const { handleIncrement, handleDecrement } = usePlusMinus()

  const doesExistInCart = (product: IProduct) => {
    const found = items.find((i: ICartItem) => i.id === product.id && i.quantity > 0);
    return found ? true : false;
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.pic__block}>
          <img src={product.pic} className={styles.pic} />
          <div
            className={styles.overlay}
            style={{ visibility: doesExistInCart(product) ? 'visible' : 'hidden' }}>
            <div className={styles.operators}>
              <span onClick={(e) => handleDecrement(e, product)}>–</span>
              <span>
                {items.map((i: ICartItem) => i.id === product.id && i.quantity > 0 && i.quantity)}
              </span>
              <span onClick={(e) => handleIncrement(e, product)}>+</span>
            </div>
            <p>в корзине</p>
          </div>
        </div>
        <h4>{product.title}</h4>
      </div>
      <div className={styles.footer}>
        <div className={styles.footer__left}>
          <div>
            <span>{product.price} ₽</span>/ {product.portion}
          </div>
          <div className={styles.rating}></div>
        </div>
        <div className={styles.footer__right} onClick={(e) => handleIncrement(e, product)}>
          <img src={basket} />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

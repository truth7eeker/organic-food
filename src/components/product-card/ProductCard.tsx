import React, { useState } from 'react';
import styles from './ProductCard.module.scss';
import { IProduct, setLike } from '../../store/reducers/productsSlice/productsSlice';
import basket from '../../assets/basket-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { ICartItem } from '../../store/reducers/cartSlice/cartSlice';
import usePlusMinus from '../../hooks/usePlusMinus';
import Like from '../like-btn/Like';
import { store } from '../../store/store';
import CardOpened from './CardOpened';

function ProductCard({ product }: { product: IProduct }) {
  const { items } = useSelector((state: any) => state.cart);
  const { handleIncrement, handleDecrement } = usePlusMinus();

  const doesExistInCart = (product: IProduct) => {
    const found = items.find((i: ICartItem) => i.id === product.id && i.quantity > 0);
    return found ? true : false;
  };

  const dispatch = useDispatch<typeof store.dispatch>();

  const handleLike = (e:React.MouseEvent, id: number) => {
    preventOpen(e)
    dispatch(setLike({ id }));
  };

  const [isCardOpen, setIsCardOpen] = useState(false);

  const handleCardOpen = (e:React.MouseEvent, product: IProduct) => {
    doesExistInCart(product) && preventOpen(e)
    setIsCardOpen(true);
  };

  const preventOpen = (e:React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <>
      {isCardOpen ? (
        <CardOpened product={product} handleLike={handleLike} setIsCardOpen={setIsCardOpen} />
      ) : (
        <div className={styles.card} onClick={(e) => handleCardOpen(e, product)}>
          <div className={styles.header}>
            <div className={styles.pic__block}>
              <img src={product.pic} className={styles.pic} />
              <div
                className={styles.overlay}
                style={{ visibility: doesExistInCart(product) ? 'visible' : 'hidden' }}
                onClick={e => preventOpen(e)}>
                <div className={styles.operators}>
                  <span onClick={(e) => handleDecrement(e, product)}>–</span>
                  <span>
                    {items.map(
                      (i: ICartItem) => i.id === product.id && i.quantity > 0 && i.quantity,
                    )}
                  </span>
                  <span onClick={(e) => handleIncrement(e, product)}>+</span>
                </div>
                <p>в корзине</p>
              </div>
              <div className={styles.like__block}>
                <Like
                  backgroundColor="whitesmoke"
                  borderRadius="50%"
                  width="25px"
                  height="25px"
                  handleClick={handleLike}
                  product={product}
                  isClicked={product.isFavourite}
                />
              </div>
            </div>
            <h4>{product.title}</h4>
          </div>
          <div className={styles.footer} onClick={e => e.stopPropagation()}>
            <div className={styles.footer__left}>
              <div>
                <span>{product.price} ₽</span>/ {product.portion}
              </div>
              <div className={styles.rating}>Оценка: {product.rating}</div>
            </div>
            <div className={styles.footer__right} onClick={(e) => handleIncrement(e, product)}>
              <img src={basket} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCard;

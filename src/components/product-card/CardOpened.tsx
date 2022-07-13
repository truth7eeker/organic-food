import React, { useState } from 'react';
import close from '../../assets/close.svg';
import { IProduct } from '../../store/reducers/productsSlice/productsSlice';
import basket from '../../assets/basket-icon.svg';
import Like from '../like-btn/Like';
import styles from './ProductCard.module.scss';
import usePlusMinus from '../../hooks/usePlusMinus';
import { useSelector } from 'react-redux';
import { ICartItem } from '../../store/reducers/cartSlice/cartSlice';

interface IProps {
  product: IProduct;
  setIsCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleLike: any;
}

function CardOpened({ product, setIsCardOpen, handleLike }: IProps) {
  const { items } = useSelector((state: any) => state.cart);
  const currItem = items.find((i: ICartItem) => i.id === product.id);
  const currItemQuantity = currItem && currItem.quantity > 0 && currItem.quantity

  const handleCardClose = () => {
    setIsCardOpen(false);
  };

  const [isBasketClicked, setIsBasketClicked] = useState(false);

  const handleOperators = (e: React.MouseEvent, product: IProduct) => {
    setIsBasketClicked(true);
    handleIncrement(e, product);
  };

  const { handleIncrement, handleDecrement } = usePlusMinus();

  const handleMinus = (e:React.MouseEvent, product:IProduct) => {
    handleDecrement(e, product)
    currItemQuantity <= 1 && setIsBasketClicked(false)
  }

console.log(currItemQuantity)
  return (
    <div className={styles.card__open}>
      <div className={styles.content}>
        <img src={close} alt="close" onClick={handleCardClose} className={styles.icon__close} />
        <div className={styles.product__info}>
          <img src={product.pic} alt="product-pic" />
          <div className={styles.text}>
            <div>
              <h2>{product.title}</h2>
              <p>
                <b>Оценка покупателей:</b> {product.rating}
              </p>
            </div>
            <p>
              <b>Опсиание:</b> {product.description}
            </p>
            <div className={styles.price}>
              <b>{product.price} ₽</b>/ {product.portion}
            </div>
            <div className={styles.footer}>
              <div>
                <div
                  className={styles.basket}
                  onClick={(e) => handleOperators(e, product)}
                  style={{ display: isBasketClicked || currItemQuantity > 0 ? 'none' : 'flex' }}>
                  <img src={basket} alt="add to cart" />
                  <p>В корзину</p>
                </div>
                <div
                  className={styles.operators}
                  style={{ display: isBasketClicked || currItemQuantity > 0 ? 'flex' : 'none' }}>
                  <div onClick={(e) => handleMinus(e, product)}>–</div>
                  <span>{currItemQuantity}</span>
                  <div onClick={(e) => handleIncrement(e, product)}>+</div>
                </div>
              </div>
              <Like
                width="30px"
                height="30px"
                backgroundColor="whitesmoke"
                borderRadius="50%"
                handleClick={handleLike}
                isClicked={product.isFavourite}
                product={product}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardOpened;

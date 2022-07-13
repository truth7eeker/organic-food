import React, { useRef } from 'react';
import styles from './CartItem.module.scss';
import { ICartItem } from '../../store/reducers/cartSlice/cartSlice';
import usePlusMinus from '../../hooks/usePlusMinus';
import useHover from '../../hooks/useHover';
import Basket from '../basket/Basket';

function CartItem({ item }: { item: ICartItem }) {
  const { handleIncrement, handleDecrement } = usePlusMinus();
  const ref = useRef(null);
  const [isHovered] = useHover(ref);

  const handleBubble = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <li className={styles.li} onClick={(e) => handleBubble(e)}>
      <div className={styles.info}>
        <img src={item.pic} />
        <div>
          <h4>{item.title}</h4>
          <p>
            {item.price} ₽ / {item.portion}
          </p>
        </div>
      </div>
      <div className={styles.quantity}>
        <div className={styles.operators}>
          <div
            className={`${styles.operator} ${item.quantity === 1 ? styles.operator__trash : ''}`}
            onClick={(e) => handleDecrement(e, item)}
            ref={ref}>
            {item.quantity === 1 ? (
              <Basket isHovered={isHovered} width="10px" height="10px" product={null} />
            ) : (
              '–'
            )}
          </div>
          <span>{item.quantity}</span>
          <div className={styles.operator} onClick={(e) => handleIncrement(e, item)}>
            +
          </div>
        </div>
        <div>{item.price * item.quantity} ₽</div>
        <Basket isHovered={null} width="15px" height="15px" product={item} />
      </div>
    </li>
  );
}

export default CartItem;

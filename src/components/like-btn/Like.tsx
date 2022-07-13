import React, { useRef } from 'react';
import styles from './Like.module.scss';
import heart from '../../assets/favorite.svg';
import heartBorder from '../../assets/favorite-border.svg';
import useHover from '../../hooks/useHover';
import { IProduct } from '../../store/reducers/productsSlice/productsSlice';

interface IProps {
  backgroundColor?: string;
  borderRadius?: string;
  width?: string;
  height?: string;
  handleClick?: any;
  isClicked?: boolean;
  product?: IProduct;
}

function Like({
  backgroundColor,
  borderRadius,
  width,
  height,
  handleClick,
  isClicked,
  product,
}: IProps) {

  const ref = useRef(null);
  const [isHovered] = useHover(ref);

  return (
    <div
      className={styles.heart}
      ref={ref}
      style={{ backgroundColor, borderRadius }}
      onClick={(e) => handleClick(e, product && product.id)}>
      <img src={isHovered || isClicked ? heart : heartBorder} style={{ width, height }} />
    </div>
  );
}

export default Like;

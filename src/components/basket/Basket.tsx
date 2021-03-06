import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import useHover from '../../hooks/useHover';
import { ICartItem, deleteProduct } from '../../store/reducers/cartSlice/cartSlice';

interface ISvg {
  isHovered?: boolean | null;
  width?: string;
  height?: string;
  product?: ICartItem | null;
}

function Basket({ isHovered, width, height, product }: ISvg) {
  const svgRef = useRef();
  const [isSvgHovered] = useHover(svgRef);

  const dispatch = useDispatch();
  const deleteCartProduct = (e: React.MouseEvent, product: ICartItem) => {
    e.stopPropagation()
    if (product) {
      dispatch(deleteProduct(product));
    }
  };
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef as any}
      style={{ cursor: 'pointer' }}
      onClick={(e) => deleteCartProduct(e, product as any)}>
      <path
        d="M13.5 1C13.6458 1 13.7604 1.05208 13.8438 1.15625C13.9479 1.23958 14 1.35417 14 1.5V2.5C14 2.64583 13.9479 2.77083 13.8438 2.875C13.7604 2.95833 13.6458 3 13.5 3H0.5C0.354167 3 0.229167 2.95833 0.125 2.875C0.0416667 2.77083 0 2.64583 0 2.5V1.5C0 1.35417 0.0416667 1.23958 0.125 1.15625C0.229167 1.05208 0.354167 1 0.5 1H4.25L4.53125 0.40625C4.67708 0.135417 4.90625 0 5.21875 0H8.78125C9.09375 0 9.32292 0.135417 9.46875 0.40625L9.75 1H13.5ZM1.65625 14.5938L1 4H13L12.3438 14.5938C12.3229 14.9896 12.1667 15.3229 11.875 15.5938C11.5833 15.8646 11.2396 16 10.8438 16H3.15625C2.76042 16 2.41667 15.8646 2.125 15.5938C1.83333 15.3229 1.67708 14.9896 1.65625 14.5938Z"
        fill={
          isHovered === true
            ? 'rgb(121, 118, 109)'
            : isHovered === false
            ? '#E0DCDA'
            : isSvgHovered
            ? 'rgb(121, 118, 109)'
            : '#E0DCDA'
        }
      />
    </svg>
  );
}

export default Basket;

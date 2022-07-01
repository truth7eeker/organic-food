import { useDispatch } from 'react-redux';
import { decrement,  increment } from '../store/reducers/cartSlice/cartSlice';
import { IProduct } from '../store/reducers/productsSlice/productsSlice';

function usePlusMinus() {
    const dispatch = useDispatch();
    const handleIncrement = (e: React.MouseEvent, product: IProduct) => {
        e.stopPropagation()
        dispatch(increment(product));
      };
    
    const handleDecrement = (e: React.MouseEvent, product: IProduct) => {
        e.stopPropagation()
        dispatch(decrement(product));
      };

    return { handleIncrement, handleDecrement }
}

export default usePlusMinus
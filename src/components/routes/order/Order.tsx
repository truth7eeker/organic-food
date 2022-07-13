import React, { useEffect, useRef } from 'react';
import styles from './Order.module.scss';
import arrow from '../../../assets/left-arrow.svg';
import expandArrow from '../../../assets/expand-arrow.svg';
import { useNavigate } from 'react-router-dom';
import useHover from '../../../hooks/useHover';
import OrderInfo from '../../order-info/OrderInfo';
import { useDispatch, useSelector } from 'react-redux';
import useDropDown from '../../../hooks/useDropDown';
import CartItems from '../../cart-items/CartItems';
import Input from '../../input/Input';
import PayCard from '../../pay-card/PayCard';
import { handleContactInfo, setCart } from '../../../store/reducers/orderSlice/orderSlice';
import Map from '../../map/MapGL';

function Order() {
  let navigate = useNavigate();
  const ref = useRef(null);
  const [isHovered] = useHover(ref);

  const handleNavigate = () => navigate(-1);

  const { isOpen, handleOpen } = useDropDown();

  const { items, totalPrice } = useSelector((state: any) => state.cart);
  const { name, phone } = useSelector((state: any) => state.order.user);
  const { addressLine, extraInfo } = useSelector((state: any) => state.order.address);
  const { number, fullName, cvv, month, year } = useSelector((state: any) => state.order.card);
  const { error } = useSelector((state: any) => state.order);

  const dispatch = useDispatch();

  const onContactChange = (name: string, value: string) => {
    dispatch(handleContactInfo({ name, value }));
  };

  let message = '';
  const displayMessage = () => {
    if (totalPrice < 1500) {
      message = 'Минимальная сумма заказа 1500 ₽';
    } else if (!name || !phone) {
      message = 'Заполните контактную информацию';
    } else if (phone.length !== 11 || error) {
      message = 'Похоже, введен неверный номер телефона';
    } else if (!number || !fullName || !year || !month || !cvv) {
      message = 'Заполните данные для оплаты';
    } else if (!addressLine || !extraInfo) {
      message = 'Заполните адрес для доставки';
    } else {
      return null;
    }
    return message;
  };

  useEffect(() => {
    dispatch(setCart(items));
  }, [items]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.back} ref={ref} onClick={handleNavigate}>
        <img src={arrow} className={isHovered ? styles.hovered : ''} />
        <span>Назад</span>
      </div>
      <div className={styles.grid}>
        <div>
          <h2>Оформление заказа</h2>
          <div className={`${styles.block} ${styles.cart__block}`} onClick={handleOpen}>
            <h3>Корзина({items.length})</h3>
            <img src={expandArrow} style={{ transform: isOpen ? 'rotate(180deg)' : '' }} />
            {isOpen && items.length ? (
              <div className={styles.cart__items}>
                <CartItems items={items}/>
              </div>
            ) : null}
          </div>
          <div className={styles.block}>
            <h3>Контактная информация</h3>
            <div className={styles.inputs}>
              <Input
                placeholder="Ваши имя и фамилия"
                color="#fff"
                handleChange={onContactChange}
                name="name"
                value={name}
              />
              <Input
                placeholder="Телефон"
                color="#fff"
                handleChange={onContactChange}
                name="phone"
                value={phone}
              />
            </div>
          </div>
          <div className={styles.block}>
            <h3>Оплата</h3>
            <PayCard />
          </div>
        </div>
        <div className={`${styles.block} ${styles.order__info}`}>
          <h3>Сумма заказа</h3>
          <OrderInfo margin="10" message={displayMessage} />
        </div>
        <div className={styles.block}>
          <h3>Адрес доставки</h3>
          <Map />
        </div>
      </div>
    </div>
  );
}

export default Order;

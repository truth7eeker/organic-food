import React from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/logo.png';
import basket from '../../assets/basket-icon.svg';
import Search from '../input/Input';
import Like from '../like-btn/Like';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import search from '../../assets/search-icon.svg';
import { setSearch } from '../../store/reducers/filterSlice/filterSlice';

function Header() {
  const { totalPrice } = useSelector((state: any) => state.cart);

  const location = useLocation();

  const dispatch = useDispatch()

  const hanldeSearchResults = (_:any, value:string) => {
    dispatch(setSearch({value}))
    
  }

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <img src={logo} alt="Organic Food" />
        <div>
          <div className={styles.brand}>ORGANIC FOOD</div>
          <div className={styles.motto}>фермерские продукты с доставкой</div>
        </div>
      </div>
      {(location.pathname === '/organic-food' ||
        location.pathname === '/organic-food/favourites') && (
        <>
          <div
            className={styles.center}
            style={{
              display: location.pathname === '/organic-food/favourites' ? 'none' : 'block',
            }}>
            <Search placeholder="Поиск продуктов..." img={search} handleChange={hanldeSearchResults} />
          </div>
          <div className={styles.right}>
            <div className={styles.basket}>
              <Link to="organic-food/cart">
                <img src={basket} />
                <span>{totalPrice > 0 && totalPrice} ₽</span>
              </Link>
            </div>
            <Link to="organic-food/favourites">
              <Like backgroundColor="rgba(244,244,244)" />
            </Link>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;

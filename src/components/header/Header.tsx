import React from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/logo.png';
import basket from '../../assets/basket-icon.svg';
import Search from '../search-bar/Search';
import Like from '../like-btn/Like';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const { totalPrice } = useSelector((state: any) => state.cart);

  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <img src={logo} alt="Organic Food" />
        <div>
          <div className={styles.brand}>ORGANIC FOOD</div>
          <div className={styles.motto}>фермерские продукты с доставкой</div>
        </div>
      </div>
      {location.pathname === '/organic-food' && (
        <>
          <div className={styles.center}>
            <Search />
          </div>
          <div className={styles.right}>
            <div className={styles.basket}>
              <Link to="organic-food/cart">
                <img src={basket} />
                <span>{totalPrice > 0 && totalPrice} ₽</span>
              </Link>
            </div>
            <Like />
          </div>
        </>
      )}
    </header>
  );
}

export default Header;

import React from 'react';
import styles from './Search.module.scss'
import search from '../../assets/search-icon.svg'

function Search() {
  return (
    <div className={styles.search__bar}>
      <label>
        <input placeholder='Поиск продуктов...' />
      </label>
      <div className={styles.search__icon}>
        <img src={search}/>
      </div>
    </div>
  );
}

export default Search;

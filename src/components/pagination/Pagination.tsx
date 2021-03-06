import React from 'react';
import styles from './Pagination.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../store/reducers/filterSlice/filterSlice';

function Pagination() {
  const { total, page, search } = useSelector((state: any) => state.filter);
  const { products } = useSelector((store: any) => store.products);
  // 8 products per page
  const pagesNum = Math.ceil(total / 8);
  const pagesArr = [];

  for (let i = 1; i <= pagesNum; i++) {
    pagesArr.push(i);
  }

  const dispatch = useDispatch();

  const handlePage = (num: number) => {
    dispatch(setPage(num));
  };

  return (
    <div style={{display: search && !products.length ? 'none' : 'block'}}>
      <ul className={styles.pagination}>
        {pagesArr.map((num) => (
          <li onClick={() => handlePage(num)} key={num} className={num === page ? styles.active : ''}>
            {num}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;

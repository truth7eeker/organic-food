import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IProduct } from '../../../store/reducers/productsSlice/productsSlice';
import Categories from '../../categories/Categories';
import Pagination from '../../pagination/Pagination';
import ProductCard from '../../product-card/ProductCard';
import SortMenu from '../../sort-menu/SortMenu';
import styles from './Products.module.scss';
import { getProducts } from '../../../store/reducers/productsSlice/fetchProducts';
import { store } from '../../../store/store';
import Skeleton from '../../skeleton/Skeleton';

function Products() {
  const dispatch = useDispatch<typeof store.dispatch>();
  const products = useSelector((store: any) => store.products.products);
  const { category, sort, page, search } = useSelector((state: any) => state.filter);
  const params = { category, sort, page, search };

  useEffect(() => {
    dispatch(getProducts(params));
  }, [category, sort, page, search]);

  return (
    <div>
      <div className={styles.header}>
        <Categories />
        <SortMenu />
      </div>
      <div className={styles.list}>
        {products.length ? products.map((product: IProduct) => (
          <ProductCard product={product} key={product.id} />
        )) : !products.length && search ? 'Ничего не найдено' :
      new Array(8).fill(<Skeleton />)}
      </div>
      <Pagination />
    </div>
  );
}

export default Products;

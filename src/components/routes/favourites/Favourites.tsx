import React from 'react';
import styles from '../products/Products.module.scss';
import { IProduct } from '../../../store/reducers/productsSlice/productsSlice';
import ProductCard from '../../product-card/ProductCard';
import { useSelector } from 'react-redux';
import EmptyList from '../../empty-list/EmptyList';
import shrugEmogi from '../../../assets/shrug-emogi.png';

function Favourites() {
  const { products } = useSelector((state: any) => state.products);
  const haveFavourites = products.filter((p: IProduct) => p.isFavourite).length;

  return (
    <>
      {haveFavourites ? (
        <div className={styles.list}>
          {products
            .filter((product: IProduct) => product.isFavourite)
            .map((favProduct: IProduct) => (
              <ProductCard product={favProduct} key={favProduct.id} />
            ))}
        </div>
      ) : (
        <EmptyList pic={shrugEmogi} />
      )}
    </>
  );
}

export default Favourites;

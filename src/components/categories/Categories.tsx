import React from 'react';
import styles from './Categories.module.scss';
import { setCategory } from '../../store/reducers/filterSlice/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

const categories = [
  { title: 'Все', category: '', total: 17 },
  { title: 'Овощи', category: 'vegetables', total: 5 },
  { title: 'Ягоды', category: 'berries', total: 3 },
  { title: 'Молочная продукция', category: 'diary', total: 3 },
  { title: 'Мясо', category: 'meat', total: 4 },
  { title: 'Зелень и салаты', category: 'greens', total: 2 },
];

function Categories() {
  const dispatch = useDispatch();

  const currCategory = useSelector((state: any) => state.filter.category);

  const handleCategory = (category: string, total:number) => {
    dispatch(setCategory({category, total}));
  };

  return (
    <div className={styles.categories}>
      <ul>
        {categories.map((item, i) => (
          <li
            key={i}
            onClick={() => handleCategory(item.category, item.total)}
            className={item.category === currCategory ? styles.active : ''}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;

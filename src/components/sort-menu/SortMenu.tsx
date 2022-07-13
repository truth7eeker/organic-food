import React, { useState, useRef } from 'react';
import styles from './SortMenu.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setSortOption } from '../../store/reducers/filterSlice/filterSlice'
import useHover from '../../hooks/useHover';

export interface IOption {
  title: string,
  sortBy: string,
  order: string
}

const options = [
  { title: 'По популярности', sortBy: 'rating', order: 'desc' },
  { title: 'По алфавиту', sortBy: 'title', order: 'ascend' },
  { title: 'Дороже', sortBy: 'price', order: 'desc' },
  { title: 'Дешевле', sortBy: 'price', order: 'ascend' },
];

function SortMenu() {
  const currSortOption = useSelector((state: any) => state.filter.sort.title);

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null)
  const [isHovered] = useHover(ref);

  const dispatch = useDispatch()

  const handleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleSortOption = (option:IOption) => {
    setIsOpen(!isOpen);
    dispatch(setSortOption(option))
  };

  return (
    <div className={styles.sort__menu}>
      <div
        onClick={handleDropDown}
        className={styles.option}
        ref={ref}>
        {currSortOption}
        <div className={isOpen ? styles.open : ''}>
          <svg
            style={{
              width: '1em',
              height: '1em',
              verticalAlign: 'middle',
              fill: isHovered ? '#57cc99' : 'black',
              overflow: 'hidden',
            }}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M873.7 406.62L545.94 734.39c-18.72 18.72-49.16 18.72-67.88 0L150.3 406.62c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L512 677.83l316.45-316.45c12.5-12.5 32.75-12.5 45.25 0 6.25 6.25 9.38 14.44 9.38 22.62s-3.13 16.38-9.38 22.62zM523.31 689.45v-0.31 0.31z" />
          </svg>
        </div>
      </div>
      <ul className={styles.dropdown} style={{ display: isOpen ? 'flex' : 'none' }}>
        {options.map((option, i) => (
          <li key={i} onClick={() => handleSortOption(option)}>
            {option.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SortMenu;

import React from 'react'
import { Link } from 'react-router-dom';
import styles from './EmptyList.module.scss'

function EmptyList({pic}: {pic: string}) {
  return (
    <div className={styles.empty__list}>
      <h2>Здесь пусто :(</h2>
      <img src={pic} />
      <Link to="/organic-food">
        <button>Назад к покупкам</button>
      </Link>
    </div>
  )
}

export default EmptyList
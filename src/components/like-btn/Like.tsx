import React, { useState } from 'react';
import styles from './Like.module.scss';
import heart from '../../assets/favorite.svg';
import heartBorder from '../../assets/favorite-border.svg';

function Like() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  return (
    <div className={styles.heart} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <img src={isHovered ? heart : heartBorder} />
    </div>
  );
}

export default Like;

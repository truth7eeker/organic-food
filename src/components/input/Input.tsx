import React from 'react';
import styles from './Input.module.scss';

interface IInput {
  placeholder?: string;
  img?: string;
  value?: string;
  color?: string;
  label?: string;
  type?: string;
  maxlength?: number;
  margin?: string;
  handleClick?: any;
  refProp?: any;
  name?: string;
  handleChange?: any;
  width?: string;
}

function Input({
  placeholder,
  img,
  value,
  label,
  maxlength,
  margin,
  handleClick,
  refProp,
  name,
  handleChange,
  width
}: IInput) {
  return (
    <div className={styles.input__wrapper} style={{width}}>
      <label>
        {label}
        <input
          placeholder={placeholder}
          type="text"
          maxLength={maxlength}
          style={{marginTop: margin + 'px' }}
          onClick={handleClick}
          ref={refProp}
          name={name}
          value={value}
          onChange={(e) => handleChange(name, e.target.value)}
        />
      </label>
      <div className={styles.input__icon} style={{ display: img ? 'block' : 'none' }}>
        <img src={img} />
      </div>
    </div>
  );
}

export default Input;

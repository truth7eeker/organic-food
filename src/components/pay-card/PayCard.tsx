import React, { useRef, useState } from 'react';
import styles from './PayCard.module.scss';
import chip from '../../assets/chip.png';
import mir from '../../assets/mir.png';
import visa from '../../assets/visa.png';
import mastercard from '../../assets/mastercard.png';
import Input from '../input/Input';
import { hanldeCardInfo } from '../../store/reducers/orderSlice/orderSlice';
import { useDispatch, useSelector } from 'react-redux';

const months = ['Month', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

function PayCard() {

  const calcYears = () => {
    let years: Array<any> = ['Year', new Date().getFullYear()];
    for (let i = 1; i < 10; i++) {
      years.push(years[years.length - 1] + 1);
    }
    return years;
  };

  const [focusedField, setFocusedField] = useState('number');
  const [isFlipped, setIsFlipped] = useState(false)

  const numRef: any = useRef(null);
  const fullNameRef: any = useRef(null);
  const expirationMonthRef: any = useRef(null);
  const expirationYearRef: any = useRef(null);
  const cvvRef: any = useRef(null);

  const handleFocus = (field: string, ref?: any) => {
    setFocusedField(field);
    if (field === 'cvv') {
      setIsFlipped(true)
    } else {
      setIsFlipped(false)
    }
    if (ref === expirationMonthRef && month) {
      expirationYearRef.current.focus();
    } else {
      ref && ref.current.focus();
    }
  };

  const dispatch = useDispatch();

  const { number, fullName, month, year, cvv } = useSelector((state: any) => state.order.card);

  const onCardChange = (name: string, value: string) => {
    dispatch(hanldeCardInfo({ name, value }));
  };

  const cardLogo = () => {
    let firstNum = number[0];
    if (firstNum == 2) {
      return mir;
    } else if (firstNum == 5) {
      return mastercard;
    } else {
      return visa;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card} style={{transform: isFlipped ? 'rotateY(180deg)' : ''}}>
        <div className={styles.card__front}>
          <div className={styles.top}>
            <img src={chip} />
            <img src={cardLogo()} />
          </div>
          <div
            className={`${styles.center} ${focusedField === 'number' && styles.focus__border}`}
            onClick={() => handleFocus('number', numRef)}>
            {number
              ? number.split('').map((num: string, i: number) => (
                  <span key={i} className={(i + 1) % 4 === 0 ? styles.spaced__num : ''}>
                    {num}
                  </span>
                ))
              : '#### #### #### ####'}
          </div>
          <div className={styles.bottom}>
            <div
              className={focusedField === 'fullName' ? styles.focus__border : ''}
              onClick={() => handleFocus('fullName', fullNameRef)}>
              {fullName ? fullName : 'FULL NAME'}
            </div>
            <div
              className={focusedField === 'expiration' ? styles.focus__border : ''}
              onClick={() => handleFocus('expiration', expirationMonthRef)}>
              {month ? month : 'MM'} / {year ? year.slice(-2) : 'YY'}
            </div>
          </div>
        </div>
        <div className={styles.card__back}>
          <div className={styles.top}></div>
          <div className={styles.center}>
            <div className={styles.cvv__title}>CVV</div>
            <div className={styles.cvv__line}>{cvv ? cvv : '***'}</div>
          </div>
          <div className={styles.bottom}>
            <img src={cardLogo()} />
          </div>
        </div>
      </div>
      <div className={styles.inputs}>
        <Input
          label="Card Number"
          maxlength={16}
          margin="6"
          handleClick={() => handleFocus('number')}
          refProp={numRef}
          name="number"
          handleChange={onCardChange}
          value={number}
        />
        <Input
          label="Full Name"
          margin="6"
          handleClick={() => handleFocus('fullName')}
          refProp={fullNameRef}
          name="fullName"
          handleChange={onCardChange}
          value={fullName}
        />
        <div>
          <label>Valid thru</label>
          <div className={styles.expiration}>
            <select
              onClick={() => handleFocus('expiration')}
              ref={expirationMonthRef}
              onChange={(e) => onCardChange('month', e.target.value)}
              defaultValue="Month">
              {months.map((month) => (
                <option key={month} disabled={month === 'Month' && true}>
                  {month}
                </option>
              ))}
            </select>
            <select
              onClick={() => handleFocus('expiration')}
              ref={expirationYearRef}
              onChange={(e) => onCardChange('year', e.target.value)}
              defaultValue="Year">
              {calcYears().map((year) => (
                <option key={year} disabled={year === 'Year' && true}>
                  {year}
                </option>
              ))}
            </select>
            <Input
              placeholder="CVV"
              maxlength={3}
              handleClick={() => handleFocus('cvv')}
              refProp={cvvRef}
              name="cvv"
              handleChange={onCardChange}
              value={cvv}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PayCard;

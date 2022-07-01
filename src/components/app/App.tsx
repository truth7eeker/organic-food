import React from 'react';
import Header from '../header/Header';
import styles from './App.module.scss';
import Routing from '../routes/Routes';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.wrapper}>
        <Header />
        <main className={styles.main}>
          <Routing />
        </main>
      </div>
    </div>
  );
}

export default App;

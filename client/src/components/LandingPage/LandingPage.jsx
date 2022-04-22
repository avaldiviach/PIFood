import React from 'react';
import style from './LandingPage.module.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <main className={style.landing}>
      <h1>Bienvenidos</h1>
      <Link to='/home'>Ir al Home</Link>
    </main>
  )
}

export default LandingPage;
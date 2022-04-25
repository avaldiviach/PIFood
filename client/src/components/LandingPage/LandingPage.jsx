import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';

function LandingPage() {

  return (
    <main className={style.landing} >
      <h1>Bienvenidos</h1>
      <Link to='/home'>Ingresar</Link>
    </main>
  )
}

export default LandingPage;
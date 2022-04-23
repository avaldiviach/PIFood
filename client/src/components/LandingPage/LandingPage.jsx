import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';
import { getAllRecipes, getAllDiets} from '../../redux/action';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function LandingPage() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDiets());
    console.log('Llenado de dietas');
  }, []);

  useEffect(() => {
    dispatch(getAllRecipes());
    console.log('Llenado de recetas');
  }, []);
  
  return (
    <div className={style.landing} >
      <h1>Bienvenidos</h1>
      <Link to='/home'>Ingresar</Link>
    </div>
  )
}

export default LandingPage;
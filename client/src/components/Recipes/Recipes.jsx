import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/action';
import RecipesCard from '../RecipesCard/RecipesCard';
import style from './Recipes.module.css';

function Recipes() {

  const recipes = useSelector(state => state.allRecipes);
  const currentPage = useSelector(state => state.currentPage);
  const recipePerPage = 9;
  const [recipePage, setRecipePage] = useState(recipes?.slice(0, recipePerPage));
  const dispatch = useDispatch();

  function prev() {
    if (currentPage > 1) dispatch(setCurrentPage(currentPage - 1));
  }

  function next() {
    if (currentPage < Math.ceil(recipes?.length / recipePerPage)) dispatch(setCurrentPage(currentPage + 1));
  }

  useEffect(() => {
    const render = (currentPage - 1) * recipePerPage;
    setRecipePage(recipes?.slice(render, render + recipePerPage));
    // eslint-disable-next-line
  }, [currentPage, recipes]);

  return (
    <>
      <h2>Recetas</h2>
      {
        recipes?.length
          ? <div className={style.recipes}>
            {
              recipePage?.length
                ? recipePage.map(r => <RecipesCard key={r.id} recipe={r} />)
                : <h2>Cargando información</h2>
            }
          </div>
          : <h2>No hay ninguna coincidencia</h2>
      }
      <hr />
      <button onClick={prev} >Anterior</button> <span>{currentPage}</span> <button onClick={next} >Siguiente</button>
    </>
  )
}

export default Recipes;
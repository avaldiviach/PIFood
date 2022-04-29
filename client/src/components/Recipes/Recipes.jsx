import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipesCard from '../RecipesCard/RecipesCard';
import style from './Recipes.module.css';
import { setCurrentPage } from '../../redux/action';

function Recipes() {

  const recipes = useSelector(state => state.allRecipes);
  const currentPage = useSelector(state => state.currentPage);
  const dispatch = useDispatch();
  //const [currentPage, setCurrentPage] = useState(1);
  const [recipePerPage, setRecipePerPage ] = useState(9);
  const [recipePage, setRecipePage] = useState(recipes.slice(0, recipePerPage));

  function prev() {
    if (currentPage > 1) dispatch(setCurrentPage(currentPage - 1));
    setRecipePage(recipes.slice((currentPage - 1) * recipePerPage, recipePerPage * currentPage));
  }

  function next() {
    if (currentPage < Math.ceil(recipes.length / recipePerPage)) dispatch(setCurrentPage(currentPage + 1));
    setRecipePage(recipes.slice((currentPage - 1) * recipePerPage, recipePerPage * currentPage));
  }

   useEffect(() => {
    setRecipePage(recipes.slice((currentPage - 1) * recipePerPage, recipePerPage * currentPage));
    // eslint-disable-next-line
  });

  return (
    <>
      <h2>Recetas</h2>
      {recipes.length === 0 ? <h2>No hay ninguna coincidencia</h2> : <div className={style.recipes}>
        {
          recipes?.length > 0
            ? recipePage?.map(r => <RecipesCard key={r.id} recipe={r} />)
            : <h2>Cargando información</h2>
        }
      </div>}
      <hr />
      <button onClick={prev} >Anterior</button> <span>{currentPage}</span> <button onClick={next} >Siguiente</button>
    </>
  )
}

export default Recipes;
import { useSelector } from 'react-redux';
import RecipesCard from '../RecipesCard/RecipesCard';
import SearchBar from '../SearchBar/SearchBar';
import style from './Recipes.module.css';

function Recipes() {

  const recipes = useSelector(state => state.allRecipes);

  return (
    <>
      <SearchBar />
      <h2>Recetas</h2>
      <div className={style.recipes}>
        {
          recipes?.length > 0 
          ? recipes?.map(r => <RecipesCard key={r.id} recipe={r} />) 
          : <h2>Cargando información</h2>
        }
      </div>
    </>
  )
}

export default Recipes;
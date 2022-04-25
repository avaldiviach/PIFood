import { Link } from 'react-router-dom';
import style from './RecipesCard.module.css';

function RecipesCard({ recipe }) {
  const { id, name, image, diets, score } = recipe;
  return (
    <div className={style.recipe}>
      <Link to={`/recipe/detail/${id}`}><h3 className={style.title} >{name}</h3>
      <img src={image} alt={`Imagen del platillo "${name}"`} title={name} />
      </Link>
      <h3>Puntuación</h3>
      <span>{score}</span>
      <h3>Tipo de dieta</h3>
      {diets.map(({id, name}) => <code key={id}><b>{name} </b>{id < diets.length ? `- ` : ``}</code>)}
    </div>
  )
}

export default RecipesCard;
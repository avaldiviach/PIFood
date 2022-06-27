import { Link } from 'react-router-dom';
import style from './RecipesCard.module.css';

function RecipesCard({ recipe }) {
  const { id, name, image, diets, healthy, price } = recipe;
  const formatter = new Intl.ListFormat('en', {
    style: 'long',
    type: 'conjunction'
  });
  
  return (
    <div className={style.recipe}>
      <Link to={`/recipe/detail/${id}`}><h3 className={style.title} >{name}</h3>
      <img src={image} alt={`Imagen del platillo "${name}"`} title={name} />
      </Link>
      <h3>Nivel de Comida Saludable</h3>
      <span>{healthy}</span>
      <h3 className={style.span} >Tipo de dieta</h3>
      <div className={style.listDiet} >{formatter.format(diets.map(e => e.name))}</div>
      <h3>Precio</h3>
      <span>{price}</span>
    </div>
  )
}

export default RecipesCard;
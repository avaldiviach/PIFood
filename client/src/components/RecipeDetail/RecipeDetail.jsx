import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailRecipe } from '../../redux/action';
import NavBar from "../NavBar/NavBar";
import style from './RecipeDetail.module.css';

function RecipeDetail() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector(state => state.recipeDetail);

  useEffect(() => {
    dispatch(getDetailRecipe(id));
  }, [dispatch,id]);

  return (
    <>
      <NavBar />
      <div className={style.detail}>
        <h1>{detail.name}</h1>
        <img src={detail.image} alt={`Foto de la receta "${detail.name}"`} className={style.imagen} />
        <h3>Reseña de la Receta</h3>
        <p>{detail.recipe}</p>
        <h3>Tipos de Platos</h3>
        {detail.dishType?.length > 0 && detail.dishType.map((p, i) => <li key={i}>{p}</li>)}
        <h3>Tipos de Dietas</h3>
        {detail.diets?.length > 0 && detail.diets.map((d, i) => <li key={i}>{d.name}</li>)}
        <h3>Puntuación</h3><span>{detail.score}</span>/100
        <h3>Nivel de Comida Saludable</h3><span>{detail.healthy}</span>/100
      </div>
    </>
  )
}

export default RecipeDetail;
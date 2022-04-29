import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes, getFilterByDiets, getFilterByOrigin, setCurrentPage, orderRecipes } from '../../redux/action';
import style from './FilterBar.module.css';

function FilterBar() {

  const [filter, setFilter] = useState({
    diet: "",
    origin: "",
    order: ""
  });

  const diets = useSelector(state => state.allDiets);
  const dispatch = useDispatch();

  function change(e) {
    setFilter(filter => ({
      ...filter, [e.target.name]: e.target.value
    }));
  }

  useEffect(() => {
    dispatch(setCurrentPage(1));
    // eslint-disable-next-line
  }, [filter]);

  useEffect(() => {
    if (filter.diet) {
      dispatch(getFilterByDiets(filter.diet));
    }
    // eslint-disable-next-line
  }, [filter.diet]);

  useEffect(() => {
    if (filter.origin !== "") {
      dispatch(getFilterByOrigin(filter.origin));
    }
    // eslint-disable-next-line
  }, [filter.origin]);

  useEffect(() => {
    if (filter.order) {
      dispatch(orderRecipes(filter.order));
    }
    // eslint-disable-next-line
  }, [filter.order]);

  return (
    <div className={style.filter} >
      <input type='button' onClick={() => {dispatch(setCurrentPage(1)); dispatch(getAllRecipes())}} value='Mostrar todas las Recetas' />
      <label> Filtrar por: </label>
      <label htmlFor="diet">Dietas </label>
      <select name='diet' id='diet' value={filter.diet} onChange={change} >
        <option value=""> - elegir - </option>
        {diets?.map(({ id, name }) => <option key={id} value={name}>{name}</option>)}
      </select>
      <label htmlFor="origin">Origen </label>
      <select name='origin' id='origin' value={filter.origin} onChange={change} >
        <option value=""> - elegir - </option>
        <option value={false}>API</option>
        <option value={true}>Creados</option>
      </select>
      <label htmlFor="order">Ordenar </label>
      <select name='order' id='order' value={filter.order} onChange={change} >
        <option value=""> - elegir - </option>
        <option value='1'>Alfabéticamente - ASC</option>
        <option value='2'>Alfabéticamente - DESC</option>
        <option value='3'>Puntuación - ASC</option>
        <option value='4'>Puntuación - DESC</option>
      </select>
    </div>
  )
}

export default FilterBar;
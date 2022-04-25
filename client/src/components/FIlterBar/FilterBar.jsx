import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes, getFilterByDiets, getFilterByOrigin } from '../../redux/action';
import style from './FilterBar.module.css';

function FilterBar() {

  const [filter, setFilter] = useState({
    diet: "",
    origin: "",
  });

  const diets = useSelector(state => state.allDiets);
  const dispatch = useDispatch();

  function change(e) {
    setFilter(filter => ({
      ...filter, [e.target.name]: e.target.value
    }));
  }

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

  return (
    <div className={style.filter} >
      <input type='button' onClick={() => dispatch(getAllRecipes())} value='Mostrar todas las Recetas' />
      <label> Filtrar por: </label>
      <label htmlFor="diet">Dietas </label>
      <select name='diet' id='diet' value={filter.diet} onChange={change} >
        <option> - elegir - </option>
        {diets?.map(({ id, name }) => <option key={id} value={name}>{name}</option>)}
      </select>
      <label htmlFor="origin">Origen </label>
      <select name='origin' id='origin' value={filter.origin} onChange={change} >
        <option> - elegir - </option>
        <option value={false}>API</option>
        <option value={true}>Creados</option>
      </select>
    </div>
  )
}

export default FilterBar;
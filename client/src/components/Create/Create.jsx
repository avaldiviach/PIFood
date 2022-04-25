import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from './Create.module.css';
import { addRecipe, getAllRecipes } from '../../redux/action';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import dishes from '../../resources/dishes';

function Create() {

  const valuesInitial = {
    name: "",
    recipe: "",
    image: "",
    dishType: [],
    score: 50,
    healthy: 50,
    dietType: []
  };

  const [input, setInput] = useState(valuesInitial)
  const [submitForm, setSubmitForm] = useState(false);

  const diets = useSelector(state => state.allDiets);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function change(e) {
    setInput(input => {
      if (Array.isArray(input[e.target.name])) return ({
        ...input,
        [e.target.name]: [...input[e.target.name], e.target.name === 'dietType' ? Number(e.target.value) : e.target.value]
      });
      return ({
        ...input,
        [e.target.name]: e.target.value
      })
    });
  }

  function submit(e) {
    e.preventDefault();
    console.log('Enviado', input);
    setSubmitForm(true);
    dispatch(addRecipe(input));
    setInput(valuesInitial)
    navigate('/formOk');
  }

  function cleanup(e) {
    e.preventDefault();
    setInput(valuesInitial)
  }

  useEffect(() => {
    dispatch(getAllRecipes());
    // eslint-disable-next-line
  }, [submitForm])

  return (
    <>
      <NavBar />
      <div className={style.form} >
        <h2>Formulario para Registrar nuevas recetas</h2>
        <form onSubmit={submit}>
          <label>Nombre de la Receta</label>
          <input type='text' name='name' value={input.name} size='40' onChange={change} />
          <label>Reseña de la Receta</label>
          <textarea name='recipe' rows='10' value={input.recipe} onChange={change} />
          <label>URL de la Imagen</label>
          <input type='url' name='image' value={input.image} onChange={change} />
          <label>Puntuación</label><span>{input.score}</span>
          <input type='range' name='score' value={input.score} onChange={change} className={style.range} />
          <label>Nivel de Saludable</label><span>{input.healthy}</span>
          <input type='range' name='healthy' value={input.healthy} onChange={change} className={style.range} />
          <label>Tipo de Platos</label>
          <select name='dishType' value={input.dishType} size='14' multiple onChange={change}>
            {dishes?.map((d,i) => <option key={i} value={d}>{d}</option>)}
          </select>
          <label>Tipo de Dieta</label>
          <select name='dietType' value={input.dietType} size='11' multiple onChange={change} >
            {diets && diets.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <button onClick={cleanup}>Limpiar campos</button>
          {input.name && input.recipe && input.dietType?.length > 0 && <button>Enviar datos</button>}
        </form>
      </div>
    </>
  )
}

export default Create;
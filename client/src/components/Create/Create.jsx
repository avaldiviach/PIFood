import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addRecipe } from '../../redux/action';
import style from './Create.module.css';
import NavBar from '../NavBar/NavBar';
import dishes from '../../resources/dishes';

function validate(input) {
  let errorObj = {};

  errorObj.name = (!/^[A-Za-z\sÁáÉéÍíÓóÚú]{10,255}$/.test(input.name) || input.name === "")
    ? "Ingresar un nombre de 10 caracteres hasta 255 entre letras mayúsculas y minísculas."
    : ""

  errorObj.recipe = (!/^[a-zA-Z\s%!"\u0028-\u0029\u002C-\u003BÁáÉéÍíÓóÚú]{10,255}$/.test(input.recipe) || input.recipe === "")
    ? "Ingresar una reseña de 10 caracteres hasta 255 entre letras, números y signos de puntuación"
    : ""

  errorObj.image = input.image === "" ?? null ? "" : (!/^(https?:\/\/){1}([\da-z.-]+).([a-z.]{2,6})([/\w .-]*)*\/?$/.test(input.image))
    ? "Ingresar una URL válida.Ejemplo: http://......."
    : ""

  errorObj.dietType = (input.dietType.length > 0)
    ? ""
    : "Debe seleccionar por lo menos un tipo de dieta";

  return errorObj;
}

function Create() {

  const valuesInitial = {
    name: "",
    recipe: "",
    image: null,
    dishType: [],
    //score: "50",
    healthy: "50",
    dietType: [],
    steps: []
  };

  const [input, setInput] = useState(valuesInitial)
  const [error, setError] = useState("");

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
    let errors = validate({
      ...input,
      [e.target.name]: typeof e.target.name === 'string' ? e.target.value : [new Set(...e.target.value)]
    }, setInput);
    setError(error => error = errors);
  }

  async function submit(e) {
    e.preventDefault();
    console.log('Enviado', input);
    const existe = await fetch(`http://localhost:3001/recipes?name=${input.name}`)
      .then(res => res.json())
    if (!Object.values(error).every(e => e === "") || typeof error === 'string') return alert("Faltan llenar campos obligatorios");
    const inputs = document.querySelectorAll(`.${style.inputStep}`);
    const valuesInput = Object.values(inputs).map(e => e.value);
    if (!existe.message) return alert("Ya existe una receta con este nombre");
    dispatch(addRecipe({ ...input, steps: valuesInput.filter(e => e !== "") }));
    setInput(valuesInitial)
    navigate('/formOk');
  }

  function cleanup(e) {
    e.preventDefault();
    setInput(valuesInitial)
  }

  function addStep(e) {
    e.preventDefault();
    const inputs = document.querySelectorAll(`.${style.inputStep}`);
    const valuesInput = Object.values(inputs).map(e => e.value);
    if (valuesInput.some(e => e === "")) return alert("No puede agregar un paso en blanco");
    if (inputs.length > 0) {
      if (!/^[a-zA-Z\s%!"\u0028-\u0029\u002C-\u003BÁáÉéÍíÓóÚú]{5,255}$/.test(inputs.item(inputs.length - 1).value)) return alert('Los pasos solo pueden contener letras, números y signos de puntuación');
      inputs.item(inputs.length - 1).readOnly = true;
    }
    const step = document.createElement('input');
    step.type = 'text';
    step.className = style.inputStep;
    if (inputs.length > 0) setInput({ ...input, steps: [...valuesInput] });
    document.querySelector('#steps').appendChild(step);
  }

  return (
    <>
      <NavBar />
      <div className={style.form} >
        <h2>Formulario para Registrar nuevas recetas</h2>
        <form onSubmit={submit}>
          <label>Nombre de la Receta<sup title='Campo requerido'> (*)</sup></label>
          <input type='text' name='name' value={input.name} size='40' onChange={change} />
          <label></label>{error.name ? (<h5>{error.name}</h5>) : (<h5> </h5>)}
          <label>Reseña de la Receta<sup title='Campo requerido'> (*)</sup></label>
          <textarea name='recipe' rows='10' value={input.recipe} onChange={change} />
          <label></label>{error.recipe ? <h5>{error.recipe}</h5> : <h5> </h5>}
          <label>URL de la Imagen<sup title='Campo requerido'> (*)</sup></label>
          <input type='url' name='image' value={input.image} onChange={change} />
          <label></label>{error.image ? <h5>{error.image}</h5> : <h5> </h5>}
         {/*  <label>Puntuación</label><span>{input.score}</span>
          <input type='range' name='score' value={input.score} onChange={change} className={style.range} /> */}
          <label>Nivel de Saludable</label><span>{input.healthy}</span>
          <input type='range' name='healthy' value={input.healthy} onChange={change} className={style.range} />
          <label>Tipo de Platos</label>
          <select name='dishType' value={input.dishType} size='14' multiple onChange={change}>
            {dishes?.map((d, i) => <option key={i} value={d}>{d}</option>)}
          </select>
          <label>Tipo de Dieta<sup title='Campo requerido. Seleccione al menos una opción'> (*)</sup></label>
          <select name='dietType' value={input.dietType} size='11' multiple onChange={change} >
            {diets && diets.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <label></label>{error.dietType ? <h5>{error.dietType}</h5> : <h5> </h5>}
          <section id='steps' className={style.steps} >
            <label>Agregar pasos <button onClick={addStep} >+</button></label>
            {console.log(error)}
          </section>
          <button onClick={cleanup}>Limpiar campos</button>
          <button /* disabled={!Object.values(error).every(e => e === "") || typeof error === 'string'} */>Enviar datos</button>
        </form>
      </div>
    </>
  )
}

export default Create;
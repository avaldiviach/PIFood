import { Link } from 'react-router-dom';

function DataSent() {
  return (
    <div>
      <h2>Datos enviados correctamente</h2>
      <button><Link to='/home'>Ir al Home</Link></button> {" "}
      <button><Link to='/create'>Crear otro receta</Link></button>
    </div>
  )

}

export default DataSent;
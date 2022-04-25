import { Link } from "react-router-dom";
// eslint-disable-next-line
import style from './PageNotFound.module.css';

function PageNotFound() {
  return (
    <>
      <h2>Página no encontrada</h2>
      <h4><Link to='/home' >Ir al Home</Link></h4>
    </>
  )
}

export default PageNotFound;
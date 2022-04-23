import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <>
      <h2>Página no encontrada</h2>
      <Link to='/home' >Ir al Home</Link>
    </>
  )
}

export default PageNotFound;
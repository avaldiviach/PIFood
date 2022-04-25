import { NavLink } from 'react-router-dom';
// eslint-disable-next-line
import style from './NavBar.module.css';

function NavBar() {
  return (
    <nav>
      <NavLink to='/home' >Home</NavLink> {' | '}
      <NavLink to='/create' >Crear Receta</NavLink>
    </nav>
  )
}

export default NavBar;
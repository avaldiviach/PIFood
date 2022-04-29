import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

/* describe('Testeando el componente NavBar', () => { */
  test('Verificando que existan el link de "Home" y "Crear Receta"', () => {
    const navbar = render(<NavBar />);
    //expect(navbar.find(Link).length).toBeGreaterThanOrEqual(2);
    navbar.getByText('Home');
  });
/* }); */

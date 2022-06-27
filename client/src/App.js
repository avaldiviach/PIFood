import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { getAllRecipes, getAllDiets } from './redux/action';
import './App.css';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import Create from './components/Create/Create';
import DataSent from './components/DataSent/DataSent';
import PageNotFound from './components/PageNotFound/PageNotFound';

const LandingPage = lazy(() => import('./components/LandingPage/LandingPage'));
const Home = lazy(() => import('./components/Home/Home'));

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDiets());
    console.log('Llenado de dietas');
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(getAllRecipes());
    console.log('Llenado de recetas');
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Suspense fallback={<h3>...Cargando</h3>}><LandingPage /></Suspense>} />
        <Route path='/home' element={<Suspense fallback={<h3>...Cargando</h3>}><Home /></Suspense>} />
        <Route path='/recipe/detail/:id' element={<RecipeDetail />} />
        <Route path='/create' element={<Create />} />
        <Route path='/formOk' element={<DataSent />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
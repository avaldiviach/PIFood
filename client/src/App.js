import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import Create from './components/Create/Create';
import PageNotFound from './components/PageNotFound/PageNotFound';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllRecipes, getAllDiets } from './redux/action';
import DataSent from './components/DataSent/DataSent';

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
    <>
      <div className="App">
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/recipe/detail/:id' element={<RecipeDetail />} />
          <Route path='/create' element={<Create />} />
          <Route path='/formOk' element={<DataSent />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

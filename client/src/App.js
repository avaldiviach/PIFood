import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import PageNotFound from './components/PageNotFound/PageNotFound';
//import { useEffect } from 'react';
//import { useDispatch } from 'react-redux';
//import { getAllRecipes, getAllDiets } from './redux/action';

function App() {

  //const dispatch = useDispatch();

/*   useEffect(() => {
    dispatch(getAllDiets());
  }, []) */

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;

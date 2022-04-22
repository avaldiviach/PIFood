import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
       {/*  <Route path='/country/detail/:id' element={<CountryDetail />} /> */}
        <Route path='*' element={<><h2>Ruta no disponible</h2><a href='/home'>Ir a Home</a></>} />
      </Routes>
    </div>
  );
}

export default App;

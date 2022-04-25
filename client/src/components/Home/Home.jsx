import FilterBar from "../FIlterBar/FilterBar";
import NavBar from "../NavBar/NavBar";
import Recipes from "../Recipes/Recipes";
import style from './Home.module.css';

function Home() {
  return (
    <div className={style.main}>
      <NavBar />
      <FilterBar />
      <Recipes />
    </div>
  )
}

export default Home;
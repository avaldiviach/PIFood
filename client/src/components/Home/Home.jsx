import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";
import FilterBar from "../FIlterBar/FilterBar";
import Recipes from "../Recipes/Recipes";
import style from './Home.module.css';

function Home() {
  return (
    <div className={style.main}>
      <NavBar />
      <SearchBar />
      <FilterBar />
      <Recipes />
    </div>
  )
}

export default Home;
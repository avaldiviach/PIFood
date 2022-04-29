import { useState } from "react";
import { useDispatch } from "react-redux";
import style from './SearchBar.module.css';
import { getSearchRecipe, setCurrentPage } from '../../redux/action';

function SearchBar() {

    const [query, setQuery] = useState("");
    const dispatch = useDispatch();

    function change(e) {
        setQuery(query => query = e.target.value);
    }

function validate() {
    if(!query) alert('Níngun valor ingresado en el campo de búsqueda. No puede estar vacío');
    return !!query;
}

    function buscar(e) {
        e.preventDefault();
        console.log('buscando', query);
        if(validate(query)) {
            dispatch(setCurrentPage(1));
            dispatch(getSearchRecipe(query));
        }
        setQuery("");
    }

    return (
        <form onSubmit={buscar} className={style.search} >
            <input type='search' value={query} onChange={change} />
            <button>Buscar</button>
        </form>
    )
}

export default SearchBar;
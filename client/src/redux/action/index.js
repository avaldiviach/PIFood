import { GET_ALL_RECIPES, GET_ALL_DIETS, RECIPE_DETAIL, SEARCH_RECIPES, FILTER_BY_DIETS, FILTER_BY_ORIGIN } from "../../constants"

export const getAllRecipes = () => dispatch => {
  return fetch(`http://localhost:3001/recipes/all`)
    .then(resp => resp.json())
    .then(data => dispatch({
      type: GET_ALL_RECIPES,
      payload: data
    }))
    .catch(e => console.log(e))
}

export const getAllDiets = () => dispatch => {
  return fetch(`http://localhost:3001/diets`)
    .then(resp => resp.json())
    .then(data => dispatch({
      type: GET_ALL_DIETS,
      payload: data
    }))
    .catch(e => console.log(e))
}

export const addRecipe = (inputForm) => dispatch => {
  return fetch(`http://localhost:3001/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputForm)
  })
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      dispatch(getAllRecipes())
    })
    .catch(e => console.log(e))
}

export const getDetailRecipe = (id) => dispatch => {
  return fetch(`http://localhost:3001/recipes/${id}`)
    .then(resp => resp.json())
    .then(data => dispatch({
      type: RECIPE_DETAIL,
      payload: data
    }))
    .catch(e => console.log(e))
}

export const getSearchRecipe = (query) => dispatch => {
  return fetch(`http://localhost:3001/recipes/?name=${query}`)
    .then(resp => resp.json())
    .then(data => dispatch({
      type: SEARCH_RECIPES,
      payload: data
    }))
    .catch(e => console.log(e))
}

export const getFilterByDiets = (dietType) => ({
  type: FILTER_BY_DIETS,
  payload: dietType
});

export const getFilterByOrigin = (origin) => ({
  type: FILTER_BY_ORIGIN,
  payload: JSON.parse(origin)
});
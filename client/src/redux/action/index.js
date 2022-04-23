import { GET_ALL_RECIPES, GET_ALL_DIETS } from "../../constants"

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

/* module.exports = {
  getAllRecipes,
  getAllDiets
} */
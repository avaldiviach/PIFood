import { GET_ALL_RECIPES, GET_ALL_DIETS } from "../../constants"

const initialState = {
  allRecipes: [],
  recipeDetail: {},
  allDiets: [],
  filtered: [],
  search: []
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_ALL_RECIPES: return ({
      ...state,
      allRecipes: action.payload
    });
    case GET_ALL_DIETS: return ({
      ...state,
      allDiets: action.payload
    });
    default: return state;
  }
}

export default reducer;
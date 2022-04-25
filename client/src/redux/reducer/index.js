import { GET_ALL_RECIPES, GET_ALL_DIETS, RECIPE_DETAIL, SEARCH_RECIPES, FILTER_BY_DIETS, FILTER_BY_ORIGIN } from "../../constants"

const initialState = {
  allRecipes: [],
  recipeDetail: {},
  allDiets: [],
  filtered: [],
  search: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_RECIPES: return ({
      ...state,
      allRecipes: action.payload
    });
    case GET_ALL_DIETS: return ({
      ...state,
      allDiets: action.payload
    });
    case RECIPE_DETAIL: return ({
      ...state,
      recipeDetail: action.payload
    });
    case SEARCH_RECIPES: return ({
      ...state,
      allRecipes: action.payload,
      search: action.payload
    });
    case FILTER_BY_DIETS:
      state.filtered = state.allRecipes.filter(({ diets }) => diets.some(({ name }) => name === action.payload));
      console.log(action.payload)
      return ({
        ...state,
        allRecipes: state.filtered,
      });
    case FILTER_BY_ORIGIN:
      state.filtered = state.allRecipes.filter( r => r.created === action.payload);
      return ({
        ...state,
        allRecipes: state.filtered,
      });
    default: return state;
  }
}

export default reducer;
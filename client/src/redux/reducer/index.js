import { GET_ALL_RECIPES, GET_ALL_DIETS, RECIPE_DETAIL, SEARCH_RECIPES, FILTER_BY_DIETS, FILTER_BY_ORIGIN, SET_CURRENT_PAGE, ORDER_RECIPES } from "../../constants"

const initialState = {
  allRecipes: [],
  recipeDetail: {},
  allDiets: [],
  filtered: [],
  search: [],
  currentPage: 1
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
      return ({
        ...state,
        allRecipes: state.filtered,
      });
    case FILTER_BY_ORIGIN:
      state.filtered = state.allRecipes.filter(r => r.created === action.payload);
      return ({
        ...state,
        allRecipes: state.filtered,
      });
    case SET_CURRENT_PAGE:
      return ({
        ...state,
        currentPage: action.payload,
      });
    case ORDER_RECIPES:
      let order = [...state.allRecipes];
      order = (action.payload === 1) ?
        order.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
        : (action.payload === 2) ?
          order.sort((a, b) => b.name.toLowerCase() > a.name.toLowerCase() ? 1 : -1)
          : (action.payload === 3) ?
            order.sort((a, b) => a.healthy - b.healthy)
            : order.sort((a, b) => b.healthy - a.healthy)
      return ({
        ...state,
        allRecipes: order
      });
    default: return state;
  }
}

export default reducer;
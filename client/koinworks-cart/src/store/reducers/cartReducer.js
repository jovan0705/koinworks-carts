import { SET_ITEMS, SET_ITEMS_ERROR, SET_ITEMS_LOADING } from "../actionTypes"

const cartState = {
    items: [],
    isLoading: false,
    errors: null
}

function cartReducer(state=cartState, action) {
    switch (action.type) {
      case SET_ITEMS:
        return { ...state, items: action.payload}
      case SET_ITEMS_LOADING:
        return { ...state, isLoading: action.payload}
      case SET_ITEMS_ERROR:
        return { ...state, errors: action.payload}
      default:
        return state
    }
  }

export default cartReducer
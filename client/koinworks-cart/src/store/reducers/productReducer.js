import { SET_PRODUCTS, SET_PRODUCT_ERROR, SET_PRODUCT_LOADING } from "../actionTypes"

const productState = {
    products : [],
    isLoading: false,
    errors: null
}

function productReducer(state=productState, action) {
    switch (action.type) {
      case SET_PRODUCTS:
        return { ...state, products: action.payload}
      case SET_PRODUCT_LOADING:
        return { ...state, isLoading: action.payload}
      case SET_PRODUCT_ERROR:
        return { ...state, errors: action.payload}
      default:
        return state
    }
  }

export default productReducer
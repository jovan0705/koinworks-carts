import { SET_PRODUCT_LOADING, SET_ITEMS_LOADING, SET_ITEMS_ERROR, SET_PRODUCT_ERROR, SET_PRODUCTS, SET_ITEMS } from "../actionTypes"
import axios from 'axios'

const setProductLoading = (payload) => {
    return({type: SET_PRODUCT_LOADING, payload})
}

const setItemsLoading = (payload) => {
    return({type: SET_ITEMS_LOADING, payload})
}

const setItemsError = (payload) => {
    return { type: SET_ITEMS_ERROR, payload };
}

const setProductError = (payload) => {
    return { type: SET_PRODUCT_ERROR, payload };
}

const setProduct = (payload) => {
    return {type: SET_PRODUCTS, payload}
}

const setItems = (payload) => {
    return {type: SET_ITEMS, payload}
}

export const fetchAllProduct = () => {
    return async (dispatch) => {
        dispatch(setProductLoading(true))
        dispatch(setProductError(null))
        try {
            const products = await axios.get('http://localhost:3000/products')
            dispatch(setProduct(products.data))
        } catch (err) {
            dispatch(setProductError(err))
        } finally {
            dispatch(setProductLoading(false))
        }
    }
}

export const fetchMyItems = () => {
    return async (dispatch) => {
        dispatch(setItemsLoading(true))
        dispatch(setItemsError(null))
        try {
            const items = await axios.get('http://localhost:3000/carts/items')
            dispatch(setItems(items.data))
        } catch (err) {
            dispatch(setItemsError(err))
        } finally {
            dispatch(setItemsLoading(false))
        }
    }
}

export const addItem = (id) => {
    return async (dispatch) => {
        dispatch(setItemsLoading(true))
        dispatch(setItemsError(null))
        try {
            const data = await axios.post(`http://localhost:3000/carts/product/${id}`)
            return data.data
        } catch (err) {
            // dispatch(setItemsError(err))
            return err
        } finally {
            dispatch(setItemsLoading(false))
        }
    }
}

export const removeItem = (id) => {
    return async (dispatch) => {
        dispatch(setItemsLoading(true))
        dispatch(setItemsError(null))
        try {
            const data = await axios.delete(`http://localhost:3000/carts/product/${id}`)
            return data.data
        } catch (err) {
            // dispatch(setItemsError(err))
            return err
        } finally {
            dispatch(setItemsLoading(false))
        }
    }
}

export const increaseItem = (id) => {
    return async (dispatch) => {
        dispatch(setItemsLoading(true))
        dispatch(setItemsError(null))
        try {
            const data = await axios.patch(`http://localhost:3000/carts/product/${id}/increase`)
            console.log(data)
            return data.data
        } catch (err) {
            // console.log(err.response.data.message)
            // dispatch(setItemsError(err))
            return err
        } finally {
            dispatch(setItemsLoading(false))
        }
    }
}

export const decreaseItem = (id) => {
    return async (dispatch) => {
        dispatch(setItemsLoading(true))
        dispatch(setItemsError(null))
        try {
            const data = await axios.patch(`http://localhost:3000/carts/product/${id}/decrease`)
            return data.data
        } catch (err) {
            // dispatch(setItemsError(err))
            return err
        } finally {
            dispatch(setItemsLoading(false))
        }
    }
}
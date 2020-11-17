import { createStore, combineReducers, applyMiddleware, Store } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import { productListReducer, productDetailReducer } from './Reducers/productReducers'
import { cartReducer } from './Reducers/cartReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems') as string)
  : []

const initialState = {
  cart: { cartItems: cartItemsFromStorage }
}

const middlewares = [thunk]

const store: Store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)))

export default store

export type ReducerState = ReturnType<typeof reducer>

import { createStore, combineReducers, applyMiddleware, Reducer, Store } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import { productListReducer, productDetailReducer } from './Reducers/productReducers'

const reducer: Reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer
})

const initialState = {}

const middlewares = [thunk]

const store: Store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)))

export default store

export type ReducerState = ReturnType<typeof reducer>

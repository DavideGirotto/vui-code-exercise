import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './reducers/search/'
import productsReducer from './reducers/products/'

export const store = configureStore({
  reducer: {
    search: searchReducer,
    products: productsReducer
  }
})

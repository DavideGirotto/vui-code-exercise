import { configureStore } from '@reduxjs/toolkit'
import searchBarReducer from '../components/searchBar/searchBarSlice'

export const store = configureStore({
  reducer: {
    searchBar: searchBarReducer
  }
})

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { get, serverUrl } from '../../app/utils'

const initialState = {
  currentSearchTerm: '',

  autocompleteSuggestions: [],
  isFetchingAutocomplete: false,
  autocompleteRequestId: null,

  categorySuggestions: ['Top Picks', 'Deals Of The Day', 'Appliances', 'Bath', 'Outdoor Power Equipment', 'Grills', 'Seasonal Decor', 'Tools', 'Kitchen', 'Lighting And Ceiling Fans', 'Lawn & Garden', 'Paint', 'Fire Pits & Patio Heaters'],

  productsSuggestions: [],
  isFetchingProducts: false,
  productsRequestId: null,

  searchResults: [],
  isFetchingResults: false,
  searchRequestId: null,

  error: null
}

export const getSearchResults = createAsyncThunk(
  'results/get',
  async (context, { getState, requestId, dispatch, rejectWithValue }) => {
    const { searchRequestId, isFetchingResults } = getState().searchBar

    if (!isFetchingResults || requestId !== searchRequestId) return

    try {
      const response = await get(`${serverUrl}/search_query`)
      return response
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    resetSearch: () => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(getSearchResults.pending, (state, action) => {
        if (state.isFetchingResults === false) {
          state.isFetchingResults = true
          state.searchRequestId = action.meta.requestId
        }
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (state.isFetchingResults === true && state.searchRequestId === requestId) {
          state.isFetchingResults = false
          state.searchResults = action.payload || {}
          state.searchRequestId = null
        }
      })
      .addCase(getSearchResults.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.isFetchingResults === true && state.searchRequestId === requestId) {
          state.isFetchingResults = false
          state.error = action.error.message
          state.searchRequestId = null
        }
      })
  }
})

export const { resetSearch } = searchBarSlice.actions

export const selectSearchResults = (state) => state.searchResults

export default searchBarSlice.reducer

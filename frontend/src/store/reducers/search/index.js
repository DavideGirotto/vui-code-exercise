import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { get, serverUrl } from '../../utils'

const initialState = {
  currentSearchTerm: '',

  autocompleteSuggestions: [],
  isFetchingAutocomplete: false,
  autocompleteRequestId: null,

  categoriesSuggestions: [
    'Top Picks',
    'Deals Of The Day',
    'Appliances',
    'Bath',
    'Outdoor Power Equipment',
    'Grills',
    'Seasonal Decor',
    'Tools',
    'Kitchen',
    'Lighting And Ceiling Fans',
    'Lawn & Garden',
    'Paint',
    'Fire Pits & Patio Heaters'
  ],

  results: [],
  isFetchingResults: false,
  searchRequestId: null,

  error: null
}

export const getSearchResults = createAsyncThunk(
  'results/get',
  async (context, { getState, requestId, dispatch, rejectWithValue }) => {
    const { searchRequestId, isFetchingResults } = getState().search

    if (!isFetchingResults || requestId !== searchRequestId) return

    try {
      const response = await get(`${serverUrl}/search_query`)
      return response
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const searchSlice = createSlice({
  name: 'search',
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
          state.results = action.payload || {}
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

export const { resetSearch } = searchSlice.actions

export const selectSearchResults = (state) => state.search.results
export const selectCategoriesSuggestions = (state) => state.search.categoriesSuggestions

export default searchSlice.reducer

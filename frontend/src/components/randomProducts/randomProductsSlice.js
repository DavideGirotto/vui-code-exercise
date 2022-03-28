import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { get, serverUrl } from '../../app/utils'

const initialState = {
  data: [],
  isFetchingProducts: false,
  productsRequestId: null,
  error: null
}

export const getRandomProducts = createAsyncThunk(
  'products/get',
  async (context, { getState, requestId, dispatch, rejectWithValue }) => {
    const { productsRequestId, isFetchingProducts } = getState().randomProducts
    if (!isFetchingProducts || requestId !== productsRequestId) return

    try {
      const response = await get(`${serverUrl}/search_query`)
      return response
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const randomProductsSlice = createSlice({
  name: 'randomProducts',
  initialState,
  reducers: {
    resetProducts: () => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(getRandomProducts.pending, (state, action) => {
        if (state.isFetchingProducts === false) {
          state.isFetchingProducts = true
          state.productsRequestId = action.meta.requestId
        }
      })
      .addCase(getRandomProducts.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (state.isFetchingProducts === true && state.productsRequestId === requestId) {
          state.isFetchingProducts = false

          if (action.payload) {
            for (let i = 0; i < 8; i++) {
              state.data.push(action.payload[Math.floor((Math.random() * 9))])
            }
          } else {
            state.data = []
          }
          state.productsRequestId = null
        }
      })
      .addCase(getRandomProducts.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.isFetchingProducts === true && state.productsRequestId === requestId) {
          state.isFetchingProducts = false
          state.error = action.error.message
          state.productsRequestId = null
        }
      })
  }
})

export const { resetProducts } = randomProductsSlice.actions

export const selectRandomProducts = state => state.randomProducts.data
export const selectFetchingProducts = state => state.isFetchingProducts
export default randomProductsSlice.reducer

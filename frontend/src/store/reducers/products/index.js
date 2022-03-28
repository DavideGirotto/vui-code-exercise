import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { get, serverUrl } from '../../utils'

const initialState = {
  data: [],
  isFetchingProducts: false,
  productsRequestId: null,
  error: null
}

export const getProducts = createAsyncThunk(
  'products/get',
  async (context, { getState, requestId, dispatch, rejectWithValue }) => {
    const { productsRequestId, isFetchingProducts } = getState().products
    if (!isFetchingProducts || requestId !== productsRequestId) return

    try {
      const response = await get(`${serverUrl}/search`)
      return response
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProducts: () => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        if (state.isFetchingProducts === false) {
          state.isFetchingProducts = true
          state.productsRequestId = action.meta.requestId
        }
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (state.isFetchingProducts === true && state.productsRequestId === requestId) {
          state.isFetchingProducts = false

          if (action.payload) {
            for (let i = 0; i < 3; i++) {
              state.data.push(action.payload[Math.floor((Math.random() * 9))])
            }
          } else {
            state.data = []
          }
          state.productsRequestId = null
        }
      })
      .addCase(getProducts.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.isFetchingProducts === true && state.productsRequestId === requestId) {
          state.isFetchingProducts = false
          state.error = action.error.message
          state.productsRequestId = null
        }
      })
  }
})

export const { resetProducts } = productsSlice.actions

export const selectProducts = state => state.products.data
export const selectFetchingProducts = state => state.isFetchingProducts
export default productsSlice.reducer

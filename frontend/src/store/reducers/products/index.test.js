import { store } from '../..'
import { getProducts, resetProducts } from '.'
import { get } from '../../utils'
import dataset from '../../../../../backend/datasets/searchResults.json'

jest.setTimeout(15 * 1000)

describe('Products API', () => {
  afterEach(() => {
    store.dispatch(resetProducts())
  })

  it('fetches featured products correctly', async () => {
    get.mockResolvedValueOnce(dataset)

    const thunk = store.dispatch(getProducts())

    let state = store.getState()
    expect(state.products.isFetchingProducts).toBeTruthy()

    await thunk

    state = store.getState()
    expect(state.products.isFetchingProducts).toBeFalsy()
    expect(state.products.data).not.toEqual([])
    expect(state.products.data.length).toEqual(3)
  })

  it('fails to fetch products', async () => {
    get.mockRejectedValue({
      error: {
        message: 'Not Found'
      }
    })

    const thunk = store.dispatch(getProducts())

    let state = store.getState()
    expect(state.products.isFetchingProducts).toBeTruthy()

    await thunk

    state = store.getState()
    expect(state.products.isFetchingProducts).toBeFalsy()
    expect(state.products.error).toEqual('Rejected')
  })
})

import { cleanup, screen } from '@testing-library/react'
import { store } from './store'
import { resetProducts } from './store/reducers/products'
import { getSearchResults, resetSearch } from './store/reducers/search'
import { get } from './store/utils'
import { initApp, searchDataset } from './testUtils'

describe('App test', () => {
  beforeEach(() => {
    initApp()
  })

  afterEach(() => {
    cleanup()
    store.dispatch(resetProducts())
    store.dispatch(resetSearch())
  })

  it('shows the logo', () => {
    const logo = screen.getByAltText('logo')

    expect(logo).toBeVisible()
  })

  it('shows the search bar', () => {
    const searchBar = screen.getByTestId('search-bar')

    expect(searchBar).toBeVisible()
  })

  it('shows the featured products at the start', () => {
    const title = screen.getByText('Featured Products')
    const products = screen.getAllByTestId('product-card')

    expect(title).toBeVisible()
    expect(products.length).toEqual(3)
  })

  it.only('shows the search results instead of the featured products', async () => {
    get.mockResolvedValueOnce(searchDataset)
    let title = screen.getByText('Featured Products')
    const products = screen.getAllByTestId('product-card')

    expect(title).toBeVisible()
    expect(products.length).toEqual(3)

    await store.dispatch(getSearchResults())

    title = screen.getByText('Search Results')

    expect(title).toBeVisible()
  })
})

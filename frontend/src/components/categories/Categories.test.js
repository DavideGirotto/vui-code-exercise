import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react'
import { resetSearch } from '../../store/reducers/search'
import { store } from '../../store'
import { initApp } from '../../testUtils'

describe('Categories test', () => {
  beforeEach(() => {
    initApp()
  })

  afterEach(() => {
    cleanup()
    store.dispatch(resetSearch())
  })

  it('shows all categories', () => {
    const categories = store.getState().search.categoriesSuggestions
    const searchField = screen.getByTestId('search-bar-input')

    fireEvent.focus(searchField)

    categories.forEach(c => {
      const category = screen.getByText(c)
      expect(category).toBeVisible()
    })
  })

  it('on category click, search field gets populated', async () => {
    const categories = store.getState().search.categoriesSuggestions
    let searchField = screen.getByTestId('search-bar-input')

    fireEvent.focus(searchField)

    const category = screen.getByText(categories[0])

    fireEvent.click(category)

    await waitFor(() => {
      searchField = screen.getByTestId('search-bar-input')
      expect(searchField.value).toEqual(categories[0])
    })
  })
})

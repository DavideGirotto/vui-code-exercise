import { store } from '../..'
import { getAutocompleteSuggestions, getSearchResults, resetSearch } from '.'
import { get } from '../../utils'
import searchDataset from '../../../../../backend/datasets/searchResults.json'
import autocompleteDataset from '../../../../../backend/datasets/autocompleteSuggestions.json'

jest.setTimeout(15 * 1000)

describe('SearchResults API', () => {
  afterEach(() => {
    store.dispatch(resetSearch())
  })

  it('fetches search results correctly', async () => {
    get.mockResolvedValueOnce(searchDataset)

    const thunk = store.dispatch(getSearchResults())

    let state = store.getState()
    expect(state.search.isFetchingResults).toBeTruthy()

    await thunk

    state = store.getState()
    expect(state.search.isFetchingResults).toBeFalsy()
    expect(state.search.results).not.toEqual([])
    expect(state.search.results.length).toEqual(searchDataset.length)
  })

  it('fails to fetch search results', async () => {
    get.mockRejectedValue({
      error: {
        message: 'Not Found'
      }
    })

    const thunk = store.dispatch(getSearchResults())

    let state = store.getState()
    expect(state.search.isFetchingResults).toBeTruthy()

    await thunk

    state = store.getState()
    expect(state.search.isFetchingResults).toBeFalsy()
    expect(state.search.error).toEqual('Rejected')
  })
})

describe('Autocomplete API', () => {
  afterEach(() => {
    store.dispatch(resetSearch())
  })

  it('fetches search results correctly', async () => {
    get.mockResolvedValueOnce(autocompleteDataset)

    const thunk = store.dispatch(getAutocompleteSuggestions())

    let state = store.getState()
    expect(state.search.isFetchingAutocomplete).toBeTruthy()

    await thunk

    state = store.getState()
    expect(state.search.isFetchingAutocomplete).toBeFalsy()
    expect(state.search.autocompleteSuggestions).not.toEqual([])
    expect(state.search.autocompleteSuggestions.length).toEqual(autocompleteDataset.length)
  })

  it('fails to fetch search results', async () => {
    get.mockRejectedValue({
      error: {
        message: 'Not Found'
      }
    })

    const thunk = store.dispatch(getAutocompleteSuggestions())

    let state = store.getState()
    expect(state.search.isFetchingAutocomplete).toBeTruthy()

    await thunk

    state = store.getState()
    expect(state.search.isFetchingAutocomplete).toBeFalsy()
    expect(state.search.error).toEqual('Rejected')
  })
})

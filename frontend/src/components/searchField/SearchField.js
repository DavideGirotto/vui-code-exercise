
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAutocompleteSuggestions,
  getSearchResults,
  resetSearch,
  selectSearchBarStatus,
  selectSearchText,
  setSearchBarStatus,
  setSearchText
} from '../../store/reducers/search'
import { CloseIconWrapper, InputWrapper, SearchIconWrapper, StyledInputBase } from './SearchField.styles'

export default function SearchField () {
  const dispatch = useDispatch()
  const status = useSelector(selectSearchBarStatus)
  const searchText = useSelector(selectSearchText)

  const handleReset = () => {
    dispatch(resetSearch())
  }

  const handleSearch = () => {
    dispatch(setSearchBarStatus('closed'))
    dispatch(getSearchResults())
  }

  const handleFocus = () => {
    if (window.innerWidth <= 899) { document.getElementsByTagName('body')[0].style.overflow = 'hidden' }
    searchText === '' ? dispatch(setSearchBarStatus('open')) : dispatch(setSearchBarStatus('expanded'))
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(setSearchBarStatus('closed'))
    dispatch(getSearchResults())
  }

  const handleTextChange = value => {
    dispatch(setSearchBarStatus('expanded'))
    dispatch(setSearchText(value))
    dispatch(getAutocompleteSuggestions(value))
  }

  return (
    <InputWrapper sx={status !== 'closed' ? { border: '2px solid #264990' } : {}}>
      <form onSubmit={handleSubmit}>
        <StyledInputBase
          inputProps={{ 'data-testid': 'search-bar-input' }}
          placeholder='Search for a product or brand…'
          value={searchText}
          onFocus={handleFocus}
          onChange={e => handleTextChange(e.target.value)}
          onSubmit={handleSearch}
        />
      </form>

      {searchText !== '' &&
        <CloseIconWrapper size='small' onClick={handleReset}>
          <CloseIcon fontSize='small' />
        </CloseIconWrapper>}

      <SearchIconWrapper onClick={handleSearch}>
        <SearchIcon />
      </SearchIconWrapper>
    </InputWrapper>

  )
}

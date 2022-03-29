import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import Backdrop from '@mui/material/Backdrop'
import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { getAutocompleteSuggestions, getSearchResults, resetSearch } from '../../store/reducers/search'
import SearchSuggestions from '../searchSuggestions/SearchSuggestions'
import { AvailabilityFilter, CloseIconWrapper, SearchContainer, SearchField, SearchIconWrapper, SearchWrapper, StyledInputBase } from './SearchBar.styles'
import Categories from '../categories/Categories'

export default function SearchBar () {
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const [status, setStatus] = useState('closed')
  const [availabilityFilter, setAvailabilityFilter] = useState(false)

  const closeSearchBar = () => {
    if (window.innerWidth <= 899) { document.getElementsByTagName('body')[0].style.overflow = 'auto' }
    setStatus('closed')
  }

  const handleReset = () => {
    closeSearchBar()
    setSearchText('')
    dispatch(resetSearch())
  }

  const handleSearch = () => {
    closeSearchBar()
    dispatch(getSearchResults(availabilityFilter))
  }

  const handleFocus = () => {
    if (window.innerWidth <= 899) { document.getElementsByTagName('body')[0].style.overflow = 'hidden' }
    searchText === '' ? setStatus('open') : setStatus('expanded')
  }

  const handleSubmit = e => {
    e.preventDefault()
    closeSearchBar()
    dispatch(getSearchResults(availabilityFilter))
  }

  const handleTextChange = value => {
    setStatus('expanded')
    setSearchText(value)
    dispatch(getAutocompleteSuggestions(value))
  }

  const handleSuggestionClick = value => {
    setSearchText(value)
    closeSearchBar()
    dispatch(getSearchResults(value))
    dispatch(getAutocompleteSuggestions(value))
  }

  return (
    <SearchContainer>
      <SearchWrapper elevation={status !== 'closed' ? 3 : 0}>
        <SearchField sx={status !== 'closed' ? { border: '2px solid #264990' } : {}}>
          <form onSubmit={handleSubmit}>
            <StyledInputBase
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
        </SearchField>

        <AvailabilityFilter>
          <FormControlLabel
            control={
              <Checkbox
                checked={availabilityFilter}
                onChange={e => setAvailabilityFilter(e.target.checked)}
              />
            }
            label='Show only available products'
          />
        </AvailabilityFilter>

        {status === 'open' && <Categories handleSuggestionClick={handleSuggestionClick} />}

        {status === 'expanded' && <SearchSuggestions handleSuggestionClick={handleSuggestionClick} />}
      </SearchWrapper>

      <Backdrop
        sx={{ color: '#fff', zIndex: 1 }}
        open={status !== 'closed'}
        onClick={closeSearchBar}
      />
    </SearchContainer>
  )
}

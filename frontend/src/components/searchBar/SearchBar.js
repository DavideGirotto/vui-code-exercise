import Backdrop from '@mui/material/Backdrop'
import SearchSuggestions from '../searchSuggestions/SearchSuggestions'
import { SearchContainer, SearchWrapper } from './SearchBar.styles'
import Categories from '../categories/Categories'
import AvailabilityFilter from '../availabilityFilter/AvailabilityFilter'
import SearchField from '../searchField/SearchField'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAutocompleteSuggestions,
  getSearchResults,
  selectSearchBarStatus,
  setSearchBarStatus,
  setSearchText
} from '../../store/reducers/search'

export default function SearchBar () {
  const dispatch = useDispatch()
  const status = useSelector(selectSearchBarStatus)

  useEffect(() => {
    if (status === 'closed' && window.innerWidth <= 899) { document.getElementsByTagName('body')[0].style.overflow = 'auto' }
  }, [status])

  const handleSuggestionClick = value => {
    dispatch(setSearchText(value))
    dispatch(setSearchBarStatus('closed'))
    dispatch(getSearchResults())
    dispatch(getAutocompleteSuggestions(value))
  }

  return (
    <SearchContainer data-testid='search-bar'>
      <SearchWrapper elevation={status !== 'closed' ? 3 : 0}>

        <SearchField />

        <AvailabilityFilter />

        {status === 'open' && <Categories handleClick={handleSuggestionClick} />}

        {status === 'expanded' && <SearchSuggestions handleClick={handleSuggestionClick} />}
      </SearchWrapper>

      <Backdrop
        sx={{ color: '#fff', zIndex: 1 }}
        open={status !== 'closed'}
        onClick={() => dispatch(setSearchBarStatus('closed'))}
      />
    </SearchContainer>
  )
}

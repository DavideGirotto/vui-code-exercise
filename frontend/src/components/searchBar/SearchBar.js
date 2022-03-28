import { styled, alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import Backdrop from '@mui/material/Backdrop'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAutocompleteSuggestions, getSearchResults, selectAutocompleteSuggestions, selectCategoriesSuggestions } from '../../store/reducers/search'

const SearchContainer = styled(Box)({
  position: 'relative',
  minHeight: '75px',
  maxHeight: '560px'
})

const SearchWrapper = styled(Paper)({
  position: 'absolute',
  borderRadius: '32px',
  padding: '16px',
  width: 'calc(100% - 32px)',
  border: '1px solid #f5f5f5',
  zIndex: 10
})

const SearchField = styled(Box)(({ theme }) => ({
  position: 'relative',
  border: '2px solid #c4c4c4',
  borderRadius: '32px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  width: '100%',
  overflow: 'hidden',
  transition: '250ms'
}))

const SearchIconWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 3, 0, 2),
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'right',
  transition: '200ms',
  top: 0,
  right: 0,
  cursor: 'pointer',
  '&:hover': {
    background: theme.palette.primary.dark
  }
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  minHeight: '44px',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 2),
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%'
  }
}))

const AvailabilityFilter = styled(FormGroup)(({ theme }) => ({
  display: 'inline-block',
  marginTop: '8px',
  marginLeft: '16px',
  '& .MuiCheckbox-root': {
    marginRight: '4px'
  },
  '& svg': {
    color: '#c4c4c4'
  },
  '& .Mui-checked svg': {
    color: theme.palette.primary.main
  }
}))

const CategoriesContainer = styled(Box)({
  marginTop: '16px',
  textAlign: 'center'
})

const Category = styled(Chip)({
  marginRight: '8px',
  marginBottom: '8px',
  cursor: 'pointer',
  height: '44px',
  fontSize: '14px'
})

const Autocomplete = styled(Grid)({
  marginTop: '8px'
})

const AutocompleteItem = styled(Box)(({ theme }) => ({
  padding: '16px',
  cursor: 'pointer',
  borderRadius: '16px',
  transition: '300ms',
  '&:hover': {
    background: 'rgba(0, 0, 0, 0.08)',
    color: theme.palette.primary.main
  }
}))

export default function SearchBar () {
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const [status, setStatus] = useState('closed')
  const categories = useSelector(selectCategoriesSuggestions)
  const autocompleteSuggestions = useSelector(selectAutocompleteSuggestions)

  const handleSearch = () => {
    dispatch(getSearchResults())
  }

  const handleTextChange = value => {
    setStatus('expanded')
    setSearchText(value)
    dispatch(getAutocompleteSuggestions(value))
  }

  const handleSuggestionClick = value => {
    setSearchText(value)
    setStatus('closed')
  }

  return (
    <SearchContainer>
      <SearchWrapper elevation={status !== 'closed' ? 3 : 0}>
        <SearchField sx={status !== 'closed' ? { border: '2px solid #264990' } : {}}>
          <StyledInputBase
            placeholder='Search for a product or brand…'
            value={searchText}
            onFocus={() => searchText === '' ? setStatus('open') : setStatus('expanded')}
            onChange={e => handleTextChange(e.target.value)}
          />

          <SearchIconWrapper onClick={handleSearch}>
            <SearchIcon />
          </SearchIconWrapper>
        </SearchField>

        <AvailabilityFilter>
          <FormControlLabel control={<Checkbox />} label='Show only available products' />
        </AvailabilityFilter>

        {status === 'open' &&
          <CategoriesContainer>
            {categories.map((category, index) => (
              <Category key={index} label={category} onClick={() => handleSuggestionClick(category)} />
            ))}
          </CategoriesContainer>}

        {status === 'expanded' &&
          <Autocomplete container>
            <Grid item xs={12} sm={6}>
              {autocompleteSuggestions.map((s, index) => <AutocompleteItem key={index} onClick={() => handleSuggestionClick(s.name)}>{s.name}</AutocompleteItem>)}
            </Grid>

            <Grid item xs={12} sm={6} />
          </Autocomplete>}
      </SearchWrapper>

      <Backdrop
        sx={{ color: '#fff', zIndex: 1 }}
        open={status !== 'closed'}
        onClick={() => setStatus('closed')}
      />
    </SearchContainer>
  )
}

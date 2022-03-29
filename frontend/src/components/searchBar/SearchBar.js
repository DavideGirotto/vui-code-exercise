import { styled, alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Backdrop from '@mui/material/Backdrop'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAutocompleteSuggestions, getSearchResults, resetSearch, selectAutocompleteSuggestions, selectCategoriesSuggestions } from '../../store/reducers/search'
import { selectProducts } from '../../store/reducers/products'

const SearchContainer = styled(Box)({
  position: 'relative',
  minHeight: '75px',
})

const SearchWrapper = styled(Paper)({
  position: 'absolute',
  borderRadius: '32px',
  padding: 16,
  width: 'calc(100% - 32px)',
  border: '1px solid #f5f5f5',
  maxHeight: '560px',
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

const CloseIconWrapper = styled(IconButton)({
  position: 'absolute',
  top: 8,
  right: 80,
})

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
  marginLeft: 16,
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
  marginTop: 16,
  textAlign: 'center'
})

const Category = styled(Chip)({
  marginRight: '8px',
  marginBottom: '8px',
  cursor: 'pointer',
  height: '44px',
  fontSize: '14px'
})

const Suggestions = styled(Grid)({
  marginTop: '8px'
})

const AutocompleteItem = styled(Box)(({ theme }) => ({
  padding: 16,
  cursor: 'pointer',
  borderRadius: 16,
  transition: '300ms',
  '&:hover': {
    background: 'rgba(0, 0, 0, 0.08)',
    color: theme.palette.primary.main
  }
}))

const Product = styled(ListItem)(({ theme }) => ({
  alignItems: 'stretch', 
  columnGap: 20,
  padding: 16,
  borderRadius: 16,
  cursor: 'pointer',
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
  const products = useSelector(selectProducts)

  const handleReset = () => {
    setStatus('closed')
    setSearchText('')
    dispatch(resetSearch())
  }

  const handleSearch = () => {
    setStatus('closed')
    dispatch(getSearchResults())
  }

  const handleSubmit = e => {
    e.preventDefault()
    setStatus('closed')
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
              onFocus={() => searchText === '' ? setStatus('open') : setStatus('expanded')}
              onChange={e => handleTextChange(e.target.value)}
              onSubmit={handleSearch}
            />
          </form>

          {searchText !== '' && <CloseIconWrapper size="small" onClick={handleReset}>
            <CloseIcon fontSize="small"/>
          </CloseIconWrapper>}

          <SearchIconWrapper onClick={handleSearch} >
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
          <Suggestions container>
            <Grid item xs={12} sm={6}>
              {autocompleteSuggestions.map((s, index) => <AutocompleteItem key={index} onClick={() => handleSuggestionClick(s.name)}>{s.name}</AutocompleteItem>)}
            </Grid>

            <Grid item xs={12} sm={6} component={List} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 0}}>
              {products.map((p, index) => (
                <Product key={index} >
                  <ListItemAvatar>
                    <Avatar 
                      variant="rounded" 
                      src={p.imageUrl} 
                      alt={p.description}
                      sx={{ border: '1px solid #eee', width: 96, height: 96 }}
                    />
                  </ListItemAvatar>
                  <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box>
                      <Typography sx={{fontSize: 14}}>{p.description.length <= 40 ? p.description : p.description.substring(0, 37) + '...'}</Typography>
                    </Box>

                    <Box>
                      <Typography sx={{fontSize: 16, padding:'8px 0', fontWeight:800}}>{p.price}</Typography>
                    </Box>

                    <Box sx={{display: 'flex', flexGrow: 1, alignItems: 'flex-end', fontSize: 12}}>
                      <Grid container>
                        <Grid item xs={4}><strong>Aisle:</strong> {p.aisle}</Grid>
                        <Grid item xs={4}><strong>Bay:</strong> {p.bay}</Grid>
                        <Grid item xs={4}><strong>Qty:</strong> {p.availability}</Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Product>
              ))}
            </Grid>
          </Suggestions>
        
        }
      </SearchWrapper>

      <Backdrop
        sx={{ color: '#fff', zIndex: 1 }}
        open={status !== 'closed'}
        onClick={() => setStatus('closed')}
      />
    </SearchContainer>
  )
}

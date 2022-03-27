import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import Backdrop from '@mui/material/Backdrop'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const SearchContainer = styled(Box)({
  position: 'relative',
  minHeight: '75px'
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

export default function SearchBar () {
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const [status, setStatus] = useState('closed')
  const categories = ['Top Picks', 'Deals Of The Day', 'Appliances', 'Bath', 'Outdoor Power Equipment', 'Grills', 'Seasonal Decor', 'Tools', 'Kitchen', 'Lighting And Ceiling Fans', 'Lawn & Garden', 'Paint', 'Fire Pits & Patio Heaters']

  const handleTextChange = value => {
    setStatus('expanded')
    setSearchText(value)
  }

  return (
    <SearchContainer>
      <SearchWrapper elevation={status !== 'closed' ? 3 : 0}>
        <SearchField sx={status !== 'closed' ? { border: '2px solid #264990' } : {}}>
          <StyledInputBase
            placeholder='Search…'
            value={searchText}
            onFocus={() => setStatus('open')}
            onChange={e => handleTextChange(e.target.value)}
          />
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        </SearchField>

        {status === 'open' &&
          <CategoriesContainer>
            {categories.map((category, index) => (
              <Category key={index} label={category} onClick={() => handleTextChange(category)} />
            ))}
          </CategoriesContainer>}

        {status === 'expanded' &&
          <Box>
            test
          </Box>}
      </SearchWrapper>

      <Backdrop
        sx={{ color: '#fff', zIndex: 1 }}
        open={status !== 'closed'}
        onClick={() => setStatus('closed')}
      />
    </SearchContainer>
  )
}

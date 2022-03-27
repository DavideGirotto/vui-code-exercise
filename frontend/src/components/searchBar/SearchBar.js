import { styled, alpha } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const useStyle = makeStyles({
  header: {
    margin: '64px 0'
  }
})

const SearchField = styled('div')(({ theme }) => ({
  position: 'relative',
  border: '2px solid #c4c4c4',
  borderRadius: '32px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  width: '100%',
  overflow: 'hidden',
  transition: '250ms'
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 3, 0, 2),
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'right',
  top: 0,
  right: 0
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 2),
    // vertical padding + font size from searchIcon
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%'
  }
}))

export default function SearchBar () {
  const classes = useStyle()
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const [status, setStatus] = useState('closed')

  const handleTextChange = value => {
    setStatus('expanded')
    setSearchText(value)
  }

  return (
    <Box>
      <SearchField sx={status !== 'closed' ? { border: '2px solid #264990' } : {}}>
        <StyledInputBase
          placeholder='Search…'
          value={searchText}
          onFocus={() => setStatus('open')}
          onBlur={() => setStatus('closed')}
          onChange={e => handleTextChange(e.target.value)}
        />
        <SearchIconWrapper>
          <SearchIcon />

        </SearchIconWrapper>
      </SearchField>
    </Box>
  )
}

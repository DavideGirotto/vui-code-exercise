import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import InputBase from '@mui/material/InputBase'
import FormGroup from '@mui/material/FormGroup'

export const SearchContainer = styled(Box)({
  position: 'relative',
  minHeight: '75px'
})

export const SearchWrapper = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '32px',
  padding: 16,
  width: 'calc(100% - 32px)',
  border: '1px solid #f5f5f5',
  maxHeight: '460px',
  zIndex: 10,
  overflowY: 'auto',
  overflowX: 'hidden',
  [theme.breakpoints.up('md')]: {
    maxHeight: '560px'
  }
}))

export const SearchField = styled(Box)(({ theme }) => ({
  position: 'relative',
  border: '2px solid #c4c4c4',
  borderRadius: '32px',
  backgroundColor: theme.palette.common.white,
  width: '100%',
  overflow: 'hidden',
  transition: '250ms'
}))

export const SearchIconWrapper = styled(Box)(({ theme }) => ({
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

export const CloseIconWrapper = styled(IconButton)({
  position: 'absolute',
  top: 8,
  right: 80
})

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
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

export const AvailabilityFilter = styled(FormGroup)(({ theme }) => ({
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

export const CategoriesContainer = styled(Box)({
  marginTop: 16,
  textAlign: 'center'
})

export const Category = styled(Chip)({
  marginRight: '8px',
  marginBottom: '8px',
  cursor: 'pointer',
  height: '44px',
  fontSize: '14px'
})

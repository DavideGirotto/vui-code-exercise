import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
export const InputWrapper = styled(Box)(({ theme }) => ({
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
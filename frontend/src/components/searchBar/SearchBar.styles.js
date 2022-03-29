import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'

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

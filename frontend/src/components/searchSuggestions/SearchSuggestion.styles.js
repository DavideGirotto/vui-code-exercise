import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'

export const AutocompleteItem = styled(Box)(({ theme }) => ({
  padding: 16,
  cursor: 'pointer',
  borderRadius: 16,
  transition: '300ms',
  '&:hover': {
    background: 'rgba(0, 0, 0, 0.08)',
    color: theme.palette.primary.main
  }
}))

export const ProductSuggestions = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: 0
}))

export const Product = styled(ListItem)(({ theme }) => ({
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

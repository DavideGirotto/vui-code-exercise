import styled from '@mui/system/styled'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'

export const ProductsListContainer = styled(Box)({
  margin: '64px 0'
})

export const SectionTitle = styled(Typography)(({ theme }) => ({
  padding: '32px 0',
  color: theme.palette.primary.main
}))

export const ProductImage = styled(CardMedia)({
  maxHeight: '200px'
})

export const ProductDescription = styled(CardContent)({
  fontSize: '14px'
})

export const ProductContainer = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
})

export const Price = styled(CardContent)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 'bold',
  color: theme.palette.primary.main
}))

export const ProductRating = styled(CardContent)({
  paddingTop: 0,
  paddingBottom: 0
})

export const CardFooter = styled(CardActions)({
  flexGrow: 1,
  alignItems: 'flex-end',
  padding: '16px',
  fontSize: '14px'
})

import styled from '@mui/system/styled'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import FilterListIcon from '@mui/icons-material/FilterList'
import { useEffect, useState } from 'react'

const ProductsListContainer = styled(Box)({
  marginTop: '64px'
})

const SectionTitle = styled(Typography)(({ theme }) => ({
  padding: '32px 0',
  color: theme.palette.primary.main
}))

const ProductImage = styled(CardMedia)({
  maxHeight: '200px'
})

const ProductDescription = styled(CardContent)({
  fontSize: '14px'
})

const ProductContainer = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
})

const Price = styled(CardContent)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 'bold',
  color: theme.palette.primary.main
}))

const ProductRating = styled(CardContent)({
  paddingTop: 0,
  paddingBottom: 0
})

const CardFooter = styled(CardActions)({
  flexGrow: 1,
  alignItems: 'flex-end',
  padding: '16px',
  fontSize: '14px'
})

export default function ProductsList ({ products, title }) {
  const sortingTypes = ['featured', 'rating', 'pricing', 'availability']
  const [sortingBy, setsortingBy] = useState('featured')
  const [sortedProducts, setSortedProducts] = useState(products)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  useEffect(() => {
    if (products.length !== 0) setSortedProducts(products)
  }, [products])

  const sortProducts = type => {
    const sorted = [...products]

    switch (type) {
      case 'rating':
        sorted.sort((a, b) => { return b.rating - a.rating })
        setSortedProducts(sorted)
        break
      case 'pricing':
        sorted.sort((a, b) => { return Number(b.price.replace('$', '')) - Number(a.price.replace('$', '')) })
        setSortedProducts(sorted)
        break
      case 'availability':
        sorted.sort((a, b) => { return b.availability - a.availability })
        setSortedProducts(sorted)
        break
      default:
        setSortedProducts(products)
    }
  }

  const handleClose = type => {
    sortProducts(type)
    setsortingBy(type)
    setAnchorEl(null)
  }

  return (
    <ProductsListContainer>
      <Grid
        container
        justifyContent='space-between'
        alignItems='center'
      >
        <Grid item xs={12} sm={6}>
          <SectionTitle variant='h4'>{title}</SectionTitle>
        </Grid>

        <Grid item sx={{ textAlign: 'right' }} xs={12} sm={6}>
          <Button
            variant='outlined'
            endIcon={<FilterListIcon />}
            onClick={e => setAnchorEl(e.currentTarget)}
          >
            sort by: {sortingBy}
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            {sortingTypes.map((st, index) => (
              st !== sortingBy &&
                <MenuItem
                  key={index}
                  value={st}
                  sx={{ width: '128px', justifyContent: 'flex-end', textTransform: 'capitalize' }}
                  onClick={() => handleClose(st)}
                >{st}
                </MenuItem>
            ))}
          </Menu>
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent='left'
        alignItems='stretch'
        spacing={4}
      >
        {sortedProducts.map((product, index) => (
          <Grid item key={index} xs={6} md={4}>
            <ProductContainer>
              <ProductImage
                sx={{ maxHeight: '200px' }}
                component='img'
                image={product.imageUrl}
              />

              <ProductDescription>
                {product.description}
              </ProductDescription>

              <ProductRating>
                <Rating name='read-only' value={product.rating} readOnly />
              </ProductRating>

              <Price>
                {product.price}
              </Price>
              <CardFooter>
                <Grid container>
                  <Grid item xs={12} sm={4}><strong>Aisle:</strong> {product.aisle}</Grid>
                  <Grid item xs={12} sm={4}><strong>Bay:</strong> {product.bay}</Grid>
                  <Grid item xs={12} sm={4}><strong>Qty:</strong> {product.availability}</Grid>
                </Grid>
              </CardFooter>
            </ProductContainer>
          </Grid>
        ))}
      </Grid>
    </ProductsListContainer>
  )
}

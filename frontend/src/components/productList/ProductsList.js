import Grid from '@mui/material/Grid'
import Rating from '@mui/material/Rating'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import FilterListIcon from '@mui/icons-material/FilterList'
import { useEffect, useState } from 'react'
import { CardFooter, Price, ProductContainer, ProductDescription, ProductImage, ProductRating, ProductsListContainer, SectionTitle } from './ProductsList.styles'

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

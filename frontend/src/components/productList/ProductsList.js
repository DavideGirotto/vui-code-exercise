import styled from '@mui/system/styled'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded'

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
  flexDirection:'column'
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
  fontSize: '14px',
})

export default function ProductsList ({products, title}) {
  return (
    <ProductsListContainer>
      <SectionTitle variant='h4'>{title}</SectionTitle>
      
      <Grid
        container
        justifyContent='left'
        alignItems='stretch'
        spacing={4}
      >
      {products.map((product, index) => (
        <Grid item xs={6} md={4}>
            <ProductContainer>
              <ProductImage
                sx={{maxHeight: '200px'}}
                component='img'
                image={product.imageUrl}
              />

              <ProductDescription>
                {product.description}
              </ProductDescription>

              <ProductRating>
                <Rating name="read-only" value={product.rating} readOnly />
              </ProductRating>

              <Price>
                {product.price}
              </Price>
              <CardFooter >
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

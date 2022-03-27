import styled from '@mui/system/styled'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'

const FeaturedProductsContainer = styled(Box)({
  marginTop: '32px'
})

const SectionTitle = styled(Typography)(({ theme }) => ({
  padding: '32px 0',
  color: theme.palette.primary.main
}))

export default function FeaturedProducts () {
  return (
    <FeaturedProductsContainer>
      <SectionTitle variant='h4'>Featured Products</SectionTitle>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        spacing={4}
      >
        <Grid item xs={6} md={4}>
          <Card sx={{}}>
            <CardMedia
              component='img'
              image='https://mobileimages.lowes.com/productimages/04e18bf4-0595-43e5-b4f6-f9b5404ad25f/16800441.jpg?sw=80'
            />
            <CardContent>
              This impressive paella is a perfect party dish and a fun meal to cook
              together with your guests. Add 1 cup of frozen peas along with the mussels,
              if you like.
            </CardContent>
            <CardActions disableSpacing>
              Aisle: 5
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={6} md={4}>
          <Card sx={{}}>
            <CardMedia
              component='img'
              image='https://mobileimages.lowes.com/productimages/04e18bf4-0595-43e5-b4f6-f9b5404ad25f/16800441.jpg?sw=80'
            />
            <CardContent>
              This impressive paella is a perfect party dish and a fun meal to cook
              together with your guests. Add 1 cup of frozen peas along with the mussels,
              if you like.
            </CardContent>
            <CardActions disableSpacing>
              Aisle: 5
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={6} md={4}>
          <Card sx={{}}>
            <CardMedia
              component='img'
              image='https://mobileimages.lowes.com/productimages/04e18bf4-0595-43e5-b4f6-f9b5404ad25f/16800441.jpg?sw=80'
            />
            <CardContent>
              This impressive paella is a perfect party dish and a fun meal to cook
              together with your guests. Add 1 cup of frozen peas along with the mussels,
              if you like.
            </CardContent>
            <CardActions disableSpacing>
              Aisle: 5
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </FeaturedProductsContainer>
  )
}

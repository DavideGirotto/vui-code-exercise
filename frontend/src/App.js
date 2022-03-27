import React from 'react'
import logo from './logo.svg'
import CssBaseline from '@mui/material/CssBaseline'
import makeStyles from '@mui/styles/makeStyles'
import { Counter } from './components/counter/Counter'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import SearchBar from './components/searchBar/SearchBar'
import FeaturedProducts from './components/featuredProducts/FeauturedProducts'

const useStyle = makeStyles({
  header: {
    margin: '64px 0'
  }
})

function App () {
  const classes = useStyle()

  return (
    <>
      <Container maxWidth={false}>
        <Grid
          className={classes.header}
          container
          justifyContent='center'
          alignItems='center'
        >
          <Grid item xs={8} sm={6} md={4} lg={3}>
            <img src={logo} alt='logo' />
          </Grid>
        </Grid>

        <Grid
          container
          justifyContent='center'
          alignItems='center'
        >
          <Grid item xs={12} md={10} lg={8} xl={6}>
            <SearchBar />
            <FeaturedProducts />
          </Grid>
        </Grid>

      </Container>
    </>
  )
}

export default App

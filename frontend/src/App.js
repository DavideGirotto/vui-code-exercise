import React, { useEffect } from 'react'
import logo from './logo.svg'
import {styled} from '@mui/material/styles'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import SearchBar from './components/searchBar/SearchBar'
import ProductsList from './components/productList/ProductsList'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, selectFetchingProducts, selectProducts } from './store/reducers/products'
import { selectSearchResults } from './store/reducers/search'

const Header = styled(Grid)(({ theme }) => ({
  margin: '16px 0',
  [theme.breakpoints.up('md')]: {
    margin: '64px 0',
  },
}))

function App () {
  const dispatch = useDispatch()
  const isFetchingProducts = useSelector(selectFetchingProducts)
  const products = useSelector(selectProducts)
  const searchResults = useSelector(selectSearchResults)

  useEffect(() => {
    if (products.length === 0) dispatch(getProducts())
  }, [dispatch, products])


  return (
    <>
      <Container maxWidth={false}>
        <Header
          container
          justifyContent='center'
          alignItems='center'
        >
          <Grid item xs={8} sm={6} md={4} lg={3}>
            <img src={logo} alt='logo' />
          </Grid>
        </Header>

        <Grid
          container
          justifyContent='center'
          alignItems='center'
        >
          <Grid item xs={12} md={10} lg={8} xl={6}>
            <SearchBar />

            {searchResults.length > 0
              ? <ProductsList products={searchResults} title='Search Results' />
              : !isFetchingProducts && <ProductsList products={products} title='Featured Products' />}
          </Grid>
        </Grid>

      </Container>
    </>
  )
}

export default App

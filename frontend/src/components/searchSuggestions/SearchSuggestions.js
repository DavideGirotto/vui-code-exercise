import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import { selectAutocompleteSuggestions } from '../../store/reducers/search'
import { selectProducts } from '../../store/reducers/products'
import { useSelector } from 'react-redux'
import { AutocompleteItem, Product, ProductSuggestions } from './SearchSuggestion.styles'

export default function SearchSuggestions ({ handleClick }) {
  const autocompleteSuggestions = useSelector(selectAutocompleteSuggestions)
  const products = useSelector(selectProducts)

  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        {autocompleteSuggestions.map((s, index) =>
          <AutocompleteItem
            key={index}
            onClick={() => handleClick(s.name)}
          >
            {s.name}
          </AutocompleteItem>)}
      </Grid>

      <ProductSuggestions item xs={12} sm={6} component={List}>
        {products.map((p, index) => (
          <Product key={index}>
            <ListItemAvatar>
              <Avatar
                variant='rounded'
                src={p.imageUrl}
                alt={p.description}
                sx={{ border: '1px solid #eee', width: 96, height: 96 }}
              />
            </ListItemAvatar>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box>
                <Typography sx={{ fontSize: 14 }}>{p.description.length <= 40 ? p.description : p.description.substring(0, 37) + '...'}</Typography>
              </Box>

              <Box>
                <Typography sx={{ fontSize: 16, padding: '8px 0', fontWeight: 800 }}>{p.price}</Typography>
              </Box>

              <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'flex-end', fontSize: 12 }}>
                <Grid container>
                  <Grid item xs={4}><strong>Aisle:</strong> {p.aisle}</Grid>
                  <Grid item xs={4}><strong>Bay:</strong> {p.bay}</Grid>
                  <Grid item xs={4}><strong>Qty:</strong> {p.availability}</Grid>
                </Grid>
              </Box>
            </Box>
          </Product>
        ))}
      </ProductSuggestions>
    </Grid>
  )
}

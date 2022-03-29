import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import { selectAutocompleteSuggestions } from '../../store/reducers/search'
import { selectProducts } from '../../store/reducers/products'
import { useSelector } from 'react-redux'

const AutocompleteItem = styled(Box)(({ theme }) => ({
  padding: 16,
  cursor: 'pointer',
  borderRadius: 16,
  transition: '300ms',
  '&:hover': {
    background: 'rgba(0, 0, 0, 0.08)',
    color: theme.palette.primary.main
  }
}))

const Product = styled(ListItem)(({ theme }) => ({
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

export default function SearchSuggestions ({ handleSuggestionClick }) {
  const autocompleteSuggestions = useSelector(selectAutocompleteSuggestions)
  const products = useSelector(selectProducts)

  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        {autocompleteSuggestions.map((s, index) => <AutocompleteItem key={index} onClick={() => handleSuggestionClick(s.name)}>{s.name}</AutocompleteItem>)}
      </Grid>

      <Grid item xs={12} sm={6} component={List} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 0 }}>
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
      </Grid>
    </Grid>
  )
}

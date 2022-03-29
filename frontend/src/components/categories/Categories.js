import styled from '@mui/system/styled'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import { useSelector } from 'react-redux'
import { selectCategoriesSuggestions } from '../../store/reducers/search'

export const CategoriesContainer = styled(Box)({
  marginTop: 16,
  textAlign: 'center'
})

export const Category = styled(Chip)({
  marginRight: '8px',
  marginBottom: '8px',
  cursor: 'pointer',
  height: '44px',
  fontSize: '14px'
})

export default function Categories ({ handleSuggestionClick }) {
  const categories = useSelector(selectCategoriesSuggestions)

  return (
    <CategoriesContainer>
      {categories.map((category, index) => (
        <Category key={index} label={category} onClick={() => handleSuggestionClick(category)} />
      ))}
    </CategoriesContainer>
  )
}

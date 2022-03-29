import { selectCategoriesSuggestions } from '../../store/reducers/search'
import { useSelector } from 'react-redux'
import { CategoriesContainer, Category } from '../searchBar/SearchBar.styles'

export default function Categories ({ handleClick }) {
  const categories = useSelector(selectCategoriesSuggestions)

  return (
    <CategoriesContainer>
      {categories.map((category, index) => (
        <Category key={index} label={category} onClick={() => handleClick(category)} />
      ))}
    </CategoriesContainer>
  )
}

import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useDispatch, useSelector } from 'react-redux'
import { filterAvailability, getSearchResults, selectAvailabilityFilter, selectSearchText } from '../../store/reducers/search'
import { AvailabilityFilterWrapper } from './AvailabilityFilter.styles'


export default function AvailabilityFilter () {
  const dispatch = useDispatch()
  const searchText = useSelector(selectSearchText)
  const availabilityFilter = useSelector(selectAvailabilityFilter)

  const handleClick = value => {
    dispatch(filterAvailability(value))
    searchText !== '' && dispatch(getSearchResults())
  }

  return (
    <AvailabilityFilterWrapper>
      <FormControlLabel
        control={
          <Checkbox
            checked={availabilityFilter}
            onChange={e => dispatch(handleClick(e.target.checked))}
          />
            }
        label='Show only available products'
      />
    </AvailabilityFilterWrapper>
  )
}

import { styled } from '@mui/material/styles'
import FormGroup from '@mui/material/FormGroup'

export const AvailabilityFilterWrapper = styled(FormGroup)(({ theme }) => ({
  display: 'inline-block',
  marginTop: '8px',
  marginLeft: 16,
  '& .MuiCheckbox-root': {
    marginRight: '4px'
  },
  '& svg': {
    color: '#c4c4c4'
  },
  '& .Mui-checked svg': {
    color: theme.palette.primary.main
  }
}))
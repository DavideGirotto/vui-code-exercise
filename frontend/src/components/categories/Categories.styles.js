import styled from '@mui/system/styled'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

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

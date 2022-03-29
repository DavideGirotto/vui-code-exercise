import App from './App'
import { store } from './store'
import { get } from './store/utils'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import dataset from '../../backend/datasets/searchResults.json'
import { getProducts } from './store/reducers/products'
import { createTheme, ThemeProvider } from '@mui/material/styles'

export const searchDataset = dataset

const theme = createTheme({
  shape: {
    borderRadius: 8
  },
  palette: {
    primary: {
      main: '#264990',
      dark: '#204184',
      contrastText: '#ffffff'
    }
  }
})

export const Wrapper = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  )
}

export const initApp = async () => {
  get.mockResolvedValueOnce(dataset)

  await store.dispatch(getProducts())

  const Wrapper = () => {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    )
  }

  render(<Wrapper />)
}

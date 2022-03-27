import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles'

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

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

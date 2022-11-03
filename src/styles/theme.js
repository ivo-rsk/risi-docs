import {createTheme} from '@mui/material'

const theme = createTheme({
    palette: {
      primary: {
        100: '#F6FBFC',
        300: '#ECFCFF',
        500: '#54BDCB',
        700: '#245157',
        900: '#0A373D',
        main: '#245157',
        light: '#ECFCFF',
        dark: '#0A373D',
      },
    },
    typography: {
      fontFamily: "'Montserrat', sans-serif"
    },
});
  
export default theme
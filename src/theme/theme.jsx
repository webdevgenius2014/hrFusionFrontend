import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
  overrides: {
   
    MuiCssBaseline: {
      '@global': {
        '*::-webkit-scrollbar': {
          width: '20px',
          color:'black', 
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#ff4081', 
          borderRadius: '6px',
        },
        // Add more styles as needed
      },
    },
  },
  components: {
    MuiPickersToolbar: {
      styleOverrides: {
        root: {
          color: '#1565c0',
          borderRadius: 16,
          borderWidth: 1,
          borderColor: '#2196f3',
        }
      }
    },
    MuiAccordion: {
      styleOverrides: {
        "root": {
          "background": "transparent",
          "boxShadow": "none",
          "margin": "0px",
          "&.Mui-expanded": {
            "margin": "0px",
            "padding": "0px",
            "boxShadow": "1px 1px 1px rgba(0.2, 0.2, 0.2, 0.3)"
          }
        },       
      },
    },
    
    MuiCssBaseline: {
      styleOverrides: {
        // Add more style overrides as needed
      },
    },
  },
  direction: 'ltr',
  palette: {
    primary: {
      main: '#5D87FF',
      light: '#ECF2FF',
      dark: '#4570EA',
    },
    secondary: {
      main: '#49BEFF',
      light: '#E8F7FF',
      dark: '#23afdb',
    },
    success: {
      main: '#13DEB9',
      light: '#E6FFFA',
      dark: '#02b3a9',
      contrastText: '#ffffff',
    },
    info: {
      main: '#539BFF',
      light: '#EBF3FE',
      dark: '#1682d4',
      contrastText: '#ffffff',
    },
    error: {
      main: '#FA896B',
      light: '#FDEDE8',
      dark: '#f3704d',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#FFAE1F',
      light: '#FEF5E5',
      dark: '#ae8e59',
      contrastText: '#ffffff',
    },
    purple: {
      A50: '#EBF3FE',
      A100: '#6610f2',
      A200: '#557fb9',
    },
    grey: {
      100: '#F2F6FA',
      200: '#EAEFF4',
      300: '#DFE5EF',
      400: '#7C8FAC',
      500: '#5A6A85',
      600: '#2A3547',
    },
    white: {
      100: '#FFFFFF',
    },
    text: {
      primary: '#2A3547',
      secondary: '#5A6A85',
    },
    action: {
      disabledBackground: 'rgba(73,82,88,0.12)',
      hoverOpacity: 0.02,
      hover: '#f6f9fc',
    },
    divider: '#e5eaef',
  },
});

export { defaultTheme };

import { ThemeProvider } from '@mui/material/styles';
import Router from './routes/Router'
import { useRoutes } from 'react-router-dom';
import {defaultTheme} from './theme/theme'

import './styles/custom.css';


function App() {
  const routing = useRoutes(Router);
  const theme = defaultTheme;
  return (
    <>
    <ThemeProvider theme={theme}>
        {routing}
      </ThemeProvider>
    </>
  );
}

export default App;

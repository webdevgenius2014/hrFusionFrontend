import { ThemeProvider } from '@mui/material/styles';
import Router from './routes/Router'
import { useRoutes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import {defaultTheme} from './theme/theme'
import './styles/custom.css';

function App() {
  const routing = useRoutes(Router);
  const theme = defaultTheme;
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {routing}
      </ThemeProvider>
    </>
  );
}

export default App;

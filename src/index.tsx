import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';

import App from './App';

ReactDOM.render(
  <SnackbarProvider
    maxSnack={3}
    style={{ fontSize: '2rem' }}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
  >
    <App />
  </SnackbarProvider>,
  document.getElementById('root')
);

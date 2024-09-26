import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import * as React from 'react';
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme} from '@mui/material/styles';
import theme from './theme'
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import Checkout from "./components/Checkout"
import Thanks from "./components/Thanks"

export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

function App() {
  return (
    <div className="App">
      {/* <Register /> */}
      <React.StrictMode>
        <BrowserRouter>
          <Switch>
            <Route path='/login'>
              <ThemeProvider theme={theme}>
                <Login />
              </ThemeProvider>
            </Route>
            <Route path='/register'>
              <ThemeProvider theme={theme}>
                <Register />
              </ThemeProvider>
            </Route>
            <Route path='/checkout'>
              <ThemeProvider theme={theme}>
                <Checkout />
              </ThemeProvider>
            </Route>
            <Route path='/thanks'>
              <ThemeProvider theme={theme}>
                <Thanks />
              </ThemeProvider>
            </Route>
            <Route path='/'>
              <ThemeProvider theme={theme}>
                <Products />
              </ThemeProvider>
            </Route>

          </Switch>

        </BrowserRouter>

      </React.StrictMode>
    </div>
  );
}

export default App;

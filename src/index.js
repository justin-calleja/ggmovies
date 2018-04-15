import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { MuiThemeProvider, createMuiTheme, createGenerateClassName, jssPreset } from 'material-ui/styles';
import blueGrey from 'material-ui/colors/blueGrey';
import green from 'material-ui/colors/green';
import CssBaseline from 'material-ui/CssBaseline';

import AppBar from './components/AppBar';
import appStore from './stores/index';

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());
// We define a custom insertion point that JSS will look for injecting the styles in the DOM.
// Styles injected by Webpack (CSS Modules) will now happen after the JSS ones (therefore having a higher precedence).
jss.options.insertionPoint = 'jss-insertion-point';

export const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: blueGrey,
        secondary: green,
    },
});

ReactDOM.render(
    <JssProvider jss={jss} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Provider appStore={appStore}>
                <Router>
                    <React.Fragment>
                        <AppBar movieSearchStore={appStore.movieSearch} />
                    </React.Fragment>
                </Router>
            </Provider>
        </MuiThemeProvider>
    </JssProvider>,
    document.getElementById('root'),
);

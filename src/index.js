import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { MuiThemeProvider, createMuiTheme, createGenerateClassName, jssPreset } from 'material-ui/styles';
import blueGrey from 'material-ui/colors/blueGrey';
import green from 'material-ui/colors/green';
import CssBaseline from 'material-ui/CssBaseline';

import AppPage from './pages/AppPage';
import AppBar from './components/AppBar';
import MovieSearchDialog from './components/MovieSearchDialog';
import appStore from './stores/index';

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());
// We define a custom insertion point that JSS will look for injecting the styles in the DOM.
// Styles injected by Webpack (CSS Modules) will now happen after the JSS ones (therefore having a higher precedence).
// Note: CRA will strip comments in index.html page when going live i.e. insertion point should be a DOM element (other than a comment).
jss.options.insertionPoint = document.getElementById('jss-insertion-point');

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
                        <MovieSearchDialog
                            movieSearchStore={appStore.movieSearch}
                            detailPageStore={appStore.detailPage}
                        />
                        <AppPage detailPageStore={appStore.detailPage} />
                    </React.Fragment>
                </Router>
            </Provider>
        </MuiThemeProvider>
    </JssProvider>,
    document.getElementById('root'),
);

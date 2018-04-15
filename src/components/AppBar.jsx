import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import MUIAppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import { KeyboardArrowLeft, Search, FilterList } from '@material-ui/icons';
import { withStyles } from 'material-ui/styles';

import TheMovieDB from './TheMovieDB/index';
import MovieSearchStore from '../stores/MovieSearchStore';

const styles = {
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
};

const MainAppBar = withStyles(styles)(({ classes, onSearchClick }) => (
    <MUIAppBar position="static">
        <Toolbar className={classes.toolbar}>
            <Typography variant="title" color="inherit">
                GGMovies
            </Typography>
            <TheMovieDB />
            <div>
                <IconButton onClick={onSearchClick} color="inherit" aria-label="Find">
                    <Search />
                </IconButton>
                <IconButton color="inherit" aria-label="Filter">
                    <FilterList />
                </IconButton>
            </div>
        </Toolbar>
    </MUIAppBar>
));

MainAppBar.propTypes = {
    onSearchClick: PropTypes.func.isRequired,
};

MainAppBar.displayName = 'MainAppBar';

const BackButtonAppBar = withStyles(styles)(({ history, classes, onSearchClick }) => (
    <MUIAppBar position="static">
        <Toolbar className={classes.toolbar}>
            <IconButton onClick={() => history.push('/')} color="inherit" aria-label="Filter">
                <KeyboardArrowLeft />
            </IconButton>
            <TheMovieDB />
            <IconButton onClick={onSearchClick} color="inherit" aria-label="Find">
                <Search />
            </IconButton>
        </Toolbar>
    </MUIAppBar>
));

BackButtonAppBar.propTypes = {
    history: PropTypes.object.isRequired,
};

BackButtonAppBar.displayName = 'BackButtonAppBar';

const AppBar = ({ movieSearchStore: { dialog } }) => (
    <Switch>
        <Route
            path="/movie/:id"
            render={({ history }) => <BackButtonAppBar history={history} onSearchClick={dialog.show} />}
        />
        <Route render={() => <MainAppBar onSearchClick={dialog.show} />} />
    </Switch>
);

AppBar.propTypes = {
    movieSearchStore: PropTypes.instanceOf(MovieSearchStore).isRequired,
};

export default AppBar;
export { MainAppBar, BackButtonAppBar };

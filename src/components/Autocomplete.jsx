import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { LinearProgress } from 'material-ui/Progress';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';

import MovieSearchStore from '../stores/MovieSearchStore';

const styles = theme => ({
    container: {
        flexGrow: 1,
        height: 450,
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    menuItem: {
        color: theme.palette.secondary.light,
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
    linearProgress: {
        marginTop: '1em',
    },
});

const Suggestions = withRouter(({ suggestions, history, classes, movieSearchStore }) => (
    <Paper className={classes.paper} square>
        {suggestions.map((movie, index) => (
            <MenuItem
                onClick={() => {
                    movieSearchStore.dialog.hide();
                }}
                className={classes.menuItem}
                key={movie.id}
                component="div"
            >
                {movie.title}
            </MenuItem>
        ))}
    </Paper>
));

class Autocomplete extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        movieSearchStore: PropTypes.instanceOf(MovieSearchStore).isRequired,
        debounceTimeBy: PropTypes.number,
    };

    static defaultProps = {
        debounceTimeBy: 500,
    };

    componentDidMount() {
        const {
            debounceTimeBy,
            movieSearchStore: { fetch },
        } = this.props;

        this.subscription = Observable.fromEvent(this.inputRef, 'keyup')
            .map(e => e.target.value)
            .filter((str = '') => str.trim() !== '')
            .distinctUntilChanged()
            .debounceTime(debounceTimeBy)
            .switchMap(fetch)
            .subscribe();
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {
        const { classes, movieSearchStore } = this.props;
        return (
            <div className={classes.container}>
                <TextField
                    InputProps={{
                        inputRef: el => (this.inputRef = el),
                        autoFocus: true,
                        classes: {
                            root: classes.inputRoot,
                        },
                        placeholder: 'Start typing to search…',
                    }}
                    fullWidth
                />

                {movieSearchStore.loadable.pending ? (
                    <LinearProgress className={classes.linearProgress} />
                ) : movieSearchStore.loadable.rejected ? (
                    <div>{movieSearchStore.loadable.errorMessage}</div>
                ) : movieSearchStore.loadable.safeFulfilled ? (
                    <Suggestions
                        movieSearchStore={movieSearchStore}
                        suggestions={movieSearchStore.loadable.data.results}
                        classes={classes}
                    />
                ) : null}
            </div>
        );
    }
}

export default withStyles(styles)(observer(Autocomplete));

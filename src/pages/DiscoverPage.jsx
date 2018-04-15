import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import { ExpandMore } from '@material-ui/icons';

import DiscoverPageStore from '../stores/DiscoverPageStore';

const styles = theme => ({
    root: {
        flexGrow: 1,
        margin: '1.2em auto 0',
        width: '95%',
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    card: {
        maxWidth: 345,
        // minHeight: 355,
    },
    contractedText: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    media: {
        height: 200,
    },
    progress: {
        margin: 'auto',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        margin: 'auto',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
});

const MovieCard = withRouter(
    class extends Component {
        static propTypes = {
            imgBasePath: PropTypes.string,
            history: PropTypes.object.isRequired,
        };

        static defaultProps = {
            imgBasePath: 'https://image.tmdb.org/t/p/w1280',
        };

        state = { expanded: false };

        handleExpandClick = () => {
            this.setState({ expanded: !this.state.expanded });
        };

        getImgUrl = () => {
            return `${this.props.imgBasePath}${this.props.movie.backdrop_path || this.props.movie.poster_path}`;
        };

        render() {
            const {
                history,
                classes,
                movie: { title, overview, id },
            } = this.props;
            const { expanded } = this.state;

            return (
                <Card raised className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        onClick={() => history.push(`/movie/${id}`)}
                        image={this.getImgUrl()}
                        title={title}
                    />
                    <CardContent>
                        <Typography
                            gutterBottom
                            className={expanded || classes.contractedText}
                            variant="headline"
                            component="h2"
                        >
                            {title}
                        </Typography>
                        <Typography component="p" className={expanded || classes.contractedText}>
                            {overview}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton
                            className={classes.expand + (expanded ? ` ${classes.expandOpen}` : '')}
                            onClick={this.handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="Show more"
                        >
                            <ExpandMore />
                        </IconButton>
                    </CardActions>
                </Card>
            );
        }
    },
);

class DiscoverPage extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        discoverPageStore: PropTypes.instanceOf(DiscoverPageStore).isRequired,
    };

    componentDidMount() {
        const {
            match,
            discoverPageStore: { loadable, fetch },
        } = this.props;

        if (loadable.idle || !loadable.pending) {
            fetch(match.params.id);
        }
    }

    renderMovies() {
        const {
            classes,
            discoverPageStore: { loadable },
        } = this.props;

        if (loadable.rejected) {
            return <div>{loadable.errorMessage}</div>;
        }
        if (loadable.safeFulfilled) {
            return loadable.data.results.map(movie => (
                <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                    <MovieCard classes={classes} movie={movie} />
                </Grid>
            ));
        }

        return <CircularProgress className={classes.progress} size={70} />;
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    {this.renderMovies()}
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(observer(DiscoverPage));

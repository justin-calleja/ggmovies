import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';

import KVItem from '../components/KVItem';
import DetailPageStore from '../stores/DetailPageStore';
import './DetailPage.css';

const styles = theme => ({
    'movie-container': {
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    'movie-container-text': {
        padding: '0.8em 1em 0',
    },
    'movie-container-image': {
        height: '35vh',
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        boxShadow: 'inset 0 0 70px black',
    },
    'movie-container-text__title': {
        textAlign: 'center',
        marginBottom: '0.3em',
    },
    'movie-container-text__overview': {
        textAlign: 'center',
        marginBottom: '1em',
    },
    'movie-container__link': {
        color: theme.palette.primary.light,
        marginRight: '0.4em',
    },
});

const BackgroundImg = ({ classes, imgUrl }) => (
    <div
        style={{ backgroundImage: `url(${imgUrl})` }}
        className={`${classes['movie-container-image']} Detail-movie-container-image`}
    />
);

const Title = ({ classes, title }) => (
    <Typography
        variant="display1"
        color="primary"
        className={`${classes['movie-container-text__title']} Detail-movie-container-text__title`}
    >
        {title}
    </Typography>
);

const Overview = ({ classes, overview }) => (
    <Typography
        className={`${classes['movie-container-text__overview']} Detail-movie-container-text__overview`}
        variant="subheading"
        color="textSecondary"
    >
        {overview}
    </Typography>
);

const KVItems = ({
    classes,
    data: { release_date, genres, budget, revenue, runtime, vote_average, vote_count, status, tagline },
}) => (
    <React.Fragment>
        {release_date && <KVItem renderKey={() => 'Release date:'} renderValue={() => `${release_date}`} />}

        {/* <KVItem
            renderKey={() => 'Genres:'}
            renderValue={() => (
                <React.Fragment>
                    {genres.map(({ id, name }) => (
                        <Link key={id} className={classes['movie-container__link']} to={`/?genres=${id}`}>
                            {name}
                        </Link>
                    ))}
                </React.Fragment>
            )}
        /> */}

        {budget && <KVItem renderKey={() => 'Budget:'} renderValue={() => `$${budget.toLocaleString()}`} />}

        {revenue && <KVItem renderKey={() => 'Revenue:'} renderValue={() => `$${revenue.toLocaleString()}`} />}

        {runtime && <KVItem renderKey={() => 'Runtime:'} renderValue={() => `${runtime} mins`} />}

        {vote_average && <KVItem renderKey={() => 'Vote average:'} renderValue={() => vote_average} />}

        {vote_count && <KVItem renderKey={() => 'Vote count:'} renderValue={() => vote_count} />}

        {status && <KVItem renderKey={() => 'Status:'} renderValue={() => status} />}

        {tagline && <KVItem renderKey={() => 'Tagline:'} renderValue={() => tagline} />}
    </React.Fragment>
);

class DetailPage extends Component {
    static propTypes = {
        detailPageStore: PropTypes.instanceOf(DetailPageStore).isRequired,
        imgBasePath: PropTypes.string,
        match: PropTypes.object.isRequired,
    };

    static defaultProps = {
        imgBasePath: 'https://image.tmdb.org/t/p/w1280',
    };

    componentDidMount() {
        const {
            match,
            detailPageStore: { loadable, fetch },
        } = this.props;
        if (loadable.idle) {
            fetch(match.params.id);
        }
    }

    renderBackgroundImage() {
        const {
            classes,
            imgBasePath,
            detailPageStore: { loadable, imgPath },
        } = this.props;

        if (loadable.safeFulfilled) {
            return (
                <BackgroundImg
                    classes={classes}
                    imgUrl={`${imgBasePath}${loadable.data.poster_path || loadable.data.backdrop_path}`}
                />
            );
        }
        if (imgBasePath && imgPath) {
            return <BackgroundImg classes={classes} imgUrl={`${imgBasePath}${imgPath}`} />;
        }
        if (loadable.rejected) {
            return <div>{loadable.errorMessage}</div>;
        }

        return <CircularProgress />;
    }

    renderTitle() {
        const {
            classes,
            detailPageStore: { loadable, title },
        } = this.props;

        if (loadable.safeFulfilled) {
            return <Title classes={classes} title={loadable.data.title} />;
        }
        if (title) {
            return <Title classes={classes} title={title} />;
        }
        if (loadable.rejected) {
            return <div>{loadable.errorMessage}</div>;
        }

        return <CircularProgress />;
    }

    renderOverview() {
        const {
            classes,
            detailPageStore: { loadable, overview },
        } = this.props;

        if (loadable.safeFulfilled) {
            return <Overview classes={classes} overview={loadable.data.overview} />;
        }
        if (overview) {
            return <Overview classes={classes} overview={overview} />;
        }
        if (loadable.rejected) {
            return <div>{loadable.errorMessage}</div>;
        }

        return <CircularProgress />;
    }

    renderKVItems() {
        const {
            classes,
            detailPageStore: { loadable },
        } = this.props;

        if (loadable.safeFulfilled) {
            return <KVItems classes={classes} data={loadable.data} />;
        }
        if (loadable.rejected) {
            return <div>{loadable.errorMessage}</div>;
        }

        return <CircularProgress />;
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid className={classes['movie-container']} container spacing={24}>
                <Grid item xs={12} sm={12} md={7} lg={8}>
                    {this.renderBackgroundImage()}
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={4}>
                    <div className={classes['movie-container-text']}>
                        {this.renderTitle()}
                        {this.renderOverview()}
                        {this.renderKVItems()}
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(observer(DetailPage));

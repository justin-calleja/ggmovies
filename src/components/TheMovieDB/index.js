import React from 'react';
import { Link } from 'react-router-dom';
import Hidden from 'material-ui/Hidden';

import PoweredBy from './PoweredBy';
import TmdbStacked from './TmdbStacked';

const TheMovieDB = () => (
    <Link to="https://www.themoviedb.org/" target="_blank">
        <Hidden only={['xs']}>
            <PoweredBy />
        </Hidden>
        <Hidden only={['sm', 'md', 'lg', 'xl']}>
            <TmdbStacked />
        </Hidden>
    </Link>
);

export default TheMovieDB;

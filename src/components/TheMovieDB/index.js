import React from 'react';
import { Link } from 'react-router-dom';
import Hidden from 'material-ui/Hidden';

import PoweredBy from './PoweredBy';
import TmdbStacked from './TmdbStacked';

const TheMovieDB = () => (
    <a target="_blank" rel="noopener noreferrer" href="https://www.themoviedb.org/">
        <Hidden only={['xs']}>
            <PoweredBy />
        </Hidden>
        <Hidden only={['sm', 'md', 'lg', 'xl']}>
            <TmdbStacked />
        </Hidden>
    </a>
);

export default TheMovieDB;

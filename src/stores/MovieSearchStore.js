import { decorate, observable, action } from 'mobx';

import Dialog from './utils/Dialog';
import Loadable from './utils/Loadable';
import { searchMovie } from '../api/index';

class MovieSearchStore {
    dialog = new Dialog();
    loadable = new Loadable(() => null);

    fetch = movieTitle => {
        this.loadable = new Loadable(() => searchMovie(movieTitle));
        return this.loadable.fetch();
    };
}

decorate(MovieSearchStore, {
    loadable: observable,

    fetch: action,
});

export default MovieSearchStore;

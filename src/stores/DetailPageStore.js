import { decorate, observable, action } from 'mobx';

import Loadable from './utils/Loadable';
import { movieDetails } from '../api/index';

class DetailPageStore {
    title = '';
    overview = '';
    imgPath = '';
    loadable = new Loadable(() => null);

    fetch = id => {
        this.loadable = new Loadable(() => movieDetails(id));
        return this.loadable.fetch();
    };

    mutate = ({
        title = this.title,
        overview = this.overview,
        imgPath = this.imgPath,
        loadable = this.loadable,
    } = {}) => {
        this.title = title;
        this.overview = overview;
        this.imgPath = imgPath;
        this.loadable = loadable;
    };
}

decorate(DetailPageStore, {
    title: observable,
    overview: observable,
    imgPath: observable,
    loadable: observable,

    fetch: action,
    mutate: action,
});

export default DetailPageStore;

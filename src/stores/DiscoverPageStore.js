import { decorate, computed, observable, action, runInAction } from 'mobx';

import Loadable from './utils/Loadable';
import { discover } from '../api/index';

class DiscoverPageStore {
    loadable = new Loadable(() => discover(1));
    page = 1;
    totalPages = null;

    get nextPage() {
        return this.page + 1;
    }

    fetch = page => {
        this.loadable = new Loadable(() => discover(page));
        this.page = page;

        return this.loadable.fetch().then(raw => {
            runInAction(() => {
                this.totalPages = raw.total_pages;
            });
            return raw;
        });
    };
}

decorate(DiscoverPageStore, {
    loadable: observable,
    page: observable,
    totalPage: observable,

    nextPage: computed,

    fetch: action,
});

export default DiscoverPageStore;

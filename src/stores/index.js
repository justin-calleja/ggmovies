import { inject } from 'mobx-react';
import MovieSearchStore from './MovieSearchStore';
import DetailPageStore from './DetailPageStore';
import DiscoverPageStore from './DiscoverPageStore';

class AppStore {
    movieSearch = new MovieSearchStore();

    detailPage = new DetailPageStore();

    discoverPage = new DiscoverPageStore();
}

export default new AppStore();

const withAppStore = inject('appStore');
export { withAppStore, AppStore };

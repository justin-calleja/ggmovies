import { inject } from 'mobx-react';
import MovieSearchStore from './MovieSearchStore';
import DetailPageStore from './DetailPageStore';

class AppStore {
    movieSearch = new MovieSearchStore();

    detailPage = new DetailPageStore();
}

export default new AppStore();

const withAppStore = inject('appStore');
export { withAppStore, AppStore };

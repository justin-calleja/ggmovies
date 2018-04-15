import { inject } from 'mobx-react';
import MovieSearchStore from './MovieSearchStore';

class AppStore {
    movieSearch = new MovieSearchStore();
}

export default new AppStore();

const withAppStore = inject('appStore');
export { withAppStore, AppStore };

const defaults = {
    authority: 'https://api.themoviedb.org',
    basePath: '/3',
    query: {
        api_key: process.env.REACT_APP_API_KEY,
        include_adult: false,
        language: 'en-US',
    },
};

function _init({ authority = defaults.authority, basePath = defaults.basePath, resourcePath = '', query = {} } = {}) {
    const queryParamsObj = Object.assign({}, defaults.query, query);
    const queryParamsStrs = Object.keys(queryParamsObj).map(key => `${key}=${queryParamsObj[key]}`);
    const queryParams = queryParamsStrs.length > 0 ? `?${queryParamsStrs.join('&')}` : '';

    return fetch(`${authority}${basePath}${resourcePath}${queryParams}`).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Could not fetch data');
    });
}

export function searchMovie(searchStr = '') {
    const initArgs = { resourcePath: '/search/movie' };
    if (searchStr.length > 0) {
        initArgs.query = { query: encodeURI(searchStr) };
    }
    return _init(initArgs);
}

export function movieDetails(id) {
    if (!id) {
        throw new Error('Cannot get movie details without an id');
    }

    const initArgs = { resourcePath: `/movie/${id}` };
    return _init(initArgs);
}

export function discover(page = 1) {
    const initArgs = { resourcePath: '/discover/movie', query: { page } };
    return _init(initArgs);
}

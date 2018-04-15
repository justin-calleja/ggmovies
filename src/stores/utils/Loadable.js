// #ts-check

import { decorate, action, observable, computed, runInAction } from 'mobx';

export const IDLE = 'IDLE';
export const PENDING = 'PENDING';
export const FULFILLED = 'FULFILLED';
export const REJECTED = 'REJECTED';

class Loadable {
    /** @type {*} */
    data = null;
    /** @type {string} */
    state = IDLE;
    /** @type {Error} */
    error = null;

    /** @type {FetchDataFn} */
    fetchData;

    /**
     * fetchData is a function that returnes a Promise.
     * NOTE: the Promise returned by fetchData should resolve to the actual data from your datastore not to data wrapped by any http client you may be using.
     * @param {FetchDataFn} fetchData
     */
    constructor(fetchData, config = {}) {
        if (!fetchData) throw new Error('Loadable cannot work without fetchData.');

        this.fetchData = fetchData;
        this.config = config;
    }

    get idle() {
        return this.state === IDLE;
    }

    get safeFulfilled() {
        return this.state === FULFILLED && this.data;
    }

    get fulfilled() {
        return this.state === FULFILLED;
    }

    get rejected() {
        return this.state === REJECTED;
    }

    get pending() {
        return this.state === PENDING;
    }

    get errorMessage() {
        return this.error ? this.error.message : null;
    }

    setData = data => {
        this.data = data;
    };

    fetch = (fetchConfigObj = {}, { propagateFetchError = false } = {}) => {
        this.state = PENDING;

        return this.fetchData(fetchConfigObj)
            .then(data => {
                runInAction(`(${this.config.debugName || 'unknown'}) Loadable fetch success`, () => {
                    this.data = data;
                    this.state = FULFILLED;
                });
                return data;
            })
            .catch(error => {
                runInAction(`(${this.config.debugName || 'unknown'}) Loadable fetch fail`, () => {
                    this.error = error;
                    this.state = REJECTED;
                });
                if (propagateFetchError) {
                    throw error;
                }
            });
    };
}

decorate(Loadable, {
    data: observable,
    state: observable,
    error: observable,

    safeFulfilled: computed,
    fulfilled: computed,
    pending: computed,
    rejected: computed,
    errorMessage: computed,

    setData: action,
    fetch: action,
});

export default Loadable;

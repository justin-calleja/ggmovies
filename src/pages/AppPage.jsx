import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import DetailPage from './DetailPage';
import DiscoverPage from './DiscoverPage';
import { withAppStore } from '../stores/index';

const AppPage = withAppStore(({ appStore }) => (
    <Switch>
        <Route
            path="/movie/:id"
            render={({ match }) => <DetailPage match={match} detailPageStore={appStore.detailPage} />}
        />

        <Route
            path="/discover/:id"
            render={({ match }) => <DiscoverPage match={match} discoverPageStore={appStore.discoverPage} />}
        />

        <Route render={() => <Redirect to={`/discover/${appStore.discoverPage.page || 1}`} />} />
    </Switch>
));

export default AppPage;

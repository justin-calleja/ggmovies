import React from 'react';
import { Switch, Route } from 'react-router-dom';

import DetailPage from './DetailPage';

const AppPage = ({ detailPageStore }) => (
    <Switch>
        <Route
            path="/movie/:id"
            render={({ match }) => <DetailPage match={match} detailPageStore={detailPageStore} />}
        />
        {/* <Route render={() => <IndexPage />} /> */}
    </Switch>
);

export default AppPage;

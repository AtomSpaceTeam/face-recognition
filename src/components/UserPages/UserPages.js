import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import './UserPages.css';

import Layout from '../../hoc/Layout';

import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import PeoplePage from './PeoplePage';
import EventsPage from './EventsPage';

const UserPages = ({ match }) => (
  <Layout>
    <div className="user-pages-container">
      <Switch>
        <Route path={`${match.path}/`} component={HomePage} exact />
        <Route path={`${match.path}profile`} component={ProfilePage} />
        <Route path={`${match.path}people`} component={PeoplePage} />
        <Route path={`${match.path}events`} component={EventsPage} />
        {/* <Route path={`${match.path}/logout`} component={} /> */}
      </Switch>
    </div>
  </Layout>
);

export default withRouter(UserPages);

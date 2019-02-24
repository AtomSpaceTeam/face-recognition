import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import './UserPages.css';

import Layout from '../../hoc/Layout';

import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import PeoplePage from './PeoplePage';
import EventPage from './EventPage';

const UserPages = (props) => {
  const { match } = props;
  return (
  <Layout>
    <div className="user-pages-container">
      <Switch>
        <Route path={`${match.path}home`} component={HomePage} />
        <Route path={`${match.path}profile`} component={ProfilePage} />
        <Route path={`${match.path}people`} component={PeoplePage} />
        <Route path={`${match.path}event`} component={EventPage} />
        {/* <Route path={`${match.path}/logout`} component={} /> */}
      </Switch>
    </div>
  </Layout>
)
  };

export default withRouter(UserPages);

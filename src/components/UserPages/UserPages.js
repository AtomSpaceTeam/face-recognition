import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';

import './UserPages.css';

import Layout from '../../hoc/Layout';

import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import PeoplePage from './PeoplePage';
import EventsPage from './EventsPage';
import CoursesPage from './CoursesPage';

const routes = [
  { path: '/home', component: HomePage, exact: true },
  { path: '/profile', component: ProfilePage },
  { path: '/people', component: PeoplePage },
  { path: '/events', component: EventsPage },
  { path: '/courses', component: CoursesPage },
];

const UserPages = ({ match }) => (
  <Layout>
    <div className="user-pages-container">
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            component={route.component}
            exact={route.exact}
          />
        ))}
        {/* <Redirect to="/home" /> */}
      </Switch>
    </div>
  </Layout>
);

export default withRouter(UserPages);

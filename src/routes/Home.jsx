import React from 'react';

import HomeAdmin from '../components/AdminPages';
import UserPages from '../components/UserPages';

class Home extends React.Component {

  render() {
    let component;

    if (localStorage.getItem('status') === 'admin') {
      component = <HomeAdmin />
    } else {
      component = <UserPages />
    }

    return component;
  }
}

export default Home;

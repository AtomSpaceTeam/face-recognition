import React from 'react';
import { Redirect } from 'react-router-dom';

import './CreatePage.css';
import Loader from '../../Loader';
import Course from './Course/Course';
import Event from './Event/Event';
import User from './User/User';

class CreatePage extends React.Component{
  constructor(){
    super();
    this.state = {
      page: '',
      loading: false,
      redirect: false,
      form: {}
    }
  }

  changePage = (e) => {
    if (e.target.children.length === 0){
      let page = e.target.innerHTML.toLowerCase();
      this.setState({ page });
    } else {
      let page = e.target.children[0].innerHTML.toLowerCase();
      this.setState({ page });
    }
  }

  redirect = () => {
    if (this.state.redirect){
        return <Redirect to='/home'/>
    }
  }

  render(){
    let page;

    switch(this.state.page){
      case 'user':
        page = <User loader={ <Loader/> } />;
        break;
      case 'event':
        page = <Event loader={ <Loader/> } />;
        break;
      case 'course':
        page = <Course />;
        break;
      default:
        page = <User loader={ <Loader/> } />;
        break;
    }

    return (
      <div className="create-block">
        <div className="create-categories d-flex justify-content-around">
          <div className="user-btn" onClick={this.changePage}>
            <span className="create-category">User</span>
          </div>
          <div className="event-btn" onClick={this.changePage}>
            <span className="create-category">Event</span>
          </div>
          <div className="course-btn" onClick={this.changePage}>
           <span className="create-category">Course</span>
          </div>
        </div>
        {this.redirect()}
        { page }
      </div>
    );
  }
}

export default CreatePage;

import React from 'react';
import './Error404.css';

class Error404 extends React.Component{
  render() {
    return (
      <div>
        <section class="page_404">
          <div className="content">
            <div>
            <div>
            <div class="text-center">
            <div class="four_zero_four_bg">
              <h1 class="text-center ">404</h1>
            </div>

            <div class="contant_box_404">
            <h3 class="h2">
            Look like you're lost
            </h3>

            <p>the page you are looking for not avaible!</p>

            <a href="/home" class="link_404">Go to Home</a>
          </div>
            </div>
            </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Error404;

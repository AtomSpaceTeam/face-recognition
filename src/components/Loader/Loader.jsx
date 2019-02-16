import React, {Component} from 'react';
import './Loader.css';

class Loader extends Component {
    render() {
        return(
            <div>
                <span class="loader"><span class="loader-inner"></span></span>
            </div>
        );
    }
}

export default Loader;
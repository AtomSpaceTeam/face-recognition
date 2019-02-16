import React from 'react';
import HomeAdmin from '../components/admin/Home/Home';
import HomeUser from '../components/user/Home/Home';

class Home extends React.Component{
    
    render(){
        let component;
        if (localStorage.getItem('status') === 'admin'){
            component = <HomeAdmin />
        } else{
            component = <HomeUser />
        }
        return (
            <div>
                {component}
            </div>
        );
    }
}

export default Home;
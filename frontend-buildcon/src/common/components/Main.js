/**
 * Created by eugen.cotiga on 31/05/17.
 */
import React, {Component} from 'react';
import { Route, BrowserRouter as Router} from 'react-router-dom';
import PageLogin from '../../scenes/Login/components/PageLogin'
import Home from '../../scenes/Home/components/Home'
//import TableHome from '../../scenes/HR/components/TableHome'
import Contracts from '../../scenes/Commercial/Contracts'
import HR from '../../scenes/HR/HR'
import CreatePeople from '../../scenes/HR/CreatePeople'
import CreateCertificate from '../../scenes/HR/CreateCertificate'
import CreateActivity from '../../scenes/HR/CreateActivity'
import ViewActivity from "../../scenes/HR/ViewActivity";
import ViewCertificates from "../../scenes/HR/ViewCertificate";

class Main extends Component{
    render(){
        return(
            <main>
                <Router>
                    <div>
                        <Route exact path='/' component={PageLogin} />
                        <Route path='/Home' component={Home} />
                        <Route path='/Commercial' component={Contracts} />
                        <Route path='/HR' component={HR} />
                        <Route path='/CreatePeople' component={CreatePeople} />
                        <Route path='/CreateCertificate' component={CreateCertificate} />
                        <Route path='/CreateActivity' component={CreateActivity} />
                        <Route path="/ViewCertificates" component={ViewCertificates}/>
                        <Route path="/ViewActivities" component={ViewActivity}/>
                    </div>
                </Router>
            </main>
        );
    }
}

export default Main;
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Cookies from 'universal-cookie';  

import Main from './pages/main';
import Painel from './pages/painel';
import Cadastro from './pages/cadastro/index';
import Login from './pages/login';
import RedefinirSenha from './pages/redefinirSenha';
import CodigoSenha from './pages/codigoSenha';


const cookies = new Cookies();


export default function Routes() {

    const check = () => {
        const user = cookies.get('id');

        if(user){
            return true;
        } else {
            return false;
        }
    }

    const PrivateRoute = ({ component: Component, ... rest}) => ( 
        <Route 
            {... rest}
            render={props =>
                check() ? ( 

                    <Component {... props} /> 
                ) : ( 
                    <Redirect to={{ pathname: "/", state: { from: props.location }}} />
                )
            }
        />
    );
    
    return (

        <Router>
            <Switch>
                <Route exact path="/"  component={Main} />
                <PrivateRoute path="/painel" component={Painel} />
                <Route path="/cadastro" component={Cadastro} />
                <Route path="/login" component={Login} />
                <Route path="/redefinir/senha" component={RedefinirSenha} />
                <Route path="/codigo/senha/:token" component={CodigoSenha} />
            </Switch>
        </Router>

    )
}
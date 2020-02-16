import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from '../routes';
import Header from './modules/header/header';
import Footer from './modules/footer/footer';
import './app.scss';

class App extends Component {
    render() {
        return (
            <div id="app-container">
                <Header />
                <section id="content-container">
                    <Switch>
                        {
                            routes.map(route => (
                                <Route key={route.component} path={route.path}
                                    exact={!!route.exact} component={route.component} />
                            ))
                        }
                    </Switch>
                </section>
                <Footer />
                <div id="overlay"></div>
            </div>
        );
    }
}

export default App;

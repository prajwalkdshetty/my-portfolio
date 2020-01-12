import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch, NavLink } from 'react-router-dom';
import routes from './../routes';
import { setMessage } from '../store/reducers/appReducer';
import Header from './../components/modules/header/Header';
import Footer from './../components/modules/footer/Footer';

// import logo from './logo.svg';
import './App.scss';

class App extends Component {
    componentDidMount() {
        if(!this.props.message) {
            this.props.updateMessage("Hi, I'm from client!");
        }
    }

    render() {
        return ( 
            <>
                <Header />
                <Switch>
                    {
                        routes.map(route => (
                            <Route key={route.component} path={route.path} exact={!!route.exact} component={route.component} />        
                        ))
                    }
                </Switch>
                {/* <Footer /> */}
            </>       
        );
    }
}

const mapStateToProps = (state) => {
    return { message: state.message }
};

const dispatchActions = (dispatch) => {
    return {
        updateMessage: (messageText) => dispatch(setMessage(messageText))
    }
};
export default withRouter(connect(mapStateToProps, dispatchActions)(App));

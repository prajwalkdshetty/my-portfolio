import React, { Component } from 'react';
import Intro from '../intro/Intro';
import Techs from '../techs/Techs';
import Projects from '../projects/Projects';
import './home.scss';
class Home extends Component {

    render() {
        return (
            <section class="wrapper">

                <Intro/>
                <Techs/>
                <Projects/>
            </section>
        );
    }

    componentDidMount() {

    }
}

export default Home;
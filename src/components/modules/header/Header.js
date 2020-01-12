import React, { Component } from 'react';
import Scrollspy from 'react-scrollspy';
import './header.scss';
class Header extends Component {
    render() {
        return (
            <header>
                <div class="wrapper app-spacing header-container">
                    <img id="logo" src="/img/logo.svg" alt="Logo"/>
                    <nav>
                        <Scrollspy items={ ['intro', 'techs', 'projects'] } currentClassName="is-current">
                            <li className="is-current"><a href="#intro">Intro</a></li>
                            <li><a href="#techs">Techs</a></li>
                            <li><a href="#projects">Projects</a></li>
                        </Scrollspy>
                    </nav>
                    <div id="picklist"></div>
                </div>
            </header>
        )
    }
}

export default Header;
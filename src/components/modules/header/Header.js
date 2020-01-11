import React, { Component } from 'react';
import Scrollspy from 'react-scrollspy';

class Header extends Component {
    render() {
        return (
            <header>
                <div id="picklist"></div>
                <nav>
                    <Scrollspy items={ ['intro', 'techs', 'projects'] } currentClassName="is-current">
                        <li className="is-current"><a href="#intro">Intro</a></li>
                        <li><a href="#techs">Techs</a></li>
                        <li><a href="#projects">Projects</a></li>
                    </Scrollspy>
                </nav>
            </header>
        )
    }
}

export default Header;
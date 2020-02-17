import React, { Component, FormEvent } from 'react';
import './header.scss';
import { Link, withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { User } from '../../../models/data.model';
import { AppState } from '../../../models/action.model';
import { withTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { Select } from '../../ui/select/select';
import { FiltersData } from '../../../data/filters-data';
import i18n from '../../../locales/i18n';

interface IProps {
    user: User;
    t: TFunction;
}

interface IState {
    app: AppState; 
}

class Header extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.menuSelected = this.menuSelected.bind(this);
        this.onLanguageChange = this.onLanguageChange.bind(this);
    }
    render() {
        const { user, t } = this.props;
        return (
            <header ref="header">
                <div className="wrapper app-spacing header-container">
                    <Link to="/" id="logo" title="ABC" onClick={this.menuSelected}>
                        <i className="fa fa-bed"></i>
                    </Link>
                    <div id="picklist" className="fa" onClick={() => this.showMobileMenu()}></div>
                    <div id="menu">
                        <nav>
                            <ul>
                                <li><NavLink to="/" title={t('nav.home')} exact onClick={this.menuSelected}>{t('nav.home')}</NavLink></li>
                                {user && user.role.toLowerCase() === 'admin' &&
                                    <li><NavLink to="/admin" title={t('nav.admin')} onClick={this.menuSelected}>{t('nav.admin')}</NavLink></li>
                                }
                                <li>
                                <Select
                                    options={FiltersData.language}
                                    title={t('nav.chooseLanguage')}
                                    name={'language'}
                                    handleChange={this.onLanguageChange}
                                    hideLabel={true}
                                />
                                </li>
                            </ul>
                        </nav>
                        <div id="user-info"><span title={t('nav.loggedInAs')+ ' ' + user.firstname + ' ' + user.lastname}>{user.firstname + ' ' + user.lastname}</span></div>
                    </div>
                </div>
            </header>
        )
    }

    onLanguageChange(event: FormEvent): void {
        i18n.changeLanguage((event.target as HTMLInputElement).value);
    }

    menuSelected(): void {
        const classList = (this.refs.header as HTMLElement).classList;
        classList.remove('open');
        document.getElementById('overlay').classList.remove("show");
    }

    showMobileMenu(): void {
        const classList = (this.refs.header as HTMLElement).classList;
        if (classList.contains("open")) {
            this.menuSelected();
        } else {
            classList.add('open');
            document.getElementById('overlay').classList.add("show");
        }
    }
}

const mapStateToProps = (state: IState) => {
    return {
        user: state.app.user
    }
};

export default withRouter(connect(mapStateToProps)(withTranslation()<any>(Header)));

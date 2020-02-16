import React from 'react';
import './admin.scss';
import { NavLink } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

interface IProps {
    t: TFunction;
}
const Admin = ({ t }: IProps) => {
    return (
        <div className="app-spacing wrapper">
            <div id="admin" className="box">
                <h3>{t('admin.selectOp')}</h3>
                <NavLink to="/admin/addItems" exact className="button button-1" title={t('admin.addItems')}>{t('admin.addItems')}</NavLink>
                <NavLink to="/admin/removeItems" exact className="button button-1" title={t('admin.removeItems')}>{t('admin.removeItems')}</NavLink>
            </div>
        </div>
    )
}

export default withTranslation()<any>(Admin);
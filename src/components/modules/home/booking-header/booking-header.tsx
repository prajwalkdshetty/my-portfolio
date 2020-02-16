import React, { Component, RefObject } from 'react';
import './booking-header.scss'
import Filters from '../filters/filters';
import { withTranslation } from "react-i18next";
import { TFunction } from "i18next";

interface IProps {    
    t: TFunction;
    onFilter: (data: any) => void;
}

class BookingHeader extends Component<IProps> {
    private child: any;
    constructor(props: IProps) {
        super(props);
    }
    render() {        
        const { t } = this.props;
        return (
            <section className="booking-container">
                <div className="wrapper">
                    <div className="booking-header">
                        <div className="selected-header"><div className="sel-title" title={t('home.checkIn')}>{t('home.checkIn')}</div><div className="sel-value">19 Jan 2020</div></div>
                        <div className="selected-header"><div className="sel-title" title={t('home.checkOut')}>{t('home.checkOut')}</div><div className="sel-value">20 Jan 2020</div></div>
                        <div className="selected-header"><div className="sel-title" title={t('home.city')}>{t('home.city')}</div><div className="sel-value">Leipzig, Germany</div></div>
                        <div className="selected-header"><div className="sel-title">{t('home.rooms')}|{t('home.adults')}|{t('home.children')} </div><div className="sel-value">1|2|0</div></div>
                        <button className="button button-small" id="filter-btn" title={t('home.filter')} onClick={() => this.toggleFilter()}>{t('home.filter')}</button>
                    </div>
                    <Filters childRef={(ref: any) => (this.child = ref)}  {...this.props}/>
                </div>
            </section>
        )
    }

    toggleFilter() {
        this.child.toggleFilter();
    }
}

export default withTranslation()<any>(BookingHeader);
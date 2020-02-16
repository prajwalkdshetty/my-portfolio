import React from 'react';
import './search-results-header.scss';
import { withTranslation } from 'react-i18next';
import { TFunction } from "i18next";
import { Hotel } from '../../../../models/data.model';

interface IProps {
    t: TFunction,
    hotels: Hotel[]
}

const SearchResultsHeader = ({ hotels, t }: IProps) => {
    return (
        <section id="search-results-header" className="box wrapper">
            <div id="no-of-results">{hotels.length} {t('home.resultsFound')}</div>
        </section>
    )
}
export default withTranslation()<any>(SearchResultsHeader);
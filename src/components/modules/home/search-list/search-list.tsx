import React from 'react';
import { Link } from 'react-router-dom';
import './search-list.scss';
import Ratings from '../../../common/ratings/ratings';
import {Amenities} from '../../../common/amenities/amenities';
import { Hotel } from '../../../../models/data.model';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';

interface IProps {
    t: TFunction;
    hotels: Hotel[];
    setHotel: (data: Hotel) => void;
}

const SearchList = ({hotels, setHotel, t}: IProps) => {
        return (
            <section className="wrapper">
                <div id="search-lists">
                {
                    hotels.map((data: Hotel, index: number) => (
                        <div key={index} className="list box"> 
                            <div className="search-list-col-1">
                                <img src={data.images[0]} alt={data.name + ' image'}/>
                            </div>
                            <div className="search-list-col-2">
                                <div className="search-list-subcol-1">  
                                    <h3 title={data.name.toUpperCase()}>{data.name}</h3>
                                    <Ratings rating={data.rating} />
                                    <div className="distance">{data.distance_to_venue} {t('home.distanceFrom')} Leipzig</div>
                                    <div className="description"><span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</span></div>
                                    <div className="amenities-container">
                                        <Amenities amenities={data.amenities}/>
                                    </div>
                                </div>
                                <div className="search-list-subcol-2">
                                    <div className="title">{t('home.priceCategory')}</div><div className="value">{data.price_category}</div>
                                    <Link onClick={() => setHotel(data)} to="details" role="button" 
                                        className="button button-1" title={t('home.chooseRoom')}>{t('home.chooseRoom')}</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        )
}

export default withTranslation()<any>(SearchList);
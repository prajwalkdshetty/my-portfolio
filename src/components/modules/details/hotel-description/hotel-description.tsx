import React from 'react';
import './hotel-description.scss';
import Ratings from '../../../common/ratings/ratings';
import { Amenities } from '../../../common/amenities/amenities';
import Carousel from '../../../common/carousel/carousel';
import { TFunction } from 'i18next';
import { Hotel, SearchData } from '../../../../models/data.model';
import { withTranslation } from 'react-i18next';

interface IProps {
    t: TFunction;
    selectedHotel: Hotel;
    searchData: SearchData;
}

const HotelDescription = ({ selectedHotel, t, searchData }: IProps) => {
    return (
        <div id="hotel-decription" className="box">

            <h2>{selectedHotel.name}</h2>
            <Ratings rating={selectedHotel.rating} />
            <div className="distance">{selectedHotel.distance_to_venue} {t('details.distanceFrom')} {searchData.location}</div>
            <div className="img-desc">
                <div className="description-col-1">
                    <div id="carousel">
                        <Carousel carousalData={selectedHotel.images} />
                    </div>
                </div>
                <div className="description-col-2">
                    <p>{selectedHotel.description}</p>
                </div>
            </div>

            <div className="amenities-container">
                <Amenities amenities={selectedHotel.amenities} />
            </div>
        </div>
    )
}

export default withTranslation()<any>(HotelDescription);
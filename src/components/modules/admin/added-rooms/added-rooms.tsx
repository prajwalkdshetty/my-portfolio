import React from 'react';
import './added-rooms.scss';
import { TFunction } from 'i18next';
import { Room } from '../../../../models/data.model';
import { withTranslation } from 'react-i18next';

interface IProps {
    t: TFunction;
    roomsAdded: Room[];
}

const AddedRooms = ({ roomsAdded, t }: IProps) => {
    return (
        <div id="added-room" className="box">
            <h4>{t('admin.addedRooms')}</h4>
            {roomsAdded.map((data: Room) => (
                <div className="rooms-added">
                    <h5>{data.name}</h5>
                    <p className="description">{data.description}</p>
                    <div className="price">{t('admin.price')}: {data.price_in_usd}</div>
                    <div className="occupency">{t('admin.maxOccupancy')} : {data.max_occupancy}</div>
                </div>
            ))}
        </div>
    )
}

export default withTranslation()<any>(AddedRooms);
import React from 'react';
import './amenities.scss';
import { FiltersData } from '../../../data/filters-data';
export const Amenities = ({amenities}) => {    
    const amenData = FiltersData.amenities;
    return (
        <div>
            {
                amenities.map((data, i) => {
                    const amenObj = amenData.find(d => data === d.value)
                    return <span key={i} className="amenities"><i className={'fa fa-' + amenObj.iconName +' amen-icon'}></i><span className="amen-text">{amenObj.label}</span></span>
                })
            }
        </div>
    )
}
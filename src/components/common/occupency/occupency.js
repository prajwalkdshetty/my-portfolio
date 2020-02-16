import React from 'react';
import './occupency.scss';
const Occupency = ({ noOfPersons }) => {
    return (
        <span className="occupency-icons">
            {Array(noOfPersons).fill(1).map((data, index) => (
                <i className="fa fa-male" key={index}></i>
            ))}
        </span>
        
    )
}

export default Occupency;
import React, { Component } from 'react';
import './ratings.scss';
class Ratings extends Component {

    constructor(props) {
        super(props);
        this.getCategory = this.getCategory.bind(this);
    }
    
    render() {
        if(this.props.rating === -1) {
            return <div className="stars-outer"><span className="not-rated">Not rated</span></div>
        } else {
            const category = this.props.showRatingCategory;
            const width = this.getInnerStarWidth();
            return (
                <>
                <div className="stars-outer">
                    <div className="stars-inner" style={{width: width + '%'}} ></div>
                </div>
                { category && <span>{this.getCategory}</span> }
                </>
            )
        }
    }

    getCategory() {
        if (this.props > 4.5) {
            return 'Excellent';
        } else if (this.props > 3.5) {
            return 'Good';
        } else if (this.props > 2.5) {
            return 'Average';
        } else if (this.props > 1.5) {
            return 'Poor';
        } else {
            return 'Very Poor';
        }
    }

    getInnerStarWidth() {
        const starTotal = 5;
        const rating = this.props.rating;
        const starPercentage = (rating / starTotal) * 100;
        return (Math.round(starPercentage / 10) * 10);
    }
}

export default Ratings;
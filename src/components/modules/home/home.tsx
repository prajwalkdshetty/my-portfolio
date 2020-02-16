import React, { Component, MouseEvent } from 'react';
import SearchList from './search-list/search-list';
import SearchResultsHeader from './search-results-header/search-results-header';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { setHotel, setSearch } from '../../../store/actions/appActions';
import { api } from '../../../api/api';
import { customSort } from '../../../utils/utils';
import { Select } from '../../ui/select/select';
import { FiltersData } from '../../../data/filters-data';
import { Hotel, HotelResp, SearchData, Filters } from '../../../models/data.model';
import { ISetHotels, ISetSearch } from '../../../models/action.model';
import { withTranslation } from "react-i18next";
import { TFunction } from "i18next";
import './home.scss';
import BookingHeader from './booking-header/booking-header';

interface IProps {
    setHotel: (data: Hotel) => ISetHotels | ISetSearch;
    setSearch: (data: SearchData) =>  any;
    t: TFunction
}
interface IState {
    hotelsRes: Hotel[];
    hotels: Hotel[];
    sortBy: string;
}

class Home extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            hotelsRes: [],
            hotels: [],
            sortBy: 'price_category_a'
        }
    }

    render() {
        const { t } = this.props;
        return (
            <div className="home-container">
                <BookingHeader {...this.props} onFilter={this.onFilter} />
                <section className="search-results">
                    <SearchResultsHeader hotels={this.state.hotels} />
                    {
                        this.state.hotels && this.state.hotels.length > 0 &&
                        <div id="sort-by" className="wrapper">
                            <Select
                                t={t}
                                tObj={'home.sortBySelect'}
                                options={FiltersData.sortBy}
                                title={t('home.sortBy')}
                                name={'sortBy'}
                                selected={this.state.sortBy}
                                handleChange={this.onSorting}
                            />
                        </div>
                    }
                    <SearchList hotels={this.state.hotels} setHotel={this.props.setHotel} />
                </section>
            </div>
        );
    }

    componentDidMount() {
        api.get('hotels').then(({ data } : HotelResp) => {
            this.setState({
                hotelsRes: data
            });
            this.onSorting(this.state.sortBy, data);
        })
    }

    onFilter = (filters: Filters) => {
        const filteredHotels = this.state.hotelsRes.filter((hotel: Hotel) => {
            return (
                (filters.price_category.length === 0 || filters.price_category.indexOf(hotel.price_category) !== -1) &&
                (filters.rating.length === 0 || Math.min(...filters.rating) <= hotel.rating) &&
                (filters.amenities.length === 0 || filters.amenities.every((data: string) => hotel.amenities.indexOf(data) !== -1)) &&
                (filters.distance >= hotel.distance_to_venue));
        });
        this.setState({
            hotels: filteredHotels
        });
    }

    onSorting = (event: string | MouseEvent, data?: Hotel[]) => {
        const dataForSort = data || this.state.hotels;
        let value = typeof event === 'string' ? event : (event.target as HTMLInputElement).value;
        let code = null;
        let sortBy = value;
        let dec = false;
        if (dataForSort && dataForSort.length > 0) {
            if (value === 'price_category_a' || value === 'price_category_d') {
                code = {
                    low: 'a',
                    medium: 'b',
                    high: 'c'
                };
                sortBy = 'price_category';
            }
            if (value === 'rating' || value === 'price_category_d') {
                dec = true;
            }
            const hotel = customSort(dataForSort, sortBy, dec, code);
            this.setState({
                ...this.state,
                hotels: hotel,
                sortBy: value
            })
        }
    }
}

type DispatchItems = (arg: ISetHotels | ISetSearch) => (ISetHotels | ISetSearch);

const dispatchActions = (dispatch: DispatchItems) => {
    return {
        setHotel: (data: Hotel) => dispatch(setHotel(data)),
        setSearch: (data: SearchData) => dispatch(setSearch(data))
    }
};
export default withRouter(connect(null, dispatchActions)(withTranslation()<any>(Home)));

import React, { Component, MouseEvent, FormEvent } from 'react';
import './remove-items.scss';
import { Input } from '../../../ui/input/input';
import { Checkbox } from '../../../ui/checkbox/checkbox';
import { api } from '../../../../api/api';
import { Hotel } from '../../../../models/data.model';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import { loader } from '../../../../utils/utils';

interface IProps {
    t: TFunction;
}

interface IState {
    hotels: HotelValues[],
    hotelsForView: HotelValues[],
    selectedHotels: string[]
}

interface HotelValues {
    label: string;
    value: string;
}

class RemoveItems extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            hotels: [],
            hotelsForView: [],
            selectedHotels: []
        }
        this.searchHotel = this.searchHotel.bind(this);
        this.hotelSelection = this.hotelSelection.bind(this);
        this.removeHotels = this.removeHotels.bind(this);
    }
    render() {
        const { t } = this.props;
        if (this.state.hotelsForView.length === 0) {
            return (
                <div id="remove-items" className="wrapper app-spacing app-offset">
                    <div className="box">
                        <div>{t('admin.noHotels')}</div>
                    </div>
                </div>)
        }
        return (
            <div id="remove-items" className="wrapper app-spacing app-offset">
                <div className="box">
                    <h4>{t('admin.selectHotels')}</h4>
                    <form onSubmit={this.removeHotels}>
                        <div id="search-hotels">
                            <Input type={'text'}
                                title={t('admin.search')}
                                name={'name'}
                                placeholder={t('admin.search')}
                                required={false}
                            />
                            <span role="button" className="fa fa-search search-icon" onClick={this.searchHotel}></span>
                        </div>
                        <div className="hotels-list">
                            <Checkbox
                                title={t('admin.hotels')}
                                options={this.state.hotelsForView}
                                handleChange={this.hotelSelection}
                                hideLabel={false}
                                selectedOptions={this.state.selectedHotels}
                            />
                        </div>
                        <div className="remove-btn">
                            <button disabled={!this.state.selectedHotels.length} type="button" role="button" title={t('admin.clearSelected')}
                                onClick={this.clearSelection} className="button button-2">{t('admin.clearSelected')}</button>
                            <button type="submit" role="button" title={t('admin.remove')}
                                className="button button-1">{t('admin.remove')}</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.getHotels();
    }

    clearSelection = () => {
        this.setState({
            selectedHotels: []
        });
    }

    searchHotel = (event: FormEvent) => {
        const searchVal = (event.target as HTMLElement).parentNode.querySelector("input").value;
        const { hotels } = this.state;
        const filteredData = hotels.filter(data => data.label.includes(searchVal));
        this.setState({
            hotelsForView: [...filteredData]
        });
    }

    hotelSelection = (event: FormEvent) => {
        const target = (event.target as any);
        const name = target.name
        let data = [...this.state.selectedHotels];
        if (target.checked) {
            data.push(name);
        } else {
            const index = data.findIndex(data => data === name);
            data.splice(index, 1);
        }
        this.setState({
            selectedHotels: data
        });
    }

    removeHotels = (event: FormEvent) => {
        event.preventDefault();
        const promises: Promise<Hotel>[] = [];
        this.state.selectedHotels.forEach(data => {
            promises.push(this.requestPromise(data));
        });
        loader.show();
        Promise.all(promises).then(() => {
            alert(this.props.t('admin.hotelDeletedSuccess'));
            this.clearSelection();
            this.getHotels();
            loader.hide();
        });
    }

    getHotels(): void {
        loader.show();
        api.get('hotels').then(({ data }: { data: Hotel[] }) => {
            const hotels: HotelValues[] = data.map((hotel: Hotel) => ({ label: hotel.name, value: hotel.id }));
            this.setState({
                hotels,
                hotelsForView: hotels
            });
            loader.hide();
        });
    }

    requestPromise(id: string): Promise<Hotel> {
        return new Promise(function (resolve, reject) {
            api.delete('hotels/' + id).then(({ data }: { data: Hotel }) => {
                resolve(data);
            }).catch((error: Error) => {
                reject(error);
            });
        });
    }

}

export default withTranslation()<any>(RemoveItems);
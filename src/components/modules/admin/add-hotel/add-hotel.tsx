import React, { Component, FormEvent } from 'react';
import './add-hotel.scss';
import { FiltersData } from '../../../../data/filters-data';
import { Input } from '../../../ui/input/input';
import { Select } from '../../../ui/select/select';
import { Checkbox } from '../../../ui/checkbox/checkbox';
import { api } from '../../../../api/api';
import { uuidv4 } from '../../../../utils/utils';
import { Hotel, Room } from '../../../../models/data.model';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';

interface IProps {
    t: TFunction;
    onHotelAdded: (data: Hotel) => void;
    roomsAdded: Room[];
}

interface IState extends Hotel {
    roomAdded: boolean;
    [key: string]: any;
}

class AddHotel extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            id: '',
            name: '',
            description: '',
            distance_to_venue: 0,
            price_category: '',
            amenities: [],
            rating: -1,
            images: [],
            roomAdded: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    render() {
        const { t } = this.props;
        if(this.state.roomAdded) {
            return (
                <div className="box" id="hotel-added-message">
                    <h3>{t('admin.addHotelText')} <b>{this.state.name}</b></h3>
                </div>
            )
        } else {
            return (
                <div className="box">
                    <h2>{t('admin.addANewHotel')}</h2>
                    <form onSubmit={this.handleFormSubmit}>
                        <div id="addHotelsForm">
                            <Input type={'text'}
                                title={t('admin.name')}
                                name={'name'}
                                placeholder={t('admin.hotelNames')}
                                handleChange={this.handleInputChange}
                                required={true}
                            />
                            <Input type={'textarea'}
                                title={t('admin.description')}
                                name={'description'}
                                min={30}
                                placeholder={t('admin.description')}
                                handleChange={this.handleInputChange}
                                required={true}
                            />
                            <Input type={'number'}
                                title={t('admin.distance')}
                                name={'distance_to_venue'}
                                placeholder={t('admin.distance')}
                                handleChange={this.handleInputChange}
                                required={true}
                            />
                            <Select
                                options={FiltersData.price_category}
                                title={t('admin.priceCategory')}
                                name={'price_category'}
                                handleChange={this.handleInputChange}
                                required={true}
                            />
                            <Checkbox
                                title={t('admin.amenities')}
                                options={FiltersData.amenities}
                                handleChange={this.handleInputChange}
                            />
                        </div>
                        <div id="add-hotel-btn">
                            <button type="submit" className="button button-1" role="button" title={t('admin.addHotel')}>{t('admin.addHotel')}</button>
                        </div>
                    </form>
                </div>
            );
        }
    }

    handleInputChange(event: FormEvent): void {
        const node = event.target as HTMLFormElement;
        const { type, name } = node;
        switch (type) {
            case 'text':
            case 'number':
            case 'textarea':
            case 'select-one':
                this.setState({
                    [name]: node.value
                });
                break;
            case 'checkbox':
                let data = [...this.state.amenities];
                if (node.checked) {
                    data.push(name);
                } else {
                    const index = data.findIndex(data => data === name);
                    data.splice(index, 1);
                }
                this.setState({
                    amenities: data
                });
                break;
            default:
        }
    }

    handleFormSubmit(event: FormEvent): void {
        event.preventDefault();
        const newHotel = {...this.state};
        newHotel.id = uuidv4();
        newHotel.images = [
            "http://via.placeholder.com/140x100",
            "http://via.placeholder.com/100x140",
            "http://via.placeholder.com/140x140"
        ];
        api.post('hotels', newHotel).then(({ data }: { data: Hotel}) => {
            alert("Hotel added successfully!");
            this.props.onHotelAdded(data);
            this.setState({
                roomAdded: true
            });
        })
    }

}

export default withTranslation()<any>(AddHotel);
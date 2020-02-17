import React, { Component, FormEvent } from 'react';
import './add-room.scss';
import { Input } from '../../../ui/input/input';
import { api } from '../../../../api/api';
import { uuidv4, loader } from '../../../../utils/utils';
import { TFunction } from 'i18next';
import { Room, Hotel } from '../../../../models/data.model';
import { withTranslation } from 'react-i18next';

interface IProps {
    t: TFunction;
    roomsAdded: Room[];
    hotelDetails: Hotel;
    onRoomAdded: ((data: Room[]) => any);
}

interface IState {
    [key: string]: any;
    id: string;
    name: string;
    description: string;
    max_occupancy: number;
    price_in_usd: number;
}

class AddRoom extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            id: '',
            name: "",
            description: "",
            max_occupancy: 0,
            price_in_usd: 0
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.onRoomAddSuccess = this.onRoomAddSuccess.bind(this);
    }

    render() {
        const { t } = this.props;
        return (
            <div id="add-room" className="box ">
                <h2>{t('admin.addNewRoom')}</h2>
                <form onSubmit={this.handleFormSubmit} >
                    <div id="addRoomsForm">
                        <Input type={'text'}
                            title={t('admin.name')}
                            name={'name'}
                            placeholder={t('admin.addNewRoom')}
                            value={this.state.name}
                            handleChange={this.handleInputChange}
                            required={true}
                        />
                        <Input type={'textarea'}
                            title={t('admin.addNewRoom')}
                            name={'description'}
                            min={30}
                            placeholder={t('admin.roomDescription')}
                            value={this.state.description}
                            handleChange={this.handleInputChange}
                            required={true}
                        />
                        <Input type={'number'}
                            title={t('admin.maxOccupency')}
                            name={'max_occupancy'}
                            max={4}
                            min={1}
                            placeholder={t('admin.maxOccupency')}
                            value={this.state.max_occupancy}
                            handleChange={this.handleInputChange}
                            required={true}
                        />
                        <Input type={'number'}
                            title={t('admin.priceInUsd')}
                            name={'price_in_usd'}
                            placeholder={t('admin.price')}
                            value={this.state.price_in_usd}
                            handleChange={this.handleInputChange}
                            required={true}
                        />
                    </div>
                    <div id="add-room-btn">
                        <button type="submit" className="button button-1" role="button"
                            title={t('admin.addRoom')}>{t('admin.addRoom')}</button>
                    </div>
                </form>
            </div>
        );
    }


    handleInputChange(event: FormEvent): void {
        const target = (event.target as HTMLInputElement);
        this.setState({
            [target.name]: target.value
        });
    }

    handleFormSubmit(event: FormEvent): void {
        event.preventDefault();
        const newRoom: IState = this.state;
        newRoom.id = uuidv4();
        const { hotelDetails } = this.props;
        const roomsAdded = this.props.roomsAdded;
        const noOfItems = roomsAdded.length;
        roomsAdded.push(newRoom);
        const self = this;
        loader.show();
        if (noOfItems === 0) {
            api.post('rooms', { id: hotelDetails.id, "rooms": roomsAdded }).then(() => {
                self.onRoomAddSuccess(roomsAdded);
                alert(self.props.t('admin.roomAddedSuccess'));
                loader.hide();
            });
        } else {
            api.put('rooms/' + hotelDetails.id, { id: hotelDetails.id, "rooms": roomsAdded }).then(() => {
                self.onRoomAddSuccess(roomsAdded);
                alert(self.props.t('admin.roomAddedSuccess'));
                loader.hide();
            });
        }
    }

    onRoomAddSuccess(roomsAdded: Room[]): void {
        this.props.onRoomAdded(roomsAdded);
        this.setState({
            name: "",
            description: "",
            max_occupancy: 0,
            price_in_usd: 0
        });
    }

}

export default withTranslation()<any>(AddRoom);
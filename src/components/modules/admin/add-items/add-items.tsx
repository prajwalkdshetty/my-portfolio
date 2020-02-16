
import React, { Component } from 'react';
import './add-items.scss';
import AddHotel from '../add-hotel/add-hotel';
import AddRoom from '../add-room/add-room';
import AddedRooms from '../added-rooms/added-rooms';
import { Room, Hotel } from '../../../../models/data.model';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';

interface IProps {
    t: TFunction;
}

interface IState {
    hotelAdded: boolean;
    hotelDetails: Hotel | {};
    roomsAdded: Room[];
}

class AddItems extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            hotelAdded: false,
            hotelDetails: {},
            roomsAdded: []
        }

        this.onHotelAdded = this.onHotelAdded.bind(this);
        this.onRoomAdded = this.onRoomAdded.bind(this);
    }
    render() {
        return (
            <section id="add-items" className="wrapper app-spacing app-offset">
                <AddHotel onHotelAdded={this.onHotelAdded} roomsAdded={this.state.roomsAdded} />
                {this.state.hotelAdded &&
                    <AddRoom hotelDetails={this.state.hotelDetails} roomsAdded={this.state.roomsAdded} onRoomAdded={this.onRoomAdded} />}
                {this.state.roomsAdded.length > 0 && <AddedRooms roomsAdded={this.state.roomsAdded} />}
            </section>
        );
    }

    onHotelAdded(data: Hotel): void {
        this.setState({
            hotelAdded: true,
            hotelDetails: data
        });
    }


    onRoomAdded(data: Room[]): void {
        this.setState({
            ...this.state,
            roomsAdded: data
        });
    }
}

export default withTranslation()<any>(AddItems);
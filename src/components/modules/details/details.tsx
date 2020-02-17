import React, { Component } from 'react';
import HotelDescription from './hotel-description/hotel-description';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { setRoom, setBookingInfo } from '../../../store/actions/appActions';
import { api } from '../../../api/api';
import { uuidv4, loader } from '../../../utils/utils';
import { TFunction } from 'i18next';
import { Hotel, Room, User, SearchData, BookingInfo } from '../../../models/data.model';
import Rooms from './room/rooms';
import { ISetRoom, ISetBookingInfo, AppState } from '../../../models/action.model';
import { withTranslation } from 'react-i18next';
import './details.scss';

interface IProps {
    t: TFunction;
    selectedHotel: Hotel;
    setRoom: (data: Room) => void;
    user: User;
    searchData: SearchData;
    setBookingInfo: (data: BookingInfo) => void;
    history: any;
}
interface IState {
    rooms: Room[];
    hotelId: string;
}
interface IStoreState {
    app: AppState
}

class Details extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            rooms: [],
            hotelId: ''
        }
        this.book = this.book.bind(this);
    }
    componentDidMount() {
        const {id} = this.props.selectedHotel;
        if(id) {
            loader.show();
            api.get('rooms/'+id).then(({data}: any) => {
                this.setState({
                    ...this.state,
                    hotelId: id,
                    rooms: data.rooms
                });
                loader.hide();
            })
        }
    }

    render() {
        const { selectedHotel, searchData } = this.props;
        return (
            <div className="details-container wrapper">
                <HotelDescription selectedHotel={selectedHotel} searchData={searchData} />
                {
                    this.state.rooms.map((data, index) => (
                        <Rooms key={index} index={index} roomDetails={data} book={this.book} />
                    ))}
            </div>
        );
    }

    book(data: Room): void {
        const props = this.props;
        props.setRoom(data);
        
        const booking = {
            hotelId: props.selectedHotel.id,
            hotelName: props.selectedHotel.name,
            roomId: data.id,
            roomName: data.name,
            userId: props.user.userId,
            bookingDate: this.getBookingTime(),
            nights: 1,
            price: '$'+data.price_in_usd,
            checkIn: props.searchData.checkIn,
            checkOut: props.searchData.checkOut,
            location: props.searchData.location,
            bookingNumber: this.getUniqueNumber()
        }

        loader.show();
        api.post('bookings', booking).then(({data}: {data: BookingInfo}) => {
            sessionStorage.setItem("navigatedFromDetails", "true");
            props.setBookingInfo(data);
            props.history.push("/confirmation/"+props.user.userId);
            loader.hide();
        })        
    }
    
    getUniqueNumber() {
        return 'bk'+ uuidv4();
    }
    getBookingTime() {
        const d = new Date();
        return (d.getMonth()+1)+'/'+d.getDate()+'/'+d.getFullYear()+' '+(d.getHours() > 12 ? d.getHours() - 12 : d.getHours())+':'+d.getMinutes()+' '+(d.getHours() >= 12 ? "PM" : "AM");
    }
}

const mapStateToProps = (state: IStoreState) => {
    return { 
        selectedHotel: state.app.selectedHotel,
        user: state.app.user,
        searchData: state.app.searchData
    }
};

type DispatchItems = (arg: ISetRoom | ISetBookingInfo) => (ISetRoom | ISetBookingInfo);

const dispatchActions = (dispatch: DispatchItems) => {
    return {
        setRoom: (data: Room) => dispatch(setRoom(data)),
        setBookingInfo: (data: BookingInfo) => dispatch(setBookingInfo(data))
    }
};

export default withRouter(connect(mapStateToProps, dispatchActions)(withTranslation()<any>(Details)));

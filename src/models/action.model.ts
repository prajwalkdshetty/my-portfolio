import { Hotel, Room, SearchData, User, BookingInfo } from "./data.model";

export interface IActions {
    SET_HOTEL: string;
    SET_SEARCH: string;
    SET_ROOM: string;
    SET_BOOKING_INFO: string;
}
export interface IAction {
    type: string;
    payload: any;
}
export interface ISetHotels {
    type: IActions['SET_HOTEL'];
    payload: Hotel;
}

export interface ISetSearch {
    type: IActions['SET_SEARCH'];
    payload: SearchData;
}
export interface ISetRoom {
    type: IActions['SET_ROOM'];
    payload: Room;
}

export interface ISetBookingInfo {
    type: IActions['SET_BOOKING_INFO'];
    payload: BookingInfo;
}

export interface AppState {
    user: User;
    searchData: SearchData | {};
    selectedHotel: Hotel | {};
    roomSelected: Room | {};
    bookingInfo: BookingInfo | {};
    loading: boolean;
}

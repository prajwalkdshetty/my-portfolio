import { SearchData, Room, BookingInfo } from './../../models/data.model';
import { Hotel } from "../../models/data.model";

/*
 * action types
 */
export const SET_HOTEL = 'SET_HOTEL';
export const SET_SEARCH = 'SET_SEARCH';
export const SET_ROOM = 'SET_ROOM';
export const SET_BOOKING_INFO = 'SET_BOOKING_INFO';

/*
 * action creators
 */
export function setHotel(hotelData: Hotel) {
    return { type: SET_HOTEL, payload: hotelData }
}

export function setSearch(searchData: SearchData) {
    return { type: SET_SEARCH, payload: searchData }
}

export function setRoom(roomData: Room) {
    return { type: SET_ROOM, payload: roomData }
}

export function setBookingInfo(bookingData: BookingInfo) {
    return { type: SET_BOOKING_INFO, payload: bookingData }
}

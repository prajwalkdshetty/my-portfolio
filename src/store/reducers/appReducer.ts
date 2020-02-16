import { IAction } from './../../models/action.model';
import { StateLoader } from "../state-loader";

 const getInitialData = () => {
    const stateLoader = new StateLoader();
    const state = stateLoader.loadState();
    return state.app ? state.app : state;
}


export const appReducer = (state = getInitialData(), action: IAction) => {
    switch (action.type) {
        case 'SET_SEARCH':
            return {
                ...state,
                searchData: action.payload,
                selectedHotel: {},
                roomSelected: {},
                bookingInfo: {}
            };
        case 'SET_HOTEL':
            return {
                ...state,
                selectedHotel: action.payload,
                roomSelected: {},
                bookingInfo: {}
            };
        case 'SET_ROOM':
            return {
                ...state,
                roomSelected: action.payload,
                bookingInfo: {}
            };
        case 'SET_BOOKING_INFO':
            return {
                ...state,
                bookingInfo: action.payload
            };
        default:
            return state;
    }
};
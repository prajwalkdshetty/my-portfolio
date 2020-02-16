import { AppState } from './../models/action.model';
import { User, SearchData } from '../data/preDefinedData';

export const initialState: AppState = {
    user: User,
    searchData: SearchData,
    selectedHotel: {},
    roomSelected: {},
    bookingInfo: {},
    loading: false
};

export class StateLoader {

    loadState() {
        try {
            let serializedState = sessionStorage.getItem("hotelbooking:state");

            if (serializedState === null) {
                return this.initializeState();
            }

            return JSON.parse(serializedState);
        }
        catch (err) {
            return this.initializeState();
        }
    }

    saveState(state: any) {
        try {
            let serializedState = JSON.stringify(state);
            sessionStorage.setItem("hotelbooking:state", serializedState);

        }
        catch (err) {
        }
    }

    initializeState() {
        return {...initialState};
    }
}
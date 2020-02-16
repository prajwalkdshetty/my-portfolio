export interface Hotel {
    id: string;
    name: string;
    description: string;
    distance_to_venue: number;
    rating: number;
    price_category: string;
    amenities: string[];
    images: string[];
}
export interface Room {
    id: string;
    name: string;
    description: string;
    max_occupancy: number;
    price_in_usd: number;
}

export interface HotelResp {
    data: Hotel[];
}

export interface RoomsResp {
    data: Room[];
}

export interface SearchData {
    checkIn: string;
    checkOut: string;
    location: string;
}

export interface User {
    firstname: string;
    lastname: string;
    role: string;
    email: string;
    userId: string;
}

export interface Filters {
    price_category: string[];
    rating: number[];
    amenities: string[];
    distance: number;
}

export interface BookingInfo {
    hotelId: string;
    hotelName: string;
    roomId: string;
    roomName: string;
    userId: string;
    bookingDate: string;
    nights: number;
    price: string;
    checkIn: string;
    checkOut: string;
    location: string;
    bookingNumber: string;
    id: number;
}
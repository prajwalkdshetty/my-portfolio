import { SearchData as SearchCriteria, User as UserType} from './../models/data.model';

export const User: UserType = {
    firstname: 'John',
    lastname: 'Doe',
    role: 'Admin',
    email: 'johndoe@gmail.com',
    userId: 'arf786546f'
}

const getCheckInOutDateHardCoded = () => {
    const d = new Date();
    const cin = (d.getMonth() + 1) + '/' + (d.getDate() + 1) + '/' + d.getFullYear() + ' 01:00 PM';
    const cout = (d.getMonth() + 1) + '/' + (d.getDate() + 2) + '/' + d.getFullYear() + ' 11:00 AM';
    return {
        checkIn: cin,
        checkOut: cout
    }
}

const date = getCheckInOutDateHardCoded();

export const SearchData: SearchCriteria = {
    checkIn: date.checkIn,
    checkOut: date.checkOut,
    location: 'Leipzig, Germany'
}
